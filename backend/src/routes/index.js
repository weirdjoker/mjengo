
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { auth, roleCheck } = require('../middleware/authMiddleware');
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');
const orderController = require('../controllers/orderController');
const itemController = require('../controllers/itemController');

// Project routes
router.post(
  '/projects',
  auth,
  roleCheck(['owner']),
  [check('title', 'Title is required').not().isEmpty()],
  projectController.createProject
);
router.get('/projects', auth, projectController.getProjects);

// Task routes
router.post(
  '/tasks',
  auth,
  roleCheck(['owner']),
  [
    check('title', 'Title is required').not().isEmpty(),
    check('project', 'Project ID is required').not().isEmpty(),
  ],
  taskController.createTask
);
router.get('/tasks/:projectId', auth, roleCheck(['owner', 'builder']), taskController.getTasksByProject);

// Order routes
router.post(
  '/orders',
  auth,
  roleCheck(['owner']),
  [
    check('project', 'Project ID is required').not().isEmpty(),
    check('supplier', 'Supplier ID is required').not().isEmpty(),
    check('items', 'Items are required').isArray({ min: 1 }),
    check('totalAmount', 'Total amount is required').isNumeric(),
  ],
  orderController.createOrder
);
router.get('/orders/:projectId', auth, roleCheck(['owner', 'supplier']), orderController.getOrdersByProject);

// Item routes
router.post(
  '/items',
  auth,
  roleCheck(['supplier']),
  [check('name', 'Name is required').not().isEmpty()],
  itemController.createItem
);
router.get('/items', auth, itemController.getItems);

module.exports = router;