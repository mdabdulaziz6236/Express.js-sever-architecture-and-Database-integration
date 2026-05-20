import bcrypt from 'bcrypt';
import jwt, { type JwtPayload } from 'jsonwebtoken'
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
        role: user.role,
        is_active: user.is_active,
        email: user.email
    }
    const accessToken = jwt.sign(jwtPayload, config.secret as string, { expiresIn: '1d' })
    const refreshToken = jwt.sign(jwtPayload, config.refresh_secret as string, { expiresIn: '10d' })

    return { accessToken, refreshToken }
}

const generateRefreshToken = async (token: string) => {

    if (!token) {
        throw new Error("Unauthorized!")
    }

    const decoded = jwt.verify(token as string, config.refresh_secret as string) as JwtPayload
    const userData = await pool.query(` 
            SELECT * FROM users WHERE email=$1
            `, [decoded.email])
    const user = userData.rows[0]
    if (userData.rowCount === 0) {
        throw new Error("User Not Found!")

    }
    if (!user?.is_active) {
        throw new Error("Forbidden")
    }
    // 3. Generate Token
    const jwtPayload = {
        id: user.id,
        name: user.name,
        role: user.role,
        is_active: user.is_active,
        email: user.email
    }
    const accessToken = jwt.sign(jwtPayload, config.secret as string, { expiresIn: config.tokenTime as any })
    return { accessToken }
}
export const authService = {
    loginUserIntoDB,
    generateRefreshToken
}