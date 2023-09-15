const { addItem, returnData, deleteItem, updateItem} = require('../src/toTest');


const sampleRequest = {
    name: "Apples",
    quantity: 3,
    price: 1,
    brought: false
}

const sampleRequest2 = {
    name: "Oranges",
    quantity: 4,
    price: 1,
    brought: false
}

const sampleRequest3 = {
    name: "Oranges",
    quantity: 4,
    price: 1,
    brought: true
}

test('addItem should send the correct data to the array', () => {
    
    //const mockPost = jest.fn(() => listen, postMethod(sampleRequest));
    //expect(mockPost).toHaveBeenCalledWith(sampleRequest);
    addItem(sampleRequest)
    expect(returnData()[0]).toBe(sampleRequest)
})

test('deleteItem should remove data from groceries array', () => {
    
    deleteItem(sampleRequest.name)
    expect(returnData()).toStrictEqual([])
})

test('updateItem should update data in the groceries array', () => {
    addItem(sampleRequest2)
    updateItem(sampleRequest3)
    expect(returnData()[0]).toBe(sampleRequest3)
})