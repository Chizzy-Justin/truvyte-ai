// // src/routes/apiRoutes.js
// const express = require('express');
// const authenticate = require('../middleware/authenticate');

// const {
//   getProfile,
//   updateProfile,
//   listUsers,
// } = require('../controllers/userController');
// // You’ll create controllers for audits, questions, plans, payments, etc.
// const auditController = require('../controllers/auditController');
// const questionController = require('../controllers/questionController');
// const planController = require('../controllers/planController');
// const billingController = require('../controllers/billingController');
// const isAdmin     = require('../middleware/isAdmin');
// const router = express.Router();

// // All /api routes require a valid JWT
// router.use(authenticate);

// // User endpoints
// router.get('/me', getProfile);
// router.put('/me', updateProfile);

// // Admin-only endpoints (you can add an isAdmin check in middleware)
// router.get('/users', listUsers);
// // router.post('/users/:id/suspend', suspendUser);

// // Audit endpoints
// router.post('/audits', auditController.createAudit);
// router.get('/audits', auditController.listAudits);
// router.get('/audits/:id', auditController.getAudit);

// // Question endpoints
// router
//   .route('/questions')
//   .get(questionController.listQuestions)
//   .post(questionController.createQuestion);
// router
//   .route('/questions/:id')
//   .put(questionController.updateQuestion)
//   .delete(questionController.deleteQuestion);

// // Plan endpoints
// router.get('/plans', planController.listPlans);
// router.post('/plans', planController.createPlan);
// router.put('/plans/:id', planController.updatePlan);

// // Billing & payments
// router.post('/payments', billingController.createPayment);
// router.get('/invoices', billingController.listInvoices);

// module.exports = router;
// src/routes/apiRoutes.js
const express = require('express');
const authenticate = require('../middleware/authenticate');
const isAdmin     = require('../middleware/isAdmin');

const {
  getProfile,
  updateProfile,
  listUsers,
} = require('../controllers/userController');
const auditController     = require('../controllers/auditController');
const questionController  = require('../controllers/questionController');
const planController      = require('../controllers/planController');
const billingController   = require('../controllers/billingController');

const router = express.Router();

// All /api routes require a valid JWT
router.use(authenticate);

/** Public user endpoints **/
router.get('/me', getProfile);
router.put('/me', updateProfile);

/** Audit endpoints (user‑scoped) **/
router.post('/audits', auditController.createAudit);
router.get('/audits', auditController.listAudits);       // lists only req.user audits
router.get('/audits/:id', auditController.getAudit);     // only if audit.user === req.user._id

/** Admin‑only endpoints **/
 // router.use(isAdmin);

// User management
router.get('/users', listUsers);
// router.post('/users/:id/suspend', userController.suspendUser);

// Compliance questions
router
  .route('/questions')
  .get(questionController.listQuestions)
  .post(questionController.createQuestion);

router
  .route('/questions/:id')
  .put(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

// Plan management
router.get('/plans', planController.listPlans);
router.post('/plans', planController.createPlan);
router.put('/plans/:id', planController.updatePlan);

// Billing & payments
router.post('/payments', billingController.createPayment);
router.get('/invoices', billingController.listInvoices);

module.exports = router;
