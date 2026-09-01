import { pool } from "../../db";

const userAllService = async () => {
  const result = await pool.query(`
      SELECT * FROM users
       `);

  return result;
};

const singleUserService = async (payload: any) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id=$1
    `,
    [payload],
  );

  return result;
};

const createUserService = async (payload: any) => {
  const { name, email, password, age } = payload;
  const result = await pool.query(
    `INSERT INTO users (name, email, password, age)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
    [name, email, password, age],
  );
  return result;
};

const updateUserService = async (payload: any) => {
  const id = payload.params.id;

  const { name, email, password, age, is_active } = payload.body;

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

const deleteUserService = async (payload: any) => {
  const id = payload.params.id;
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id],
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
