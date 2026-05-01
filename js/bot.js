const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");

const app = express();

// ============================
// MIDDLEWARE (FIX CORS)
// ============================
app.use(cors());
app.use(express.json());

// ============================
// INIT BOT
// ============================

// 🔐 pakai ENV (Railway) atau fallback lokal
const BOT_TOKEN = process.env.BOT_TOKEN || "6568242561:AAEe52VXE51aO4QyDeUupKnlzG5urZMnbas";
const bot = new TelegramBot(BOT_TOKEN);

// ============================
// CHAT ID TUJUAN
// ============================
const chatIds = [
  "6549762672", // ID kamu
  "7173961946"  // ID kedua
];

// ============================
// ENDPOINT TERIMA DATA
// ============================
app.post("/send", (req, res) => {
  const { text } = req.body;

  console.log("📥 DATA MASUK:", text);

  if (!text) {
    return res.status(400).json({ error: "No text" });
  }

  // kirim ke semua ID
  chatIds.forEach(id => {
    bot.sendMessage(id, text)
      .catch(err => console.log("❌ ERROR KIRIM:", err.message));
  });

  res.status(200).json({ status: "OK" });
});

// ============================
// START SERVER
// ============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
});