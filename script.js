
// animaciones de botones de jr.robotica etc//
//PROBANDO HABER SI FUNCIONA//
const elementos = document.querySelectorAll(".typing");

elementos.forEach((el, index) => {

  const textos = [
    el.getAttribute("data-es"),
    el.getAttribute("data-en")
  ];

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
        setTimeout(loop, 2000); // ⬅️ pausa más larga al terminar
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

    // 🐌 VELOCIDAD MÁS LENTA AQUÍ
    setTimeout(loop, escribiendo ? 180 : 100);
  }

  setTimeout(loop, index * 1200);
});