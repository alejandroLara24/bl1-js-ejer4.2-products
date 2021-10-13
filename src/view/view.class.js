const divMessagesUI = document.getElementById('messages');
const tbodyProductos = document.getElementById('mostrar-prod')

class View{
    renderNewProduct(product) {
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
        tableRow.children[2].textContent = product.units
        tableRow.children[4].textContent = product.productImport() + ' €'
    }

    renderDelProduct(id) {
        const tableRow = document.getElementById(id)
        const tableRowTotal = document.getElementById('total')
        let importe = tableRow.children[4]
        let importeTotal = tableRowTotal.textContent()
        tableRowTotal.textContent = importeTotal - importe
        tableRow.remove()
    }

    renderStoreImport(total) {
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
