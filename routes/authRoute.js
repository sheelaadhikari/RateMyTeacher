import Express from "express";
import { registerController, loginController } from '../controller/authController.js';
//router object
const router = Express.Router()

//routing
// Register || Method POST
router.post('/register', registerController);

// Login || Method POST
router.post('./login', loginController);




export default router;