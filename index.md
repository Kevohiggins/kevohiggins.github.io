---
layout: default
title: Inicio
---

<h1 id="saludo-dinamico">¡Bienvenida/o!</h1>

No sé cómo hayas llegado hasta acá, ¡pero este es mi espacio!

No tiene muchas cosas, de momento. Como podrás observar, está en construcción.

## ¿Y vos quién sos, flaco?

¡Tranqui! ¡A eso voy!

Soy Kevin O’Higgins, **Kev** para algunos. 23 años al momento de escribir esto.
Me considero un tipo "normal", pero con mil particularidades, como tantos.

## ¿Por qué no hay imágenes? Esto es una bosta

Perdón, amiga/o. La verdad, sin vaselina, es que soy ciego; mientras yo solo administre esto, no me pidas más. Tu única esperanza de salvación radica en que, un día, me levante con un ataque de inspiración y diga:

> Eso no es excusa, ¡no seas quedado y mejorá la imagen de tu bendita página! usá IA o lo que sea.

De todas maneras, cierto es que la pereza me lleva a no ponerlas; además… leé, leé, que poco a poco se va perdiendo la costumbre, aunque me pese reconocerlo. Y basta, que me pongo a elucubrar y no termino más.

Espero que disfrutes de lo que sea que encuentres por acá.

Si querés decir algo, tenés un [apartado de contacto](./contactame/), donde podrás descargarte, ya sea recomendándome algo, sugiriendo, o puteándome por no ser **aesthetic**.

¡Que disfrutes de tu estadía!

<script>
  (function() {
    const hora = new Date().getHours();
    const etiqueta = document.getElementById('saludo-dinamico');
    
    // Si no encuentra el ID (por si las moscas), que no haga nada
    if (!etiqueta) return;

    let mensaje = "¡Bienvenida/o!"; // Saludo por defecto

    // Lógica de horarios
    if (hora >= 5 && hora < 12) {
      mensaje = "¡Buenos días!";
    } else if (hora >= 12 && hora < 20) {
      mensaje = "¡Buenas tardes!";
    } else {
      mensaje = "¡Buenas noches!";
    }

    // Cambiamos el texto del h1
    etiqueta.textContent = mensaje;
  })();
</script>