import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} from "../controllers/profileController";

// Custom validation function to check if profile data is valid
const isUserProfileDataValid = (userProfileData) => {
  return (
    userProfileData &&
    typeof userProfileData === "object" &&
    typeof userProfileData.name === "string" &&
    userProfileData.name.length >= 1 &&
    userProfileData.name.length <= 255 &&
    typeof userProfileData.mainAddress === "string" &&
    userProfileData.mainAddress.length >= 1 &&
    userProfileData.mainAddress.length <= 255 &&
    typeof userProfileData.auxAddress === "string" &&
    userProfileData.auxAddress.length >= 1 &&
    userProfileData.auxAddress.length <= 255 &&
    typeof userProfileData.city === "string" &&
    userProfileData.city.length >= 1 &&
    userProfileData.city.length <= 255 &&
    typeof userProfileData.state === "string" &&
    userProfileData.state.length >= 1 &&
    userProfileData.state.length <= 255 &&
    typeof userProfileData.zipcode === "string" &&
    userProfileData.zipcode.length >= 1 &&
    userProfileData.zipcode.length <= 10 &&
    userProfileData.zipcode !== "0"
  );
};

export const handleUpdateProfile = async (req, res) => {
  try {
    const userId = req.get("userId");

    if (!userId) {
      res.status(404);
      res.send({
        error: "Missing userId",
      });

      return;
    }

    const profileData = req.body;

    let profileExists = (await getUserProfile(userId)) === true;

    if (profileExists) {
      await updateUserProfile(userId, profileData);
    } else {
      await createUserProfile(userId, profileData);
    }

    res.status(200);
    res.send({
      message: "OK",
    });
  } catch (error) {
    console.error(error);

    res.status(500);
    res.send({
      error: error.message,
    });
  }
};

export const handleGetProfile = async (req, res) => {
  const userId = req.get("userId");

  if (!userId) {
    res.status(404);
    res.send({
      error: "Missing userId",
    });

    return;
  }

  try {
    let profile = await getUserProfile(userId);

    if (!profile) {
      res.status(404);
      res.send({
        error: "profile not found",
      });

      return;
    }

    // Return the user's profile
    res.status(200);
    res.send({
      profile,
    });
  } catch (error) {
    res.status(500);
    res.send({
      error: error.message,
    });
  }
};
