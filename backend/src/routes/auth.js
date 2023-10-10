import Router from "express-promise-router";

const router = Router();

router.post("/auth/login", async (req, res) => {
  console.log("Login Not Yet Impelmented");

  res.status(501);
  res.send({
    message: "Login Not Yet Impelmented",
  });
});

export default router;
