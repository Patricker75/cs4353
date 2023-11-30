import {
  getProfile,
  addProfile,
  updateProfile,
} from "../services/profileService";

import validateProfile from "../validators/profileValidator";

export const getUserProfile = async (userId) => {
  try {
    let profile = await getProfile(userId);

    if (!profile) {
      return null;
    }

    return profile;
  } catch (error) {
    throw error;
  }
};

export const createUserProfile = async (userId, profileData) => {
  try {
    if (!validateProfile(profileData)) {
      throw Error("Invalid Profile");
    }

    await addProfile(userId, profileData);
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    if (!validateProfile(profileData)) {
      throw Error("Invalid Profile");
    }

    await updateProfile(userId, profileData);
  } catch (error) {
    throw error;
  }
};
