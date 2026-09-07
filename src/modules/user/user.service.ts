import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const userAllService = async () => {
  const result = await pool.query(`
      SELECT * FROM users
       `);

  return result;
};

const singleUserService = async (payload: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id=$1
    `,
    [payload],
  );

  return result;
};

const createUserService = async (payload: IUser) => {
  const { name, email, password, age, role } = payload;

  // Password hash
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
      INSERT INTO users (name, email, password, age, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [name, email, hashedPassword, age, role],
  );

  // Password response থেকে remove করা
  const { password: _, ...user } = result.rows[0];

  return user;
};

const updateUserService = async (id: string, payload: IUser) => {
  const { name, email, password, age, is_active, role } = payload;

  const result = await pool.query(
    `
          UPDATE users
          SET name =COALESCE($1, name),
              email =COALESCE($2, email),
              password = COALESCE($3, password),
              age = COALESCE($4, age),
              is_active = COALESCE($5, is_active),
              role = COALESCE($6, role)
          WHERE id = $7
          RETURNING *
          `,
    [name, email, password, age, is_active, role, id],
  );

  return result;
};

const deleteUserService = async (payload: string) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [payload],
  );

  return result;
};

export const userService = {
  userAllService,
  singleUserService,
  createUserService,
  updateUserService,
  deleteUserService,
};
