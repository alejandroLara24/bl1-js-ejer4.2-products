const View = require('../view/view.class')
const Store = require('../model/store.class')

class Controller {
    constructor() {
        this.store = new Store(1)
        this.view = new View()
    }

    addProductToStore(formData) {
        let product = {} 
        try {
        // Cambiamos los datos en el modelo
            product = this.store.addProduct(formData)
        // Si todo ha ido bien mostramos los datos en
        // la página y si no mostramos el error
        } catch (err) {
            this.view.renderErrorMessage(err)
            return
        }
        this.view.renderNewProduct(product)
        let id = product.id
        this.view.tr.querySelector('.delete')
        .addEventListener('click', () => {
            this.deleteProductFromStore(id)
        })
        this.view.tr.querySelector('.upStock')
        .addEventListener('click', () => {
            let units = 1
            this.changeProductStock({id, units})
        })
        this.view.tr.querySelector('.downStock')
        .addEventListener('click', () => {
            let units = -1
            this.changeProductStock({id, units})
        })
        this.view.tr.querySelector('.edit')
        .addEventListener('click', () => {
            document.getElementById('new-prod')
            .setAttribute('hidden',true)
            document.getElementById('mod-prod')
            .removeAttribute('hidden')
            this.view.renderProductInfo(product)
        })
    }

    deleteProductFromStore(prodId) {
        // No olvides pedir confirmación y, si el producto
        // tiene unidades pedir una segunda confirmación
        const product = this.store.findProduct(prodId)
        if (!product) {
            this.view.renderErrorMessage('El producto con id "' + prodId + '" no existe')
            return
        }
        if (!confirm('Es este el producto que quieres eliminar?\n' + product.id + "\n" + product.name)) {
            return
        }
        if (product.units > 0) {
            if (confirm('Este prodcuto tiene ' + product.units + ' unidades, deseas borrarlo?')) {
                this.changeProductStock({id: prodId, units: -product.units})   
            }
        }
        try {
            this.store.delProduct(prodId)
        } catch (err) {
            this.view.renderErrorMessage(err)
        }
        const totalImport = this.store.totalImport()
        this.view.renderDelProduct(prodId)
        this.view.renderStoreImport(totalImport)
    }

    changeProductInStore(formData) {
        try {
            const productoModificado = this.store.changeProduct(formData)
            const totalImport = this.store.totalImport()
            this.view.renderEditProduct(productoModificado)
            this.view.renderStoreImport(totalImport)
            document.getElementById('new-prod')
            .removeAttribute('hidden')
            document.getElementById('mod-prod')
            .setAttribute('hidden',true)
            if (this.view.tr.querySelector('.downStock')
            .hasAttribute('disabled')) {
                this.view.tr.querySelector('.downStock')
                .removeAttribute('disabled')
            }
        } catch (err) {
            this.view.renderErrorMessage(err)
        }
    }

    changeProductStock(formData) {
        try {
            const product = this.store.changeProductUnits(formData)
            const totalImport = this.store.totalImport()
            if (product.units > 0) {
                this.view.tr.querySelector('.downStock')
                .removeAttribute('disabled')
            } else {
                this.view.tr.querySelector('.downStock')
                .setAttribute('disabled',true)
            }
            this.view.renderEditProduct(product)
            this.view.renderStoreImport(totalImport)
        } catch (err) {
            this.view.renderErrorMessage(err)
        }
    }
}

module.exports = Controller
