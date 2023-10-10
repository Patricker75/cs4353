import Router from "express-promise-router";

const router = Router();

router.get("/profile", async (req, res) => {
  console.log("Get Profile Not Yet Impelmented");

  res.status(501);
  res.send({
    message: "Get Profile Not Yet Impelmented",
  });
});

router.put("/profile/update", async (req, res) => {
  console.log("Update Profile Not Yet Impelmented");

  res.status(501);
  res.send({
    message: "Update Profile Not Yet Impelmented",
  });
});

export default router;
