const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlGithub = require('../controllers/github.controller');
const ctrlProject = require('../controllers/project.controller');
const ctrlSprint = require('../controllers/sprint.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);


router.get('/github',jwtHelper.verifyJwtToken, ctrlGithub.githubUserProfile);
router.get('/githubopenissues/:id',jwtHelper.verifyJwtToken, ctrlGithub.githubOpenIssues);
router.get('/githubclosedissues/:id',jwtHelper.verifyJwtToken, ctrlGithub.githubClosedIssues);
router.get('/githubissuecount/:id/:type/:state',jwtHelper.verifyJwtToken, ctrlGithub.githubIssueCount);
router.get('/githubGetIssueFromNumber/:id/:issuenum',jwtHelper.verifyJwtToken, ctrlGithub.githubGetIssueFromNumber);

router.post('/project/create',jwtHelper.verifyJwtToken, ctrlProject.createProject);
router.get('/userprojects',jwtHelper.verifyJwtToken, ctrlProject.userProjects);
router.get('/projectinfo/:id',jwtHelper.verifyJwtToken, ctrlProject.projectInfo);

router.post('/sprintitem/create',jwtHelper.verifyJwtToken, ctrlSprint.createSprintItem);
router.get('/sprintitems/:pid/:sid',jwtHelper.verifyJwtToken, ctrlSprint.sprintItems);
router.post('/sprint/create',jwtHelper.verifyJwtToken, ctrlSprint.createSprint);
router.get('/sprint/:pid/:sid',jwtHelper.verifyJwtToken, ctrlSprint.sprint);
router.get('/sprints/:pid',jwtHelper.verifyJwtToken, ctrlSprint.sprints);
router.get('/projectIssuesAddedToSprints/:pid',jwtHelper.verifyJwtToken, ctrlSprint.projectIssuesAddedToSprints);
router.get('/sprintitem/:pid/:issueNumber',jwtHelper.verifyJwtToken, ctrlSprint.sprintItem);
router.get('/githubSprintDetails/:sprintID/:projectID',jwtHelper.verifyJwtToken, ctrlGithub.githubSprintDetails);

//Github SignIn

router.get('/github/callback', ctrlGithub.githubSignIn);

module.exports = router;
