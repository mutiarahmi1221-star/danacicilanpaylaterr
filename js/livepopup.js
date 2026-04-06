function showPopup(user, produk, amount) {
  const container = document.getElementById("live-popup-container");

  const popup = document.createElement("div");
  popup.className = "live-popup";

  popup.innerHTML = `
    <img src="${user.avatar}">
    <div>
      <span class="name">${user.name}</span> berhasil mengajukan<br>
      <b>${produk}</b> sebesar <b>Rp ${amount}</b>
    </div>
  `;

  container.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 4000);
}

/* DATA USER (FIX PAIR) */
const users = [
  { name: "Siti Aisyah", avatar: "assets/avatar/1.jpg" },
  { name: "Budi Santoso", avatar: "assets/avatar/2.jpg" },
  { name: "Dewi Lestari", avatar: "assets/avatar/3.jpg" },
  { name: "Andi Pratama", avatar: "assets/avatar/4.jpg" },
  { name: "Riska Yanti", avatar: "assets/avatar/9.jpg" },
  { name: "Fatimah", avatar: "assets/avatar/10.jpg" },
  { name: "Amelia Zuhra", avatar: "assets/avatar/11.jpg" },
  { name: "Hendra", avatar: "assets/avatar/5.jpg" },
  { name: "Rangga Saputra", avatar: "assets/avatar/6.jpg" },
  { name: "Putra Wijaya", avatar: "assets/avatar/7.jpg" }
];

/* PRODUK & NOMINAL */
const produkList = ["DANA CICIL", "DANA PayLater"];
const amountList = ["1.500.000", "2.700.000", "3.200.000", "5.000.000"];

/* BIAR NGGAK NGULANG TERUS */
let lastIndex = -1;

function getRandomUser() {
  let index;
  do {
    index = Math.floor(Math.random() * users.length);
  } while (index === lastIndex);

  lastIndex = index;
  return users[index];
}

/* AUTO POPUP */
setInterval(() => {
  const user = getRandomUser();
  const produk = produkList[Math.floor(Math.random() * produkList.length)];
  const amount = amountList[Math.floor(Math.random() * amountList.length)];

  showPopup(user, produk, amount);
}, 5000);








const video = document.getElementById("bgVideo");
const btn = document.getElementById("soundBtn");

btn.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;
    video.play();
    btn.innerText = "🔇 Matikan Suara";
  } else {
    video.muted = true;
    btn.innerText = "🔊 Nyalakan Suara";
  }
});






function goForm(type) {
  document.getElementById("loading").style.display = "flex";

  setTimeout(() => {
    if (type === "paylater") {
      window.location.href = "later.html";
    }

    if (type === "cicil") {
      window.location.href = "later.html";
    }

    if (type === "batal") {
      window.location.href = "later.html";
    }
  }, 800); // delay biar animasi keliatan
}