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
      unitPrice: row.unit_price,
      totalPrice: row.total_price,
      deliveryAddress: row.delivery_address,
      deliveryDate: row.delivery_date,
    };
  })[0];
};

export const addFuelQuote = async (userId, requestData) => {
  const query = {
    text: `
    INSERT INTO fuel_request(user_id, amount, unit_price, total_price, delivery_address, delivery_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING request_id;
    `,
    values: [
      userId,
      requestData.amount,
      requestData.unitPrice,
      requestData.totalPrice,
      requestData.deliveryAddress,
      requestData.deliveryDate,
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
      unitPrice: row.unit_price,
      totalPrice: row.total_price,
      deliveryAddress: row.delivery_address,
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
