import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} from "../controllers/profileController";

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

    let profileExists = (await getUserProfile(userId)) !== null;

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
    res.status(500);
    res.send({
      error: "Internal Server Error",
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
      error: "Internal Server Error",
    });
  }
};
