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
      name VARCHAR(100),
      email VARCHAR(255) UNIQUE NOT NULL ,
      password VARCHAR(100) NOT NULL,
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

app.post("/api/users", async (req: Request, res: Response) => {
  // console.log(req.body)
  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(`
    INSERT INTO users(name, email,password, age ) VALUES($1,$2,$3,$4)
    RETURNING *
    `, [name, email, password, age])
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
})
/* Get all users */
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users
      `)
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
})
/* Get single user with id */
app.get('/api/users/:id', async (req: Request, res: Response) => {
  // const {id} = req.params;
  const id = req.params.id;

  try {
    const result = await pool.query(`
      SELECT * FROM users WHERE id=$1
      `, [id])

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
})
/* Update user with PUT mathod */
app.put('/api/users/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, password, age, is_active, } = req.body;
  const result = await pool.query(`
    UPDATE users SET
     name=COALESCE($1,name),
     password=COALESCE($2,password),
     age=COALESCE($3,age),
     is_active=COALESCE($4,is_active)
    WHERE id=$5 RETURNING *
    `, [name, password, age, is_active, id])
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
    res.status(404).json({
      success: false,
      message: error.message,
      error: error
    })
  }

})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
