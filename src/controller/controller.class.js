const View = require('../view/view.class')
const Store = require('../model/store.class')

class Controller {
    constructor() {
        this.store = new Store(1)
        this.view = new View()
    }

    addProductToStore(formData) {
        try {
        // Cambiamos los datos en el modelo
            const product = this.store.addProduct(formData)
            this.view.renderNewProduct(product)
        // Si todo ha ido bien mostramos los datos en
        // la página y si no mostramos el error
        } catch (err) {
            this.view.renderErrorMessage(err)
        }
    }

    deleteProductFromStore(prodId) {
        // No olvides pedir confirmación y, si el producto
        // tiene unidades pedir una segunda confirmación
        const product = this.store.findProduct(prodId)
        if (!product) {
            this.view.renderErrorMessage('El producto con id "' + prodId + '" no existe')
            return
        }
        let confirmacionProd = confirm('Es este el producto que quieres eliminar?\n' + product.id + "\n" + product.name)
        if (confirmacionProd) {
            if (product.units > 0) {
                let confirmacionStock = confirm('Este prodcuto tiene ' + product.units + ' unidades, deseas borrarlo?')
                if (!confirmacionStock) {
                    return
                }
                this.changeProductStock({id: prodId, units: -product.units})
            }
        } else {
            return
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
        } catch (err) {
            this.view.renderErrorMessage(err)
        }
    }

    changeProductStock(formData) {
        try {
            const product = this.store.changeProductUnits(formData)
            const totalImport = this.store.totalImport()
            this.view.renderEditProduct(product)
            this.view.renderStoreImport(totalImport)
        } catch (err) {
            this.view.renderErrorMessage(err)
        }
    }
}

module.exports = Controller
