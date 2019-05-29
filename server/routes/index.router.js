const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlGithub = require('../controllers/github.controller');
const ctrlProject = require('../controllers/project.controller');
const ctrlSprint = require('../controllers/sprint.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.getUserProfile);


router.get('/github',jwtHelper.verifyJwtToken, ctrlGithub.getGithubUserProfile);
router.get('/githubopenissues/:projectID/:page',jwtHelper.verifyJwtToken, ctrlGithub.getGithubOpenIssues);
router.get('/githubclosedissues/:projectID/:page',jwtHelper.verifyJwtToken, ctrlGithub.getGithubClosedIssues);
router.get('/githubissuecount/:projectID/:type/:state',jwtHelper.verifyJwtToken, ctrlGithub.getGithubIssueCount);
router.get('/githubGetIssueFromNumber/:projectID/:issueNumber',jwtHelper.verifyJwtToken, ctrlGithub.getGithubIssueFromNumber);
router.get('/githubSprintDetails/:sprintID/:projectID',jwtHelper.verifyJwtToken, ctrlGithub.getGithubSprintDetails);
router.post('/github/issue/create/:projectID',jwtHelper.verifyJwtToken, ctrlGithub.githubCreateIssue);
router.put('/github/issue/edit/:projectID/:issueNumber',jwtHelper.verifyJwtToken, ctrlGithub.githubEditIssue);
router.delete('/github/logout',jwtHelper.verifyJwtToken, ctrlGithub.githubLogout);

router.post('/project/create',jwtHelper.verifyJwtToken, ctrlProject.createProject);
router.get('/projects',jwtHelper.verifyJwtToken, ctrlProject.getProjects);
router.put('/project/:projectID',jwtHelper.verifyJwtToken, ctrlProject.editProject);
router.get('/project/:projectID',jwtHelper.verifyJwtToken, ctrlProject.getProjectInfo);
router.delete('/project/:projectID',jwtHelper.verifyJwtToken, ctrlProject.removeProject);

router.post('/sprintitem/create',jwtHelper.verifyJwtToken, ctrlSprint.createSprintItem);
router.get('/sprintitem/:projectID/:issueNumber',jwtHelper.verifyJwtToken, ctrlSprint.getSprintItem);
router.delete('/sprint/:projectID/:sprintID',jwtHelper.verifyJwtToken, ctrlSprint.removeSprint)
router.delete('/sprintitem/:projectID/:sprintID/:issueNumber',jwtHelper.verifyJwtToken, ctrlSprint.removeSprintItem)
router.get('/sprintitems/:projectID/:sprintID',jwtHelper.verifyJwtToken, ctrlSprint.getSprintItems);
router.post('/sprint/create',jwtHelper.verifyJwtToken, ctrlSprint.createSprint);
router.get('/sprint/:projectID/:sprintID',jwtHelper.verifyJwtToken, ctrlSprint.getSprint);
router.get('/sprints/:projectID',jwtHelper.verifyJwtToken, ctrlSprint.getSprints);
router.get('/issuesAddedToSprints/:projectID',jwtHelper.verifyJwtToken, ctrlSprint.getIssuesAddedToSprints);



//Github SignIn

router.get('/github/callback', ctrlGithub.githubSignIn);

module.exports = router;
