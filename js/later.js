// ============================
// VALIDASI INPUT NOMOR
// ============================
document.addEventListener("DOMContentLoaded", function () {

  const input = document.getElementById("phone");
  const btnDesktop = document.getElementById("btnDesktop");
  const btnMobile = document.getElementById("btnMobile");

  if (!input || !btnDesktop || !btnMobile) return;

  input.addEventListener("input", function () {

    let value = input.value.replace(/\D/g, "");

    // 🔥 handle +62 dan 0
    if (value.startsWith("62")) value = value.substring(2);
    if (value.startsWith("0")) value = value.substring(1);

    // validasi nomor (mulai 8 & min 9 digit)
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

// ============================
// SUBMIT NOMOR (SIMPAN SAJA)
// ============================
function submitData() {
  let phone = document.getElementById("phone").value;

  if (!phone) {
    alert("Masukkan nomor HP!");
    return;
  }

  // 🔥 bersihkan input
  phone = phone.replace(/\D/g, "");

  if (phone.startsWith("62")) phone = phone.substring(2);
  if (phone.startsWith("0")) phone = phone.substring(1);

  // ✅ simpan ke localStorage
  localStorage.setItem("phone", phone);

  // 🚀 lanjut ke halaman PIN
  window.location.href = "masuk.html";
}

// ============================
// SLIDER (TETAP DIPAKAI)
// ============================
const slider = document.getElementById("slider");
const thumb = document.getElementById("thumb");
const progress = document.getElementById("progress");
const amountText = document.getElementById("amountText");

if (slider && thumb && progress && amountText) {

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

    thumb.style.left = `${x}px`;
    progress.style.width = `${percent * 100}%`;

    const min = 500000;
    const max = 10000000;

    const value = Math.floor(min + percent * (max - min));

    amountText.innerText = "Rp" + formatRupiah(value);
  }

}

// ============================
// FORMAT RUPIAH
// ============================
function formatRupiah(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}