import express, { type Application, type Request, type Response } from 'express'
import { pool } from './db'
import { userRoute } from './modules/user/user.route'
const app: Application = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true })) // usaslly nested data ney na tai {extended: true}




app.get('/', (req: Request, res: Response) => {
    //   res.send('Express Server is running!')
    res.status(200).json({
        "message": 'Express Server is running!',
        "author": "Next Level"

    })
})
app.use('/api/users', userRoute)

export default app

