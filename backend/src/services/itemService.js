const Item = require('../models/Items'); // Fixed import - capital I

const createItem = async (data, userId) => {
    const item = new Item({ ...data, userId: userId }); // Fixed field name
    return await item.save();
};

const getItems = async (userId) => {
    return await Item.find({ userId: userId }); // Fixed field name
};

const updateItem = async (id, data, userId) => {
    const item = await Item.findOneAndUpdate(
        { _id: id, userId: userId }, // Fixed field name
        data,
        { new: true }
    );
    if (!item) throw new Error('Item not found or unauthorized');
    return item;
};

const deleteItem = async (id, userId) => {
    const item = await Item.findOneAndDelete({ _id: id, userId: userId }); // Fixed method name
    if (!item) throw new Error('Item not found or unauthorized');
    return item;
};

module.exports = { createItem, getItems, updateItem, deleteItem };