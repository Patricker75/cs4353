// Simulated database for storing user profiles
const profiles = {};

// Initialize the profiles object with a sample user profile
profiles["yourUserId"] = {
  name: "",
  mainAddress: "",
  auxAddress: "",
  city: "",
  state: "",
  zipcode: "",
};

// Custom validation function to check if profile data is valid
const isUserProfileDataValid = (userProfileData) => {
  return (
    userProfileData &&
    typeof userProfileData === 'object' &&
    typeof userProfileData.name === 'string' &&
    userProfileData.name.length >= 1 && userProfileData.name.length <= 255 &&
    typeof userProfileData.mainAddress === 'string' &&
    userProfileData.mainAddress.length >= 1 && userProfileData.mainAddress.length <= 255 &&
    typeof userProfileData.auxAddress === 'string' &&
    userProfileData.auxAddress.length >= 1 && userProfileData.auxAddress.length <= 255 &&
    typeof userProfileData.city === 'string' &&
    userProfileData.city.length >= 1 && userProfileData.city.length <= 255 &&
    typeof userProfileData.state === 'string' &&
    userProfileData.state.length >= 1 && userProfileData.state.length <= 255 &&
    typeof userProfileData.zipcode === 'string' &&
    userProfileData.zipcode.length >= 1 && userProfileData.zipcode.length <= 10 && userProfileData.zipcode !== "0"
  );
};

export const handleProfileUpdate = async (req, res) => {
  try {
    // Get the user ID from the request data
    const userId = req.body.userID;

    if (!userId) {
      res.status(400);
      res.send({ error: "User ID not provided in the request." });
      return;
    }

    // Extract profile data from the request data
    const userProfileData = req.body.profileData;

    if (!isUserProfileDataValid(userProfileData)) {
      res.status(400);
      res.send({ error: "Invalid profile data provided." });
      return;
    }

    // Ensure that the profile for the user exists
    if (!profiles[userId]) {
      profiles[userId] = {
        name: "",
        mainAddress: "",
        auxAddress: "",
        city: "",
        state: "",
        zipcode: "",
      };
    }

    console.log("");
    console.log("**************************************");
    console.log("");
    console.log("Received profile data:");
    console.log("User ID:", userId);

    // Log each specific change to the profile data
    if (userProfileData.name) {
      profiles[userId].name = userProfileData.name;
      console.log("Updated name:", userProfileData.name);
    }
    if (userProfileData.mainAddress) {
      profiles[userId].mainAddress = userProfileData.mainAddress;
      console.log("Updated mainAddress:", userProfileData.mainAddress);
    }
    if (userProfileData.auxAddress) {
      profiles[userId].auxAddress = userProfileData.auxAddress;
      console.log("Updated auxAddress:", userProfileData.auxAddress);
    }
    if (userProfileData.city) {
      profiles[userId].city = userProfileData.city;
      console.log("Updated city:", userProfileData.city);
    }
    if (userProfileData.state) {
      profiles[userId].state = userProfileData.state;
      console.log("Updated state:", userProfileData.state);
    }
    if (userProfileData.zipcode) {
      profiles[userId].zipcode = userProfileData.zipcode;
      console.log("Updated zipcode:", userProfileData.zipcode);
    }
    console.log("");
    console.log("**************************************");

    // Send a success response
    res.status(200);
    res.send({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500);
    res.send({ error: "Internal server error." });
  }
};

export const handleGetProfile = async (req, res) => {
  const userId = req.body.userID;

  if (!userId || !profiles[userId]) {
    res.status(404);
    res.send({ error: "User profile not found." });
    return;
  }

  // Return the user's profile
  res.status(200);
  res.send(profiles[userId]);
};
