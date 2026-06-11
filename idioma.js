const btn = document.getElementById("btnIdioma");
let idioma = localStorage.getItem("idioma") || "es";

function aplicarIdioma() {
  document.documentElement.lang = idioma;

  document.querySelectorAll("[data-es]").forEach((el) => {
    const texto = el.getAttribute(`data-${idioma}`);
    if (texto) el.innerHTML = texto;
  });

  document.querySelectorAll("[data-placeholder-es]").forEach((el) => {
    const ph = el.getAttribute(`data-placeholder-${idioma}`);
    if (ph) el.placeholder = ph;
  });

  if (btn) {
    if (idioma === "en") {
      btn.classList.add("en");
    } else {
      btn.classList.remove("en");
    }
  }
  actualizarCV();
}

function actualizarCV() {
  const cvBtn = document.querySelector(".rc-cv-btn");
  if (!cvBtn) return;

  cvBtn.href =
    idioma === "es"
      ? "CV/Nahun-Martinez-CV.pdf"
      : "CV/Nahun-Martinez-CV-en.pdf";
}

document.addEventListener("DOMContentLoaded", aplicarIdioma);

if (btn) {
  btn.addEventListener("click", () => {
    idioma = idioma === "es" ? "en" : "es";
    localStorage.setItem("idioma", idioma);
    aplicarIdioma();
  });
}
