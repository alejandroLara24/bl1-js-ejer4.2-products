const divMessagesUI = document.getElementById('messages');

class View{

    renderNewProduct(product) {
        const tbodyProductos = document.querySelector('div#almacen tbody')
        const newTableRow = document.createElement('tr')
        newTableRow.id = 'prod-' + product.id
        newTableRow.innerHTML = `
            <th>${product.id}</th>
            <th>${product.name}</th>
            <th>${product.units}</th>
            <th>${product.price} €</th>
            <th>${product.productImport()}</th>
            <th>
                <button class="downStock btn btn-secondary" disabled>
                    <span class="material-icons">arrow_drop_down</span>
                </button>
                <button class="upStock btn btn-secondary">
                    <span class="material-icons">arrow_drop_up</span>
                </button>
                <button class="edit btn btn-secondary">
                    <span class="material-icons">edit</span>
                </button>
                <button class="delete btn btn-secondary">
                    <span class="material-icons">delete</span>
                </button>
            </th>`
        tbodyProductos.appendChild(newTableRow)
        this.tr = newTableRow
    }

    renderEditProduct(product) {
        const tableRow = document.getElementById('prod-'+product.id)
        tableRow.children[1].textContent = product.name
        tableRow.children[2].textContent = product.units
        tableRow.children[3].textContent = product.price + ' €'
        tableRow.children[4].textContent = product.productImport().toFixed(2) + ' €'
    }

    renderDelProduct(id) {
        const tableRow = document.getElementById('prod-'+id)
        tableRow.remove()
    }

    renderStoreImport(total) {
        const tableRow = document.getElementById('total')
        tableRow.textContent = total.toFixed(2) + ' €'
    }

    renderProductInfo(product) {
        document.getElementById('prod-id').setAttribute('value',product.id)
        document.getElementById('prod-name').setAttribute('value',product.name)
        document.getElementById('stockprod-units').setAttribute('value',product.units)
        document.getElementById('prod-price').setAttribute('value',product.price)
    }

    renderErrorMessage(message) {
        const newMessageDiv = document.createElement('div')
        newMessageDiv.className = "col-sm-12 alert alert-danger alert-dismissible fade show"
        newMessageDiv.innerHTML = `
            <span><strong>ATENCIÓN: </strong>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="this.parentElement.remove()"></button>`
        
        divMessagesUI.appendChild(newMessageDiv)
    }
}

module.exports = View;
