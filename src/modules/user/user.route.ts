import { Router, } from "express";
import { userController } from "./user.controller";
import auth from "../../midddleware/auth";

const router = Router()

router.post("/", userController.createuser)
router.get('/',auth(), userController.getAllUsers)
router.get('/:id', userController.getSingleUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
export const userRoute = router