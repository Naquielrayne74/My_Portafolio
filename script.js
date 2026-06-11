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

// Abrir modal para contacto enviar email
(() => {
  const form = document.getElementById("contactoForm");
  if (!form) return;

  const sanitize = (s) =>
    String(s || "")
      .replace(/[<>"'`]/g, "")
      .trim();

  const soloLetras = (s) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{2,60}$/.test(s);

  const emailOk = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

  const C = {
    nombre: {
      el: document.getElementById("nombre"),
      err: document.getElementById("err-nombre"),
    },
    apellido: {
      el: document.getElementById("apellido"),
      err: document.getElementById("err-apellido"),
    },
    email: {
      el: document.getElementById("cf-email"),
      err: document.getElementById("err-email"),
    }, // ← cf-email
    asunto: {
      el: document.getElementById("asunto"),
      err: document.getElementById("err-asunto"),
    },
    mensaje: {
      el: document.getElementById("mensaje"),
      err: document.getElementById("err-mensaje"),
    },
  };

  const setError = (k, msg) => {
    if (!C[k]) return;
    C[k].el.classList.add("error");
    C[k].el.classList.remove("ok");
    if (C[k].err) {
      C[k].err.textContent = msg;
      C[k].err.classList.add("visible");
    }
  };

  const clearError = (k) => {
    if (!C[k]) return;
    C[k].el.classList.remove("error");
    if (C[k].err) C[k].err.classList.remove("visible");
  };

  const setOk = (k) => {
    if (!C[k]) return;
    C[k].el.classList.remove("error");
    C[k].el.classList.add("ok");
    if (C[k].err) C[k].err.classList.remove("visible");
  };

  function validateField(k) {
    const value = sanitize(C[k].el.value);

    switch (k) {
      case "nombre":
        if (!value) {
          setError("nombre", "El nombre es obligatorio.");
          return false;
        }
        if (!soloLetras(value)) {
          setError("nombre", "Solo letras y espacios (mínimo 2 caracteres).");
          return false;
        }
        setOk("nombre");
        return true;

      case "apellido":
        if (value && !soloLetras(value)) {
          setError("apellido", "Solo se permiten letras y espacios.");
          return false;
        }
        clearError("apellido");
        return true;

      case "email": {
        const raw = C.email.el.value.trim();
        if (!raw) {
          setError("email", "El correo es obligatorio.");
          return false;
        }
        if (!emailOk(raw)) {
          setError("email", "Correo electrónico inválido.");
          return false;
        }
        setOk("email");
        return true;
      }

      case "asunto":
        if (!C.asunto.el.value) {
          setError("asunto", "Selecciona un asunto.");
          return false;
        }
        setOk("asunto");
        return true;

      case "mensaje":
        if (value.length < 10) {
          setError("mensaje", "El mensaje debe tener al menos 10 caracteres.");
          return false;
        }
        setOk("mensaje");
        return true;
    }

    return true;
  }

  Object.keys(C).forEach((k) => {
    if (!C[k].el) return;
    C[k].el.addEventListener("blur", () => validateField(k));
    C[k].el.addEventListener("input", () => validateField(k));
  });

  const mensajeEl = document.getElementById("mensaje");
  const contador = document.getElementById("charCount");
  if (mensajeEl && contador) {
    mensajeEl.addEventListener("input", () => {
      const total = mensajeEl.value.length;
      contador.textContent = total;
      contador.style.color = total >= 790 ? "#E24B4A" : "#00bcd4";
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const trampa = form.querySelector(".campo-trampa");
    if (trampa && trampa.value) return;

    let valido = true;
    ["nombre", "apellido", "email", "asunto", "mensaje"].forEach((campo) => {
      if (!validateField(campo)) valido = false;
    });

    const politica = document.getElementById("politica");
    const errPolitica = document.getElementById("err-politica");
    if (!politica.checked) {
      errPolitica.classList.add("visible");
      valido = false;
    } else {
      errPolitica.classList.remove("visible");
    }

    if (!valido) return;

    const btn = document.getElementById("btnEnviar");
    const txt = document.getElementById("btnTxt");
    const errMsg = document.getElementById("formErrorMsg");

    btn.disabled = true;
    txt.textContent = "Enviando...";
    errMsg.classList.remove("visible");

    const fd = new FormData();
    fd.append("nombre", sanitize(C.nombre.el.value));
    fd.append("apellido", sanitize(C.apellido.el.value));
    fd.append("email", sanitize(C.email.el.value));
    fd.append("asunto", sanitize(C.asunto.el.value));
    fd.append("mensaje", sanitize(C.mensaje.el.value));
    fd.append(
      "_subject",
      `Contacto Portfolio – ${sanitize(C.asunto.el.value)}`,
    );
    fd.append("_captcha", "false");
    fd.append("_template", "table");
    fd.append("_next", window.location.href);

    const resetBtn = () => {
      btn.disabled = false;
      txt.textContent = "Enviar mensaje";
    };

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/nahunmartinez7692@gmail.com", // ← email de Nahun
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: fd,
        },
      );

      const data = await res.json().catch(() => null);
      const ok = res.ok && data && data.success === "true";

      if (ok) {
        form.style.display = "none";
        document.getElementById("formSuccess").classList.add("visible");
      } else {
        console.error("FormSubmit response:", res.status, data);
        resetBtn();
        errMsg.classList.add("visible");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      resetBtn();
      errMsg.classList.add("visible");
    }
  });

  // ── Modal ────────────────────────────────────────────────────────────────

  function abrirModal() {
    document.getElementById("contactModal").classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function cerrarModal() {
    document.getElementById("contactModal").classList.remove("visible");
    document.body.style.overflow = "";
  }
  const btnHero = document.getElementById("btnAbrirFormHero");
  const btnFooter = document.getElementById("btnAbrirFormFooter");
  const btnCerrar = document.getElementById("contactModalClose");
  const modal = document.getElementById("contactModal");

  if (btnHero)
    btnHero.addEventListener("click", (e) => {
      e.preventDefault();
      abrirModal();
    });
  if (btnFooter)
    btnFooter.addEventListener("click", (e) => {
      e.preventDefault();
      abrirModal();
    });
  if (btnCerrar) btnCerrar.addEventListener("click", cerrarModal);
  // ❌ Quitado: el listener que cerraba al hacer clic fuera
})();
