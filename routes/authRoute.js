import Express from "express";
import { registerController } from '../controller/authController.js';
//router object
const router = Express.Router()

//routing
// Register || Method POST
router.post('/register', registerController)



export default router;