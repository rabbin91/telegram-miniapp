require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { verifyTelegramData } = require("./telegramAuth");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth", (req, res) => {
  const { initData } = req.body;

  const isValid = verifyTelegramData(
    initData,
    process.env.TELEGRAM_BOT_TOKEN
  );

  if (!isValid) {
    return res.status(403).json({ error: "Telegram authentication failed" });
  }

  const params = new URLSearchParams(initData);
  const user = JSON.parse(params.get("user"));

  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      first_name: user.first_name
    }
  });
});

app.listen(3000, () => {
  console.log("Backend lancé sur http://localhost:3000");
});
