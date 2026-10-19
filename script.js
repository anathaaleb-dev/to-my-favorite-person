const music = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");
const toast = document.getElementById("toast");
const photoPicker = document.getElementById("photoPicker");
let selectedAlbum = null;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.classList.add("playing");
      musicLabel.textContent = "Musik menyala";
    } catch (error) {
      showToast("Tambahkan file musik.mp3 ke folder website dulu ya, sayang ♡");
    }
  } else {
    music.pause();
    musicButton.classList.remove("playing");
    musicLabel.textContent = "Putar musik";
  }
});

document.getElementById("openLetter").addEventListener("click", () => {
  document.getElementById("letter").scrollIntoView({ behavior: "smooth" });
  burstConfetti(70);
});
document.getElementById("showAlbums").addEventListener("click", () => {
  document.getElementById("memories").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("confettiButton").addEventListener("click", () => {
  burstConfetti(130);
  showToast("Peluk paling erat dari Haqi untuk Luthfiyah! 🫂🤍");
});

document.querySelectorAll(".album-card").forEach(card => {
  card.addEventListener("click", () => {
    selectedAlbum = card;
    photoPicker.value = "";
    photoPicker.click();
  });
});

photoPicker.addEventListener("change", () => {
  const file = photoPicker.files && photoPicker.files[0];
  if (!file || !selectedAlbum) return;
  if (!file.type.startsWith("image/")) {
    showToast("Pilih file foto ya ♡");
    return;
  }
  const reader = new FileReader();
  reader.onload = event => {
    const cover = selectedAlbum.querySelector(".album-cover");
    cover.style.background = `linear-gradient(#6b3f5433,#6b3f5433), url("${event.target.result}") center/cover`;
    selectedAlbum.querySelector(".album-emoji").style.display = "none";
    selectedAlbum.querySelector(".photo-hint").textContent = "FOTO PILIHANMU ♡";
    showToast("Foto berhasil dipasang di album ini ♡");
  };
  reader.readAsDataURL(file);
});

function burstConfetti(amount = 60) {
  const symbols = ["♡", "♥", "✦", "✧"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.color = ["#e58bb0", "#f4bfd4", "#d7a6d7", "#f6d98e", "#ffffff"][Math.floor(Math.random() * 5)];
    piece.style.fontSize = (12 + Math.random() * 16) + "px";
    piece.style.animationDuration = (2.5 + Math.random() * 3.5) + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 6500);
  }
}

// Tiny, subtle sparkles in the background
const sparkleLayer = document.getElementById("sparkleLayer");
for (let i = 0; i < 22; i++) {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = Math.random() > .5 ? "✧" : "·";
  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.top = Math.random() * 100 + "vh";
  sparkle.style.fontSize = (12 + Math.random() * 15) + "px";
  sparkle.style.animationDelay = (Math.random() * 4) + "s";
  sparkleLayer.appendChild(sparkle);
}

// A gentle welcome flourish
setTimeout(() => burstConfetti(24), 700);
