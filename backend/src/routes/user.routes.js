import {Router} from 'express';
import { registerUser, loginUser, logoutUser, updateAvatar, refreshAccessToken, updateAccountDetails, changeCurrentPassword } from '../controllers/user.controller.js';
import {upload} from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").get(verifyJWT, changeCurrentPassword);
router.route("/update-user").post(verifyJWT, updateAccountDetails);
router.route("/update-avatar").post(verifyJWT, updateAvatar);

export default router;