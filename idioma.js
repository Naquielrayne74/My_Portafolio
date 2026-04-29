const btn = document.getElementById("btnIdioma");
let idioma = localStorage.getItem("idioma") || "es";

/* APLICAR IDIOMA */
function aplicarIdioma() {
  document.documentElement.lang = idioma;


  document.querySelectorAll("[data-es]").forEach(el => {
    const texto = el.getAttribute(`data-${idioma}`);
    if (texto) el.innerHTML = texto;
  });

  // mover switch visual si existe
  if (btn) {
    if (idioma === "en") {
      btn.classList.add("en");
    } else {
      btn.classList.remove("en");
    }
  }
     actualizarCV();
}


/* EJECUTAR SIEMPRE AL CARGAR */
document.addEventListener("DOMContentLoaded", aplicarIdioma);

/* SI EXISTE BOTÓN, ACTIVAR CAMBIO */
if (btn) {
  btn.addEventListener("click", () => {
    idioma = idioma === "es" ? "en" : "es";
    localStorage.setItem("idioma", idioma);
    aplicarIdioma();
  });
}

const cvBtn = document.querySelector('.cv-btn');

function actualizarCV() {
  if (!cvBtn) return;

  if (idioma === "es") {
    cvBtn.href = "CV/Nahun-Martinez-CV.pdf";
  } else {
    cvBtn.href = "CV/Nahun-Martinez-CV-en.pdf";
  }
}