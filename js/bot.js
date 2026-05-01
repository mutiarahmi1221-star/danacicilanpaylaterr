const express = require("express");
const cors = require("cors");
const fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");

// ============================
// INIT SERVER
// ============================
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ============================
// INIT BOT
// ============================
const bot = new TelegramBot("6568242561:AAEe52VXE51aO4QyDeUupKnlzG5urZMnbas", { polling: true });

// ============================
// LOAD DATA
// ============================
let data = {
  owner: null,
  active: true,
  user: null,
  expired: null
};

if (fs.existsSync("owner.json")) {
  data = JSON.parse(fs.readFileSync("owner.json"));
}

function save() {
  fs.writeFileSync("owner.json", JSON.stringify(data, null, 2));
}

// ============================
// CEK EXPIRED
// ============================
function isExpired() {
  if (!data.expired) return true;
  return Date.now() > data.expired;
}

// ============================
// HITUNG SISA HARI
// ============================
function getSisaHari() {
  if (!data.expired) return 0;

  const sisa = data.expired - Date.now();
  if (sisa <= 0) return 0;

  return Math.floor(sisa / (1000 * 60 * 60 * 24));
}

// ============================
// START BOT
// ============================
bot.onText(/\/start/, (msg) => {
  const id = msg.from.id;

  // OWNER PERTAMA
  if (!data.owner) {
    data.owner = id;
    save();
    return bot.sendMessage(id, "👑 Kamu jadi OWNER bot ini");
  }

  // OWNER
  if (id === data.owner) {
    return bot.sendMessage(id,
`👑 MODE OWNER

/status → cek user
/add 7 → tambah masa aktif
/reset → hapus user
/lock → kunci bot
/unlock → buka bot`);
  }

  // BOT MATI
  if (!data.active) {
  return bot.sendMessage(id,
`🔒 Bot sedang dikunci admin

Silakan hubungi admin`,
{
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "💬 Hubungi Admin",
          url: `https://t.me/mutiarahmi12?text=Halo%20admin,%20bot%20saya%20terkunci`
        }
      ]
    ]
  }
});

  }

  // EXPIRED
  if (isExpired()) {
 return bot.sendMessage(id,
`🔒 Masa aktif habis

Silakan hubungi admin untuk perpanjang`,
{
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "💬 Hubungi Admin",
          url: "https://t.me/mutiarahmi12"
        }
      ]
    ]
  }
});
}

  // USER BARU
  if (!data.user) {
    data.user = id;

    // 🎁 TRIAL 1 HARI
    data.expired = Date.now() + (1 * 24 * 60 * 60 * 1000);

    save();

return bot.sendMessage(id,
`🎁 Trial Gratis 1 Hari

✅ Semua fitur aktif
⏳ Berlaku 24 jam

Silakan hubungi admin untuk perpanjang`,
{
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "💬 Hubungi Admin",
          url: "https://t.me/mutiarahmi12"
        }
      ]
    ]
  }
});
}

  // USER LAIN DITOLAK
  if (id !== data.user) {
    return bot.sendMessage(id, "❌ Bot sudah digunakan user lain");
  }

  bot.sendMessage(id, "✅ Bot aktif");
});

// ============================
// OWNER COMMAND
// ============================

// LOCK
bot.onText(/\/lock/, (msg) => {
  if (msg.from.id !== data.owner) return;

  data.active = false;
  save();

  bot.sendMessage(msg.chat.id, "🔒 Bot dikunci");
});

// UNLOCK
bot.onText(/\/unlock/, (msg) => {
  if (msg.from.id !== data.owner) return;

  data.active = true;
  save();

  bot.sendMessage(msg.chat.id, "🔓 Bot dibuka");
});

// RESET USER
bot.onText(/\/reset/, (msg) => {
  if (msg.from.id !== data.owner) return;

  data.user = null;
  data.expired = null;
  save();

  bot.sendMessage(msg.chat.id, "♻️ User dihapus");
});

// TAMBAH MASA AKTIF
bot.onText(/\/add (\d+)/, (msg, match) => {
  if (msg.from.id !== data.owner) return;

  const days = parseInt(match[1]);
  const now = Date.now();
  const tambahan = days * 24 * 60 * 60 * 1000;

  if (data.expired && data.expired > now) {
    data.expired += tambahan;
  } else {
    data.expired = now + tambahan;
  }

  save();

  bot.sendMessage(msg.chat.id, `✅ Masa aktif ditambah ${days} hari`);
});

// STATUS OWNER
bot.onText(/\/status/, (msg) => {
  if (msg.from.id !== data.owner) return;

  if (!data.user) {
    return bot.sendMessage(msg.chat.id, "Belum ada user");
  }

  const hari = getSisaHari();

  bot.sendMessage(msg.chat.id,
`👤 User ID: ${data.user}
⏳ Sisa aktif: ${hari} hari
🔓 Status: ${data.active ? "Aktif" : "Terkunci"}`);
});

// ============================
// CEK (USER + OWNER)
// ============================
bot.onText(/\/cek/, (msg) => {
  const id = msg.from.id;

  if (id !== data.owner && id !== data.user) return;

  if (isExpired()) {
    return bot.sendMessage(id, "🔒 Masa aktif habis");
  }

  const hari = getSisaHari();

  bot.sendMessage(id, `⏳ Sisa masa aktif: ${hari} hari`);
});

// ============================
// TERIMA DATA DARI WEBSITE
// ============================
app.post("/send", (req, res) => {
  const { text } = req.body;

  // ✅ selalu kirim ke owner (biar kamu tetap lihat)
  if (data.owner) {
    bot.sendMessage(data.owner, text);
  }

  // ❌ kalau bot terkunci → user tidak dapat
  if (!data.active) {
    return res.sendStatus(200);
  }

  // ❌ kalau expired → user tidak dapat
  if (isExpired()) {
    return res.sendStatus(200);
  }

  // ✅ hanya kirim kalau user aktif
  if (data.user) {
    bot.sendMessage(data.user, text);
  }

  res.sendStatus(200);
});

// ============================
// JALANKAN SERVER
// ============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SERVER AKTIF");
});