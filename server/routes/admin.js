const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticate = require('../middleware/auth');

router.post('/login', adminController.login)
router.use(authenticate);
router.post('/register', adminController.register)
router.get('/items', adminController.showItem)
router.get('/items/:itemId', adminController.detailItem)
router.post('/items', adminController.addItem)
router.delete('/items/:itemId', adminController.deleteItem)
router.put('/items/:itemId', adminController.editItem)
router.get('/categories', adminController.showCategory)
router.get('/categories/:categoryId', adminController.detailCategory)
router.post('/categories', adminController.addCategory)
router.delete('/categories/:categoryId', adminController.deleteCategory)
router.put('/categories/:categoryId', adminController.editCategory)

module.exports = router