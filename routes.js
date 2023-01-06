const router = require("express").Router();
const authController = require("./controllers/auth-controller"); //This authController has the object that we created and exported in auth-controller.js

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);

module.exports = router;
