// user.js
const express = require('express');
const multer = require('multer');
const { loginUser, registerUser, userProfile, userHome, forgotPassword, resetPassword, verify, updateUserProfileImage } = require('../controllers/userController');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

// Multer configuration
const upload = multer({ dest: 'uploads/' });

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/verify', verify);

// Protected routes (require authentication)
router.get('/user/:userId', requireAuth, userProfile);
router.get('/home/:userId', requireAuth, userHome);

// New route for updating the profile image
router.post('/user/:userId/profile-image', requireAuth, upload.single('image'), updateUserProfileImage);

module.exports = router;
