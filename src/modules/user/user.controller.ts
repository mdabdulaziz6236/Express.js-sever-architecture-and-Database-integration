import type { Request, Response } from "express";
import { userService } from "./user.service";


const createuser = async (req: Request, res: Response) => {
    // console.log(req.body)
    const result = await userService.createUserIntoDB(req.body)
    try {

        res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const getAllUsers = async (req: Request, res: Response) => {

    // console.log("controller",req.user)
    try {
        const result = await userService.getAllUsersFromDB()
        res.status(200).json({
            success: true,
            message: 'Users retrived successfullly.',
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    // const {id} = req.params;
    const id = req.params.id;

    try {
        const result = await userService.getSingleUserFromDB(id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found!",
                data: {}
            })
        }
        res.status(200).json({
            success: true,
            message: "User Retrived Successfully.",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await userService.updateUserFromDB(req.body, id as string)
    if (result.rows.length === 0) {
        res.status(404).json({
            success: false,
            message: "User Not Found!"
        })
    }
    res.status(200).json({
        success: true,
        message: "User updated successfully.",
        data: result.rows[0]
    })
    try {

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }

}

const deleteUser = async (req: Request, res: Response) => {

    try {
        const id = req.params.id;
        const result = await userService.deleteUserFromDB(id as string)

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found!"
            })
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully.",
            data: {}
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}
export const userController = {
    createuser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}