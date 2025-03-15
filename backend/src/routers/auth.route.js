import express from "express"
import { checkAuth, login, logout, signUp, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("/login").post(login)
router.route("/signUp").post(signUp)
router.route("/logout").post(logout)
router.route("/update-profile").put(protectRoute, updateProfile)
router.route("/check").get(protectRoute, checkAuth)

export default router;