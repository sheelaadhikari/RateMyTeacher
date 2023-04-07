import Express from "express";
import {
    registerController,
    loginController,
    testController,

} from '../controller/authController.js';
import userModel from "../models/userModel.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = Express.Router()

//routing
// Register || Method POST
router.post('/register', registerController);

// Login || Method POST
router.post('/login', loginController);

// the user list 
router.get('/users-test', async (req, res) => {

    const filter = { address: "dhading" }
    const users = await userModel.find(filter);




    res.status(200).send({
        success: true,
        message: "aayo",
        users: users,
        count: users.length
    });


})

// test routes
router.get('/test', requireSignIn, isAdmin, testController)



//



export default router;