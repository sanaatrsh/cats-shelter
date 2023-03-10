const express = require('express');

const humensController = require('../controllers/humens')
const router = express.Router();

router.get('/humens', humensController.getHumens);

router.get('/humens/addHumen', humensController.getAddHumen);
router.post('/humens/addHumen', humensController.postAddHumen);

router.get('/humens/edit-humen/:humenId', humensController.getEditHumen);
router.post('/humens/edit-humen/:humenId', humensController.postEditHumen);

router.post('/humens/remove-humen/:humenId', humensController.postRemoveHumen);

router.get('/humens/show-cats/:humenId', humensController.getShowCats);
router.post('/humens/show-cats/:humenId/remove-cat/:catId', humensController.postRemoveCat)

router.get('/humens/search', humensController.getSearchHumens);

module.exports = router;