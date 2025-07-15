const item = require ('../models/Items')

const createItem = async (data, userId) => {
    const item = new Item ({...data, user: userId});
    return await item.save();
};
const getItems = async(userId) => {
    return await Item.find ({user:userId});

};

const updateItem = async (id, data, userId) => {
    const item = await Item.findOneAndUpdate(
        {_id: id, user:userId},
        data,
        {new: true}
    );
    if (!item) throw new Error ('Items not found or unauthorized');
    return item;
};
const deleteItem = async (id, userId) => {
    const item = await Item.findOneAndUpdate ({ _id: id, user: userId});
    if (!item) throw new Error ('Item not found or unauthorized');
    return item;
    
};
module.exports = {createItem, getItems, updateItem, deleteItem};