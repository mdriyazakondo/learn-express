import type { Request, Response } from "express";
import { pool } from "../../db";

const getAllUser = async (req: Request, res: Response) => {
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
};

const getSingleUser = async (req: Request, res: Response) => {
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
};

const createUser = async (req: Request, res: Response) => {
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
};

const updateUser = async (req: Request, res: Response) => {
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
};

const deleteUser = async (req: Request, res: Response) => {
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
};

export const userController = {
  getAllUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
