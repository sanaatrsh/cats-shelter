const express = require('express');
const catsController = require('../controllers/cats');
const cats = require('../models/cats');
const router = express.Router();

router.get('/cats', catsController.getCats);

router.get('/cats/addCat', catsController.getNewCat);
router.post('/cats/addCat', catsController.postNewCat);

router.get('/cats/edit-cat/:catId', catsController.getEditCat);
router.post('/cats/edit-cat/:catId', catsController.postEditCat);

router.post('/cats/remove-cat/:catId', catsController.postRemoveCat);

router.get('/cats/edit-cat/:catId/add-adopter', catsController.getAdopted);
router.post('/cats/edit-cat/:catId/add-adopter/:humenId', catsController.postAdopter);

router.get('/cats/search', catsController.getSearchCats);



module.exports = router;