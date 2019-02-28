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
router.get('/githubopenissues/:id',jwtHelper.verifyJwtToken, ctrlGithub.githubOpenIssues);
router.get('/githubclosedissues/:id',jwtHelper.verifyJwtToken, ctrlGithub.githubClosedIssues);
router.get('/githubissuecount/:id/:type/:state',jwtHelper.verifyJwtToken, ctrlGithub.githubIssueCount);

router.post('/project/create',jwtHelper.verifyJwtToken, ctrlProject.createProject);
router.get('/userprojects',jwtHelper.verifyJwtToken, ctrlProject.userProjects);
router.get('/projectinfo/:id',jwtHelper.verifyJwtToken, ctrlProject.projectInfo);



module.exports = router;



