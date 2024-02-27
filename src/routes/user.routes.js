const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const verifyToken = require('../middlewares/validate-token.middleware');
const upload = require("../middlewares/upload-file.middleware")

router
    .get('/', verifyToken, usersController.get)
    .get('/:id', verifyToken, usersController.getById)
    .post('/', verifyToken, usersController.create)
    .put('/:id', verifyToken, usersController.update)
    .delete('/:id', verifyToken, usersController._delete)
    .post('/import', upload.single('file'), usersController.upload);

module.exports = router;