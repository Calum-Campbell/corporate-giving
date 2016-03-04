var express = require('express'),
    router  = express.Router();

var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');
var charitiesController = require('../controllers/charitiesController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex)
 
 //USERS Routes
router.route('/users')
  .get(usersController.usersIndex)

router.route('/users/:id') 
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

//Charities Routes
router.route('/charities')
  .get(charitiesController.charitiesIndex)
  .post(charitiesController.charitiesCreate)

router.route('/charities/:id') 
  .get(charitiesController.charitiesShow)
  .patch(charitiesController.charitiesUpdate)
  .delete(charitiesController.charitiesDelete)

router.route('/charities/:id/addVote')
  .put(charitiesController.charitiesAddVote)


module.exports = router;