import { getUserState, getUserStatus } from "../services/pricingService";

import validatePrice from "../validators/pricingValidator";

const PRICE_PER_GALLON = 1.5;
const COMPANY_PROFIT_MARGIN = 0.1;

export const getStateModifier = async (userId) => {
  let state = await getUserState(userId);

  if (state === "TX") {
    return 0.02;
  }

  return 0.04;
};

export const getStatusModifier = async (userId) => {
  let status = await getUserStatus(userId);

  if (status) {
    return 0.01;
  }

  return 0;
};

export const getAmountModifier = async (amount) => {
  if (amount > 1000) {
    return 0.02;
  }

  return 0.03;
};

export const calculateMargin = async (userId, amount) => {
  let stateMod = (await getStateModifier(userId)) * 100;
  let statusMod = (await getStatusModifier(userId)) * 100;
  let amountMod = (await getAmountModifier(amount)) * 100;

  // Avoid floating point errors
  let priceModifier =
    stateMod - statusMod + amountMod + COMPANY_PROFIT_MARGIN * 100;

  return (PRICE_PER_GALLON * priceModifier) / 100;
};

export const calculatePricePerGallon = async (userId, amount) => {
  try {
    if (!validatePrice(amount)) {
      throw Error("Invalid Amount");
    }

    let margin = await calculateMargin(userId, amount);

    return PRICE_PER_GALLON + margin;
  } catch (error) {
    throw error;
  }
};

export const calculateTotal = async (amount, unitPrice) => {
  return Math.round(amount * unitPrice * 100) / 100;
};
