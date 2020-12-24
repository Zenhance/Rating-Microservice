const express = require('express');
const router = express.Router();

const RatingController = require('../controllers/rating.controller');

router.post('/',RatingController.postRating);

module.exports = router;
