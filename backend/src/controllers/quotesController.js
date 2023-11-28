import {
  addFuelQuote,
  getFuelQuote,
  getQuoteHistory,
  updateUserStatus,
} from "../services/quotesServices";

import validateQuote from "../validators/quotesValidator";

export const createNewFuelQuote = async (userId, requestData) => {
  try {
    // Parse date from string into Date object
    requestData.deliveryDate = new Date(requestData.deliveryDate);

    if (!validateQuote(requestData)) {
      throw Error("Invalid Quote");
    }

    let requestId = await addFuelQuote(userId, requestData);

    // Update user status on successful creation of quote
    await updateUserStatus(userId);

    return requestId;
  } catch (error) {
    throw error;
  }
};

export const getUserFuelQuote = async (userId, requestId) => {
  try {
    let quote = await getFuelQuote(userId, requestId);

    if (!quote) {
      return null;
    }

    return quote;
  } catch (error) {
    throw error;
  }
};

export const getUserQuoteHistory = async (userId) => {
  try {
    let quotes = await getQuoteHistory(userId);

    if (quotes.length === 0) {
      throw Error("No Quotes Found");
    }

    // Parse Properties into Approriate Types
    quotes = quotes.map((quote) => {
      return {
        ...quote,
        amount: parseFloat(quote.amount),
        unitPrice: parseFloat(quote.unitPrice),
        totalPrice: parseFloat(quote.totalPrice),
        deliveryDate: new Date(quote.deliveryDate),
      };
    });

    return quotes;
  } catch (error) {
    throw error;
  }
};
