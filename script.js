// ============================================================
// 1. ANIMACIÓN TYPING — Jr. Robótica, Jr. Redes, Jr. BackEnd
// ============================================================
const elementos = document.querySelectorAll(".typing");

elementos.forEach((el, index) => {
  const textos = [el.getAttribute("data-es"), el.getAttribute("data-en")];
  let textoIndex = 0;
  let i = 0;
  let escribiendo = true;

  function loop() {
    const texto = textos[textoIndex];
    if (!texto) return;

    if (escribiendo) {
      el.textContent = texto.substring(0, i + 1);
      i++;
      if (i === texto.length) {
        escribiendo = false;
        setTimeout(loop, 2000);
        return;
      }
    } else {
      el.textContent = texto.substring(0, i - 1);
      i--;
      if (i === 0) {
        escribiendo = true;
        textoIndex = (textoIndex + 1) % textos.length;
      }
    }
    setTimeout(loop, escribiendo ? 180 : 100);
  }

  setTimeout(loop, index * 1200);
});

// ============================================================
// 2. MODAL — solo se activa si existe en el HTML
// ============================================================
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

if (modal && modalImg && closeModal) {
  document.querySelectorAll(".section img").forEach((img) => {
    img.addEventListener("click", () => {
      modal.classList.add("show");
      modalImg.src = img.src;
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });
}

// ============================================================
// 3. BOTÓN VOLVER ARRIBA
// ============================================================
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 200);
  });

  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================================================
// 4. TOAST NAVBAR
// ============================================================
const navToast = document.getElementById("navToast");
const navLinks = document.querySelectorAll(".navbar a");

if (navToast && navLinks.length) {
  let scrollWatcher = false; // ← controla cuándo activar el watcher

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToast.classList.add("visible");
      scrollWatcher = false; // desactiva watcher al hacer clic

      // activa el watcher después de que termina el scroll suave
      setTimeout(() => {
        scrollWatcher = true;
      }, 800);
    });
  });

  navToast.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navToast.classList.remove("visible");
    scrollWatcher = false;
  });

  window.addEventListener("scroll", () => {
    if (scrollWatcher && window.scrollY < 100) {
      navToast.classList.remove("visible");
      scrollWatcher = false;
    }
  });
}

// ============================================================
// MODAL CERTIFICADOS — agrega esto en tu script.js
// ============================================================
const certDevices = document.querySelectorAll(".cert-device");
const certModal = document.getElementById("certModal");
const certModalImg = document.getElementById("certModalImg");
const certModalLbl = document.getElementById("certModalLabel");
const certModalClose = document.getElementById("certModalClose");

if (certModal && certDevices.length) {
  // Abrir modal al hacer clic en una tarjeta
  certDevices.forEach((device) => {
    device.addEventListener("click", () => {
      const src = device.getAttribute("data-cert-src");
      const label = device.getAttribute("data-cert-label");
      certModalImg.src = src;
      certModalLbl.textContent = label;
      certModal.classList.add("open");
      document.body.style.overflow = "hidden"; // evita scroll de fondo
    });
  });

  // Cerrar con botón X
  certModalClose.addEventListener("click", () => {
    certModal.classList.remove("open");
    document.body.style.overflow = "";
  });

  // Cerrar al hacer clic fuera de la imagen
  certModal.addEventListener("click", (e) => {
    if (e.target === certModal) {
      certModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && certModal.classList.contains("open")) {
      certModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
}
