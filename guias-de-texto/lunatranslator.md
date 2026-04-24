---
layout: default
title: Guía de LunaTranslator
---

# Guía: LunaTranslator.

## ¿Qué es?
Te presento un extractor de textos para novelas visuales. Básicamente, envía el texto de estas obras (no todas) al portapapeles, para poder leerlo sin inconvenientes. También puede traducirlo a idiomas variados, de ser necesario, y si querés prescindir del portapapeles, se configura para que envíe el texto a algún motor TTS que tengan instalado. Podés [descargar LunaTranslator desde acá](https://lunatranslator.org/Resource/DownloadLuna/x64_win10?doc=1).

## Información Preliminar Importante
Antes de comenzar, es crucial que entiendas lo siguiente:

### Portapapeles
Si bien enseñaré cómo usar esto con TTS, recomiendo altamente el uso del portapapeles.
Yo utilizo un complemento de NVDA para la lectura automática de este.
Podés [descargar AutoClip desde acá](https://nvda.es/files/get.php?file=autoclip).
Lo instalás, lo activás desde el menú de NVDA/herramientas (o NVDA + Control + Shift + K) y de esa manera, leerá el contenido del portapapeles cada vez que este cambie.

### Puntos a considerar
* Extraé LunaTranslator en una carpeta que esté excluida; caso contrario, será detectada por tu antivirus.
* Interfaz: vas a usar el navegador de objetos, y el mouse, para todo. No voy a mentir, hay que darse maña, pero se puede.
* Navegador de objetos: se utiliza con la tecla NVDA (generalmente insert) y los botones del teclado numérico, a la derecha. Si tenés teclado portátil, podés consultar las combinaciones para tu distribución en la ayuda de NVDA.
    * NVDA + 4, o 6: retrocede, o avanza, respectivamente.
    * NVDA + 2: Entra a listas de elementos, agrupaciones, listas de pestañas.
    * NVDA + 8: Sale de listas de elementos, agrupaciones, listas de pestañas.
    * NVDA + enter: clickea una opción, aunque yo prefiero el mouse por ser más segura. La combinación no garantiza nada en este tipo de programas.
* Hablando de mouse… al indicar que clickees algo, me refiero a que ubiques la opción con el navegador de objetos, presiones NVDA + click izquierdo para llevar el mouse hacia allí y, luego, click izquierdo para entrar.
* Idioma inicial: Al ejecutar LunaTranslator_admin por primera vez, elegí inglés. Los otros idiomas no son legibles.

## Configuración

### Idioma (Core Settings)
* En la ventana principal de LunaTranslator, localizá la opción "Open Settings", y clickeala.
* Si ves una ventana con enlaces y casillas relacionadas con la licencia, es porque estás en el apartado de créditos.
* Si, por casualidad, LunaTranslator se te abrió en español, recomiendo encarecidamente que busques, en ese mismo apartado, un cuadro combinado que diga “idioma de interfaz” (o algo similar) y lo cambies a inglés. La traducción a máquina es horrible. Si ya está en inglés, omití este paso.
* Utilizá el navegador de objetos para buscar, al inicio de la interfaz, una lista. Entrá, con NVDA+2, y seleccioná “Core Settings”. Luego, salí, con NVDA + 8.
* Buscá “Language settings”. Entrá, y cambiá el “target language” (es un cuadro combinado) a “Spanish”.
* Más adelante, buscá un elemento titulado “Refresh Delay (ms)”, y establecelo en 0.

### Enviando texto al portapapeles (no combinar con TTS)

#### Método A (entre paréntesis no funcional por ahora)
* Avanzá hasta el final de la interfaz, donde dirá “Hook Settings”.
* Entrá a la lista, buscá “Clipboard”, seleccionala, y salí.
* Retrocedé, y verás que algunas opciones son diferentes.
* Buscá una agrupación titulada “Output”, entrá, y marcá la casilla sin etiquetar, que se encuentra al lado de “Auto Output Text”. Luego, avanzá por la misma agrupación, y marcá "Original Text", si querés el texto original, o “translation”, si lo querés traducido. Tené en cuenta que solo debés marcar una de las casillas.

#### Método B (funcional)
* Abrí la carpeta de LunaTranslator.
* Buscá la carpeta UserConfig.
* Una vez allí, ubicá el archivo config.json, abrilo con el bloc de notas, y posicionate cerca de la línea 270.

Deberías encontrar algo como esto, y atento a la sintaxis, porque vas a tener que hacer cambios:

"clipboard": {
            "use": false,
            "origin": false,
            "trans": false
}

Modificá lo necesario para que quede similar a:

"clipboard": {
            "use": true,
            "origin": true,
            "trans": false
}

Modificá "origin": true si querés el texto en su idioma original, o cambiá "trans": true si querés el texto traducido. Es importante que, si trans es false, origin sea true, y viceversa. Si configuraras ambas, podría pasar que se lea 2 veces el portapapeles (original y traducido) pero no queremos eso.

### Si querés que algún TTS lea el texto (no combinar con portapapeles)
* Localizá, al inicio de la interfaz, una lista cuyo elemento seleccionado es “Core settings”. Seleccioná “text to speech”.
* Modificá lo que quieras en las agrupaciones “Engine” y “Voice”, yo no las he tocado.
* Localizá una agrupación llamada Behavior con 3 subagrupaciones omónimas.
    * En la primera, marcá Auto Read Aloud.
    * En la segunda, marcá Read Aloud Original Text, si querés el texto original, o Read Aloud Translation, si lo querés traducido. Tené en cuenta que solo debés marcar una de las casillas. En el cuadro combinado, luego de las casillas, seleccioná Google (sin API) que está casi al final de la lista.
    * En la tercera, no marqué nada, aunque podés experimentar.

### Configurando el servicio de traducción (saltar si usarás el texto original)
* Localizá, al inicio de la interfaz, una lista cuyo elemento seleccionado es “Core settings” (o Text to Speech si configuraste previamente el TTS). Seleccioná “Translation Settings”.
* Buscá el servicio “Google”, marcalo, y cerrá presionando Alt + F4, porque habrás terminado aquí.

## Selección del Juego
Nota: podés usar las flechas para seleccionar el proceso, pero enter no funcionará. Debés activarlo con el mouse.
* En la ventana principal de LunaTranslator, hacé click en “Select Game”.
* Ubicá el proceso del juego (asegurate de que esté abierto previamente), y hacé clic. Si querés constatar que lo seleccionaste bien, podés mirar los cuadros de edición, deberían contener información. Luego, hacé click en OK.

## Captura de Texto y Selección de Entradas
* Avanzá un poco en el juego, para que LunaTranslator pueda capturar texto.
* Volvé a la ventana de LunaTranslator. Si la ventana de selección de texto no se abrió automáticamente, localizá y hacé clic en “Select Text”.
* En el apartado de selección de texto, verás una tabla donde el desplazamiento con flechas es posible aunque, para clickear, tenés que usar el mouse de todas maneras. Cada fila contiene una entrada de texto.
* Si el diseño no se parece a una tabla, enfocá la lista (no un elemento, sino la lista con insert +8) y hacé click. Debería acomodarse.
* En la columna 3, hay texto. Buscá aquella fila que se lea mejor, puesto que de ahí saldrá el contenido del portapapeles.
* Cuando encuentres la que quieras usar, clickeá en show, que se encuentra en la columna 1. Aparecerá una casilla marcada, indicando que la entrada está seleccionada. Si hiciste todo bien, ya deberías tener texto en tu portapapeles. Cabe recalcar que, de ser necesario, podrías seleccionar más de una entrada a la vez.

## Después de Seleccionar las Entradas
Regresá al juego y continuá avanzando en la historia. Deberías ver texto en tu portapapeles a medida que avanzás. Tené en cuenta, no obstante, que la traducción solo funcionará si marcaste las respectivas casillas a la hora de elegir entre “Original Text” y “Translation”.

Si deseás cambiar la entrada de texto, primero debés desmarcar la actual. Hacé clic en “Show”, desmarcá la casilla, y luego seleccioná una nueva entrada, clickeando en “show” a la izquierda del texto.

Si el texto no se está traduciendo, volvé a la ventana principal de LunaTranslator, y clickeá “AutoTranslate”.

## Correcciones
¡Buena! Si llegaste hasta aquí, ya tenés lo más importante, pero no todo. En algunos casos, el texto podría extraerse mal, y es ahí donde entran las correcciones.

Podés acceder a estas opciones desde el menú de configuración. En la lista donde aparecen elementos como “Core Settings” y “Translation Settings”, buscá “Text Processing”, y hacé clic. Verás una serie de casillas con diferentes mejoras que podés probar. Recordá, eso sí, que el navegador de objetos es una herramienta fundamental; sin él, no sabrás qué hace cada casilla.

## Game Management (gestor de juegos)
El programa tiene su propio gestor de juegos. Podés añadirlos y configurarlos, para no renegar con cada ejecución. La primera vez que ejecutás un juego, se le crea un apartado en este gestor.

Para acceder, basta con ir a la ventana principal de LunaTranslator, y buscar el botón que dice “Game Management”.

El gestor tiene 3 diseños; el más accesible es el primero, así que buscá 3 casillas sin etiquetar, y marcá la primera. Así verás todo como una tabla. De nuevo, si no se parece a una tabla, clickeá el gestor (no un elemento) y se acomodará.

Verás los juegos que tengas. Posicioná el cursor en la fila del juego que desees iniciar, salí con insert+8, y buscá, con insert+6, el botón start game.

## Si tu novela no funciona (no garantizado)
Existe la posibilidad de que no aparezcan entradas en la novela que intentes correr. Si esto ocurre, hay algo que podés probar aunque, como dije, no te doy garantías:
* En la ventana donde normalmente salen las entradas, buscá un botón que diga “Game Settings”, y entrá. También podés hacerlo desde las opciones que da el Game Management.
* En la lista de pestañas donde la seleccionada es “start”, localizá la pestaña “Hook”. Seleccionala, y marcá la casilla “Additional Hooks”.
* Avanzá un poco más en la novela, y volvé a las entradas. Deberían aparecerte algunas para elegir.

## Agradecimientos
Antes que nada, gracias a:
* El tipo que creó LunaTranslator: lo hizo difícil, con una interfaz imposible de manejar con flechas, como si quisiera que los ciegos nos diéramos la cabeza contra la pared, pero bueno… lo hizo. Y eso ya es bastante.
* Mi hiperfoco, sin el que no habría llegado tan lejos: bah… realmente no sé si es un hiperfoco, pero es un estado de "trance" en el que entro cuando necesito resolver algo complicado. NO me detengo hasta lograrlo, o hasta que el fracaso sea inevitable, como Thanos.
* Y bueno, a [Gemini, la inteligencia artificial de Google](https://gemini.google.com), aunque no sea humano, por ayudarme a estructurar este quilombo.

## Conclusión
Para vos, que leíste todo esto y te querés suicidar lenta y dolorosamente porque te parece más soportable que usar este programa: los primeros pasos son de una sola vez, así que tranqui. Si te gustan las novelas visuales, creeme, valdrá la pena.

Igual, si hay algún drama… me preguntás, e intento ayudarte ni bien pueda. No pasa nada. Para eso tenés el [formulario de contacto](/contactame/).

Quizá, en un futuro (muy futuro), traiga una guía en audio para esta cosa. Soy consciente de que no es para cualquiera.

Por mi parte, esto es todo. ¡Nos vemos!