import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/verifyToken.middleware.js";
import {validateSchema} from '../middlewares/validator.middleware.js'
import * as authSchema from '../schemas/auth.schema.js'

const router = new Router();

router.post("/login", validateSchema(authSchema.loginSchema), authCtrl.login);
router.post("/register",validateSchema(authSchema.registerSchema), authCtrl.register);
router.post("/logout", authCtrl.logout);
router.get("/profile", authRequired, authCtrl.profile);

export default router;
