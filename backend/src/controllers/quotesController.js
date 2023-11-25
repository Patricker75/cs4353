import {
  addFuelQuote,
  getFuelQuote,
  getQuoteHistory,
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

    return quotes;
  } catch (error) {
    throw error;
  }
};
