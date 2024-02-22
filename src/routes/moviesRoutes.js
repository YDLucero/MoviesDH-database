const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');


/* /movies */
router
    .get('/', moviesController.list)
    .get('/new', moviesController.new)
    .get('/recommended', moviesController.recommended)
    .get('/detail/:id', moviesController.detail)


//Rutas exigidas para la creación del CRUD
router
    .get('/add', moviesController.add)
    .post('/create', moviesController.create)
    .get('/edit/:id', moviesController.edit)
    .put('/update/:id', moviesController.update)
    .get('/delete/:id', moviesController.delete)
    .post('/delete/:id', moviesController.destroy)
 

module.exports = router;