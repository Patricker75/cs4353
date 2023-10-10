import Router from "express-promise-router";

const router = Router();

router.post("/quotes/new", async (req, res) => {
  console.log("New Fuel Quote Not Yet Impelmented");

  res.status(501);
  res.send({
    message: "New Fuel Quote Not Yet Impelmented",
  });
});

router.get("/quotes/history", async (req, res) => {
  console.log("Get Fuel Quote History Not Yer Implemented");

  res.status(501);
  res.send({
    message: "Get Fuel Quote History Not Yer Implemented",
  });
});

export default router;
