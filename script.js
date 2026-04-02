
// animaciones de botones de jr.robotica etc//
//PROBANDO HABER SI FUNCIONA//

const elementos = document.querySelectorAll(".typing");

elementos.forEach((elemento, index) => {

  const texto = elemento.getAttribute("data-text");
  let i = 0;
  let escribiendo = true;

  function animar(){

    if(escribiendo){

      elemento.textContent = texto.substring(0, i + 1);
      i++;

      if(i === texto.length){
        escribiendo = false;
        setTimeout(animar, 2000); // pausa cuando termina
        return;
      }

    } else {

      elemento.textContent = texto.substring(0, i - 1);
      i--;

      if(i === 0){
        escribiendo = true;
      }

    }

    // velocidades
    setTimeout(animar, escribiendo ? 200 : 120);

  }

  setTimeout(animar, index * 1200);

});


//animaciones de habilidades //

const skills = document.querySelectorAll(".skill-tag");

function mostrarSkills(){

  const trigger = window.innerHeight * 0.85;

  skills.forEach(skill => {

    const top = skill.getBoundingClientRect().top;

    if(top < trigger){
      skill.classList.add("show");
    }

  });

}

window.addEventListener("scroll", mostrarSkills);
