const itemService = require('../services/itemService');
const { validationResult } = require('express-validator');

const createItem = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const item = await itemService.createItem(req.body, req.user.id);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

const getItems = async (req, res, next) => {
  try {
    const items = await itemService.getItems(req.user.id);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Similar functions for updateItem and deleteItem

module.exports = { createItem, getItems };