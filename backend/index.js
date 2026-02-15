import express from "express";

const app = express();

const PORT = 3000;

app.get("/api/test", (req, res) => {
  return res.json("health is good");
});

app.listen(PORT, () => {
  console.log("server is listening");
});
