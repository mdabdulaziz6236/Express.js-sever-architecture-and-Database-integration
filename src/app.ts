import express, { type Application, type Request, type Response } from 'express'
import { pool } from './db'
import { userRoute } from './modules/user/user.route'
import { profileRoute } from './modules/profile/profile.route'
import { authRoute } from './modules/auth/auth.route'
import fs from 'fs'
const app: Application = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true })) // usaslly nested data ney na tai {extended: true}
app.use((req, res, next) => {
    const currentTime = new Date().toLocaleString();
    const log = `\n========================================
Method : ${req.method}
URL    : ${req.url}
Time   : ${currentTime}
========================================\n`;
    fs.appendFile('logger.txt', log, (error) => {
        if (error) {
            console.log(error);
        }
    });

    next();
});




app.get('/', (req: Request, res: Response) => {
    //   res.send('Express Server is running!')
    res.status(200).json({
        "message": 'Express Server is running!',
        "author": "Next Level"

    })
})
app.use('/api/users', userRoute)
app.use('/api/profile', profileRoute)
app.use('/api/auth', authRoute)
export default app

