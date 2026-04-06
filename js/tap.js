// tombol ke halaman OTP
document.getElementById("btnOtp").addEventListener("click", () => {
  window.location.href = "otpver.html";
});




const timerEl = document.getElementById("timer");

let time = 60; // 1 menit (60 detik)

function startTimer() {
  const interval = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    // format biar 01:00
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerEl.innerText = `Waktu tersisa 0${minutes}:${seconds}`;

    time--;

    if (time < 0) {
      clearInterval(interval);
      timerEl.innerText = "Waktu Habis";
    }
  }, 1000);
}

startTimer();