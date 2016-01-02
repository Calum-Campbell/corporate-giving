var express = require('express'),
    router  = express.Router();

var usersController = require('../controllers/usersController');
var projectsController = require('../controllers/projectsController');
var themesController = require('../controllers/themesController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex)
 
router.route('/users')
  .get(usersController.usersIndex)
//   .post(usersController.usersCreate)

router.route('/users/:id') 
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

router.route('/users/:id/addproject')
  .put(usersController.usersAddProject)

router.route('/users/:id/removeproject')
  .put(usersController.usersRemoveProject)

router.route('/users/:id/addtheme')
  .put(usersController.usersAddTheme)

router.route('/users/:id/removetheme')
  .put(usersController.usersRemoveTheme)

router.route('/themes')
  .get(themesController.themesIndex)
  .post(themesController.themesCreate)

router.route('/projects')
  .get(projectsController.projectsIndex)
  .post(projectsController.projectsCreate)

router.route('/projects/:id') 
  .get(projectsController.projectsShow)
  .patch(projectsController.projectsUpdate)
  .delete(projectsController.projectsDelete)

module.exports = router;