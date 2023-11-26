import { executeQuery } from "../db";

export const getFuelQuote = async (userId, requestId) => {
  const query = {
    text: `
    SELECT
      *
    FROM
      fuel_request
    WHERE
      user_id = $1
    AND
      request_id = $2;
    `,
    values: [userId, requestId],
  };

  let result = await executeQuery(query);

  return result.rows.map((row) => {
    return {
      requestId: row.request_id,
      userId: row.user_id,
      amount: row.amount,
      totalPrice: row.total_price,
      deliveryDate: row.delivery_date,
    };
  })[0];
};

export const addFuelQuote = async (userId, requestData) => {
  const query = {
    text: `
    INSERT INTO fuel_request(user_id, amount, delivery_date, total_price)
    VALUES ($1, $2, $3, $4)
    RETURNING request_id;
    `,
    values: [
      userId,
      requestData.amount,
      requestData.deliveryDate,
      requestData.totalPrice,
    ],
  };

  let result = await executeQuery(query);

  return result.rows[0]?.request_id;
};

export const getQuoteHistory = async (userId) => {
  const query = {
    text: `
    SELECT
      *
    FROM
      fuel_request
    WHERE
      user_id = $1;
    `,
    values: [userId],
  };

  let result = await executeQuery(query);

  return result.rows.map((row) => {
    return {
      requestId: row.request_id,
      userId: row.user_id,
      amount: row.amount,
      totalPrice: row.total_price,
      deliveryDate: row.delivery_date,
    };
  });
};

export const updateUserStatus = async (userId) => {
  const query = {
    text: `
    UPDATE profile
    SET returning_customer = true
    WHERE user_id = $1;`,
    values: [userId],
  };

  await executeQuery(query);
};
