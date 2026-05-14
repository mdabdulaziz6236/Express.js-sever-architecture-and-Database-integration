import express, { type Application, type Request, type Response } from 'express'
import { Pool } from 'pg'
const app: Application = express()
const port = 5000
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true })) // usaslly nested data ney na tai {extended: true}
import dotenv from "dotenv";
dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL

})
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) NOT NULL ,
      password VARCHAR(20) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      age INT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()

      )
      `)
      console.log("Database connnected successfully!")
  } catch (error) {
    console.log(error)
  }
}
initDB()
app.get('/', (req: Request, res: Response) => {
  //   res.send('Express Server is running!')
  res.status(200).json({
    "message": 'Express Server is running!',
    "author": "Next Level"

  })
})

app.post("/", async (req: Request, res: Response) => {
  // console.log(req.body)
  const { name, email, password } = req.body;
  res.status(201).json({
    message: "Created",
    data: { name, email }
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
