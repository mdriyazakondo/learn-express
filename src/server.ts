import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import { Pool } from "pg";
import config from "./config";
const app: Express = express();

// Middware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// storage connection
const pool = new Pool({
  connectionString: config.connection_string,
});

const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

initDb();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express  server",
    author: "Next Lavel",
  });
});

app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users
       `);

    res.status(200).json({
      sueecss: true,
      message: "Get All users Fetch successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(404).json({
      sueecss: false,
      message: "User not found",
    });
  }
});

app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await pool.query(
      `
    SELECT * FROM users WHERE id=$1
    `,
      [id],
    );
    res.status(201).json({
      success: true,
      message: "Sinle user Fetch success",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(404).json({
      sueecss: false,
      message: "User not found",
    });
  }
});

app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body;

    const result = await pool.query(
      `INSERT INTO users (name, email, password, age)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, password, age],
    );

    res.status(201).json({
      message: "Create user successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
});

app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { name, email, password, age, is_active } = req.body;

    const result = await pool.query(
      `
      UPDATE users
      SET name =COALESCE($1, name),
          email =COALESCE($2, email),
          password = COALESCE($3, password),
          age = COALESCE($4, age),
          is_active = COALESCE($5, is_active)
      WHERE id = $6
      RETURNING *
      `,
      [name, email, password, age, is_active, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

app.listen(config.port, () => {
  console.log(`server is running port : http://localhost:${config.port}`);
});
