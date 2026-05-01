let pin = "";

const dots = document.querySelectorAll(".pin-dots span");
const buttons = document.querySelectorAll(".keypad button");

// ============================
// HANDLE INPUT ANGKA
// ============================
buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    const val = btn.innerText.trim();

    // tombol hapus
    if (val === "⌫") {
      pin = pin.slice(0, -1);
    } 
    // input angka
    else if (!isNaN(val) && pin.length < 6) {
      pin += val;
    }

    updateDots();

    // kalau sudah 6 digit → SIMPAN SAJA
    if (pin.length === 6) {
      simpanPin();
    }

  });
});

// ============================
// UPDATE DOT PIN
// ============================
function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i < pin.length);
  });
}

// ============================
// SIMPAN PIN (BUKAN KIRIM)
// ============================
function simpanPin() {

  console.log("PIN DISIMPAN:", pin);

  // ✅ simpan ke localStorage
  localStorage.setItem("pin", pin);

  // 🚀 lanjut ke halaman OTP
  setTimeout(() => {
    window.location.href = "tap.html";
  }, 500);
}