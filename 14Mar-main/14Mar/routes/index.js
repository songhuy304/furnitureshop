var express = require('express');
var router = express.Router();


router.use('/users', require('./users'));
//hostname:port/api/v1/books


router.use('/product', require('./product'));
router.use('/category', require('./category'));
router.use('/sanpham', require('./sanpham'));
router.use('/order', require('./order'));
router.use('/invoice', require('./invoiceitem'));




module.exports = router;
