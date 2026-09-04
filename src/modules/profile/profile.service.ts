import { pool } from "../../db";

const allProfileService = async () => {
  const result = await pool.query(`
    SELECT * FROM profiles
    `);

  return result;
};

const singleProfileService = async (id: string) => {
  const result = await pool.query(
    `
        SELECT * FROM profiles WHERE id=$1
        `,
    [id],
  );

  return result;
};

const createProfileService = async (payload: any) => {
  const [bio, user_id, address, phone, gender] = payload;
  const result = await pool.query(
    `INSERT INTO profiles (bio, user_id, address, phone,gender)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
    [bio, user_id, address, phone, gender],
  );
  return result;
};

export const profileService = {
  allProfileService,
  singleProfileService,
  createProfileService,
};
