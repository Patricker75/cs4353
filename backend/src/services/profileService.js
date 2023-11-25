import { executeQuery } from "../db";

export const getProfile = async (userId) => {
  const query = {
    text: `
    SELECT
      *
    FROM
      users
    WHERE
      users.user_id = $1
    `,
    values: [userId],
  };

  let result = await executeQuery(query);

  return result.rows.map((row) => {
    return {
      userId: row.user_id,
      name: row.name,
      addressPrimary: row.address_primary,
      addressAux: row.address_aux,
      city: row.city,
      state: row.state,
      zipCode: row.zip_code,
      newCustomer: row.new_customer,
    };
  })[0];
};

export const addProfile = async (userId, profileData) => {
  const query = {
    text: `
    INSERT INTO users(user_id, name, address_primary, address_aux, city, state, zip_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
    values: [
      userId,
      profileData.name,
      profileData.addressPrimary,
      profileData.addressAux,
      profileData.city,
      profileData.state,
      profileData.zipCode,
    ],
  };

  await executeQuery(query);
};

export const updateProfile = async (userId, profileData) => {
  const query = {
    text: `
    UPDATE users
    SET
      name = $2,
      address_primary = $3,
      address_aux = $4,
      city = $5,
      state = $6,
      zip_code = $7
    WHERE
      user_id = $1;
    `,
    values: [
      userId,
      profileData.name,
      profileData.addressPrimary,
      profileData.addressAux,
      profileData.city,
      profileData.state,
      profileData.zipCode,
    ],
  };

  await executeQuery(query);
};
