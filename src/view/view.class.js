const divMessagesUI = document.getElementById('messages');

class View{
    renderNewProduct(product) {
        const tbodyProductos = document.querySelector('div#almacen tbody')
        const newTableRow = document.createElement('tr')
        newTableRow.id = product.id
        newTableRow.innerHTML = `
            <th>${product.id}</th>
            <th>${product.name}</th>
            <th>${product.units}</th>
            <th>${product.price} €</th>
            <th>${product.productImport()}</th>
            <th></th>`
        tbodyProductos.appendChild(newTableRow)
    }

    renderEditProduct(product) {
        const tableRow = document.getElementById(product.id)
        tableRow.children[1].textContent = product.name
        tableRow.children[2].textContent = product.units
        tableRow.children[3].textContent = product.price + ' €'
        tableRow.children[4].textContent = product.productImport().toFixed(2) + ' €'
    }

    renderDelProduct(id) {
        const tableRow = document.getElementById(id)
        tableRow.remove()
    }

    renderStoreImport(total) {
        const tableRow = document.getElementById('total')
        tableRow.textContent = total.toFixed(2) + ' €'
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
