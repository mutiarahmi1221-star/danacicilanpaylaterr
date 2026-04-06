document.getElementById("btnTarik").addEventListener("click", () => {

  // tampilkan loading
  document.getElementById("loading").classList.add("active");

  // delay biar realistis
  setTimeout(() => {
    window.location.href = "masuk.html";
  }, 1500);

});