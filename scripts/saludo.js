(function() {
  const hora = new Date().getHours();
  const etiqueta = document.getElementById('saludo-dinamico');
  
  if (!etiqueta) return;

  let mensaje = "¡Bienvenida/o!"; // Saludo por defecto

  if (hora >= 5 && hora < 12) {
    mensaje = "¡Buenos días!";
  } else if (hora >= 12 && hora < 20) {
    mensaje = "¡Buenas tardes!";
  } else {
    mensaje = "¡Buenas noches!";
  }

  etiqueta.textContent = mensaje;
})();