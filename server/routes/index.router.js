const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlGithub = require('../controllers/github.controller');
const ctrlProject = require('../controllers/project.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);


router.get('/github',jwtHelper.verifyJwtToken, ctrlGithub.githubUserProfile);
router.get('/githubopenissues',jwtHelper.verifyJwtToken, ctrlGithub.githubOpenIssues);

router.post('/project/create',jwtHelper.verifyJwtToken, ctrlProject.createProject);
router.get('/userprojects',jwtHelper.verifyJwtToken, ctrlProject.userProjects);

module.exports = router;



