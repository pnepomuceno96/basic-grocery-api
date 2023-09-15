const groceries = []

//GET
function returnData() {
    return groceries
}

//POST
function addItem(item) {
    groceries.push(item)    
}

//PUT
function updateItem(data) {
    for(let i = 0; i < groceries.length; i++) {
        if (data.name === groceries[i].name) {
            groceries[i] = data
            console.log(groceries[i])
        }
    }
}

//DELETE
function deleteItem(itemName) {
    for(let i = 0; i < groceries.length; i++) {
        
        if (itemName === groceries[i].name) {
            groceries.splice(i, 1)
            
        }
    }
}


module.exports = { addItem, returnData, deleteItem, updateItem };