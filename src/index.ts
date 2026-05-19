import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (request, response) => {
  response.json({ message: "Coffee Shop API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
