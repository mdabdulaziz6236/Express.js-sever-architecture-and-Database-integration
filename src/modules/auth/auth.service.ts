import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { pool } from "../../db";
import config from '../../config';



const loginUserIntoDB = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;

    // 1. check if the user exists 
    const userData = await pool.query(` 
        SELECT * FROM users WHERE email=$1
        `, [email])
    if (userData.rowCount === 0) {
        throw new Error("Invalid Credentials!")
    }

    const user = userData.rows[0];
    // 2. compare the password 
    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) {
        throw new Error("Invalid Credentials!")
    }
    // 3. Generate Token
    const jwtPayload = {
        id: user.id,
        name: user.name,
        is_active: user.is_active,
        email: user.email
    }
    const accessToken = jwt.sign(jwtPayload, config.secret as string, { expiresIn: '1d' })

    return {accessToken}
}

export const authService = {
    loginUserIntoDB
}