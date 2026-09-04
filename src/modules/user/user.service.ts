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
  const { name, email, password, age } = payload;

  const hashPassowrd = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (name, email, password, age)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, age,created_at, updated_at`,
    [name, email, hashPassowrd, age],
  );
  return result;
};

const updateUserService = async (id: string, payload: IUser) => {
  const { name, email, password, age, is_active } = payload;

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
