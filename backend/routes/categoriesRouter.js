const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { createCategory, getAllCategories, deleteCategory, validateCategoryData, validateCategoryId } = require('../controllers/categoryController');

router.post('/', validateCategoryData(), createCategory);

router.get('/', getAllCategories);

router.delete('/:id', validateCategoryId(), deleteCategory);

module.exports = router;
