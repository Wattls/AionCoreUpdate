<div align="center">

[English](README.md) · [Português (Brasil)](README.pt-BR.md) · **Español**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="media/aioncore-logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="media/aioncore-logo-light.svg">
  <img alt="AionCore" src="media/aioncore-logo-light.svg" width="340">
</picture>

### Encuentra el Cubo Oculto, mira el DPS de tu grupo y no te pierdas ninguna llamada.<br>Una app gratis para Aion 2 en Windows.

[![Versión](https://img.shields.io/github/v/release/filvoch/AionCoreUpdate?label=versi%C3%B3n&color=1a9bbd)](https://github.com/filvoch/AionCoreUpdate/releases/latest)
![Windows 10 | 11](https://img.shields.io/badge/Windows-10%20%7C%2011-0078D6?logo=windows&logoColor=white)
![Gratis](https://img.shields.io/badge/precio-gratis-2ea44f)

<a href="https://github.com/filvoch/AionCoreUpdate/releases/latest/download/AionCore-Setup.exe"><img alt="Descargar AionCore para Windows (AionCore-Setup.exe)" src="https://img.shields.io/badge/Descargar_para_Windows-AionCore--Setup.exe-1a9bbd?style=for-the-badge&logo=windows&logoColor=white"></a>

<sub>Instalador de unos 160 MB · se actualiza solo · [Todas las versiones](https://github.com/filvoch/AionCoreUpdate/releases) · [Sitio web](https://aioncore.app/es/)</sub>

<img alt="Captura de pantalla del Radar de Cubos con norte fijo: tú en el centro con una flecha hacia donde miras, tres Cubos Ocultos alrededor, el más cercano destacado con una línea, y el texto &quot;Cube 38 m northeast&quot; y &quot;+2 more · ahead, to the right&quot; (app en inglés, datos simulados)" src="media/shot-radar.jpg" width="820">

</div>

> [!NOTE]
> El medidor necesita [Npcap](https://npcap.com), y Aion 2 debe estar en modo **Ventana** o **Ventana sin bordes**. Mira [Instala en 3 pasos](#instala-en-3-pasos).

## Radar de Cubos Ocultos

Una ventanita que se abre sola cuando el juego muestra un Cubo Oculto cerca de ti y desaparece cuando no hay ninguno.

- **Automático.** Ya viene activado, se abre cuando aparece un cubo aún cerrado y se oculta unos 3 segundos después de que desaparece el último. La ✕ oculta solo los cubos actuales; el siguiente vuelve a abrir el radar.
- **Norte fijo**, como el minimapa del juego, con una flecha hacia donde miras. ¿Prefieres que el mapa gire? Elige **Gira contigo**.
- **Varios cubos a la vez.** El cubo actual tiene el punto más grande y la línea; los demás quedan más pequeños y el texto muestra «+N más».
- **Mira el juego detrás.** La opacidad del radar va de 30 % a 100 %.
- **Avisos que te dicen adónde ir:** cuando estás a menos de 80, 50, 25 y 10 m, si el cubo está a tu derecha, delante o detrás de ti, y cuando otro jugador ya lo abrió.
- **Próximo punto.** Cuando se abre un cubo, el aviso indica el punto conocido más cercano, como «~240 m al noreste». El medidor trae 3.722 puntos donde ya han aparecido cubos (la dirección y la distancia aún se están comprobando en el juego).

Todo está en **Configuración › Avisos y eventos**. El radar muestra solo los cubos que envía el juego. El juego solo informa tu posición cuando usas una habilidad o un dash; sin una posición reciente, el radar muestra «Cubo detectado» y te pide que te muevas.

<p align="center"><img alt="Demostración animada del Radar de Cubos: un Cubo Oculto al noreste, delante de ti, se acerca mientras caminas hacia él, de 85 m a 18 m (datos simulados)" src="media/demo.gif" width="720"></p>

## Medidor de DPS del grupo

- **Todo el grupo de un vistazo:** una fila por jugador con daño, DPS y porcentaje. Pestañas **HPS** y **Recibido** para la curación y el daño recibido. Alcance **Yo**, **Grupo**, **Raid** o **Automático**.
- **Cada habilidad al detalle:** haz clic en un nombre y mira golpes, críticos, golpes por la espalda, multigolpes, media, mínimo y máximo, gráfico y registro.
- **Tiempos del jefe:** HP del jefe en números, **Derrota en** (estimación según lo rápido que baja el HP) y **Furia en** para jefes con tiempo de furia conocido.
- **Cada combate guardado en tu PC:** **Historial**, resumen de cada combate, **Comparar combates**, **Runs de jefes**, resumen de tu muerte y exportar a JSON, CSV o PNG.
- **Grupo flotante:** la vida de tu grupo en una ventana pequeña.
- **Cinco visuales:** Franjas, Clásico, Denso, Panel y Cristal.

<p align="center"><img alt="Captura de pantalla de AionCore Meter en el visual Franjas durante un combate contra un jefe: arriba el HP del jefe con Derrota en y Furia en, y debajo una fila por jugador, seis jugadores, con daño, DPS y porcentaje (app en inglés, datos simulados, nombres inventados)" src="media/shot-meter.jpg" width="400"></p>

## Avisos fuera del juego y Panel de sala

¿Hiciste alt-tab o minimizaste el juego? Las invitaciones de grupo y de Expedición, las llamadas para entrar y las solicitudes de entrada aparecen sobre cualquier ventana. Haz clic y AionCore trae el juego al frente. Nunca hace clic ni acepta nada por ti.

El **Panel de sala** muestra quién está en la sala, el GS y el poder de combate de cada uno y quién está listo.

<table>
  <tr>
    <td width="50%"><img alt="Captura de pantalla de tres avisos fuera del juego apilados: llamada para unirse, invitación de Expedición e invitación de grupo, cada uno con la clase, el nivel, el GS, el poder de combate y el servidor del jugador (app en inglés, datos simulados, nombres inventados)" src="media/shot-alerts.jpg"></td>
    <td width="50%"><img alt="Captura de pantalla del Panel de sala: cuatro miembros con GS, poder de combate, nivel y quién está listo, una plaza libre y dos solicitudes para unirse (app en inglés, datos simulados, nombres inventados)" src="media/shot-room.jpg"></td>
  </tr>
  <tr>
    <td align="center"><sub>Avisos fuera del juego</sub></td>
    <td align="center"><sub>Panel de sala</sub></td>
  </tr>
</table>

<sub>Los avisos fuera del juego y el Panel de sala son funciones para quien apoya. Mira [Gratis, con apoyo opcional](#gratis-con-apoyo-opcional).</sub>

## Mecánicas de jefe

- **Panel de mecánicas:** lo que hace el jefe y lo que debes hacer tú, por mazmorra. Gratis. La cobertura crece con cada versión, y las mecánicas aún no comprobadas en el juego vienen marcadas.
- **Avisos de mecánicas en pantalla:** el aviso antes del golpe. Primero para quien apoya, para todos a partir del **10 de noviembre de 2026**.

## Panel de información, Inicio y atajos

- **Panel de información:** horarios de los jefes de campo leídos del juego, eventos y un aviso unos minutos antes de que aparezcan tus jefes de campo favoritos.
- **Inicio:** una pantalla sobre el juego con YouTube y el medidor.
- **Atajos globales** (Ctrl+Alt) que funcionan sobre el juego. Cámbialos en **Inicio › Atajos**.

App y sitio web en 6 idiomas: EN, PT-BR, ES, DE, FR, RU (DE, FR y RU son traducción automática, aún en revisión).

## Instala en 3 pasos

Requisitos: Windows 10 (1809 o más nuevo) u 11, 64 bits.

1. [Descarga el instalador](https://github.com/filvoch/AionCoreUpdate/releases/latest/download/AionCore-Setup.exe) y ejecútalo. Si Windows muestra «Windows protegió su PC», mira [las preguntas frecuentes](#preguntas-frecuentes).
2. Instala [Npcap](https://npcap.com) una vez, marcando *Install Npcap in WinPcap API-compatible Mode* y *Support loopback traffic*. El medidor lo usa para leer el tráfico de red del juego.
3. Abre AionCore desde el acceso directo. En Aion 2, usa **Ventana** o **Ventana sin bordes**: los overlays no aparecen sobre la pantalla completa exclusiva.

AionCore se actualiza solo: consulta este repositorio, comprueba la firma digital del instalador y solo instala con Aion 2 cerrado. Tu configuración y tu historial de combates se conservan entre versiones.

## Gratis, con apoyo opcional

AionCore es gratis y sin anuncios. Si quieres ayudar, el apoyo cuesta **US$ 15 por 12 meses** en Ko-fi: un solo pago, sin renovación automática. A cambio recibes **1 año de la insignia de apoyo**, **las actualizaciones primero** y **algunas funciones exclusivas para quienes ayudan a mantener AionCore**. **Todo lo que ya salió gratis sigue gratis para siempre.**

Lo que tiene hoy quien apoya: avisos fuera del juego, Panel de sala, temas de color del medidor, acabado Cristal sobre los visuales Denso, Panel y Franjas, y acceso anticipado a los avisos de mecánicas de jefe (hasta el 10/11/2026) y a los avisos de la barra de guardia del jefe (hasta el 11/11/2026).

[Apoya a AionCore](https://aioncore.app/es/apoie/)

## Tus datos

Tus combates se quedan en tu PC. Enviar combates a [aioncore.app](https://aioncore.app/es/) (clasificación y páginas de combate) es opcional, necesita una cuenta y viene desactivado. Detalles en la [política de privacidad](https://aioncore.app/es/privacidade/).

## Preguntas frecuentes

<details>
<summary><b>¿Me pueden banear?</b></summary>

El medidor lee el tráfico de red de tu PC y el título de la ventana del juego. No cambia archivos ni la memoria del juego. Aun así, ninguna herramienta de este tipo puede garantizar lo que decida la política del juego: el riesgo de usarla es tuyo.
</details>

<details>
<summary><b>¿Qué servidores y regiones funcionan?</b></summary>

Hecho y probado en Aion 2 Global (servidores de Sudamérica). En otras regiones (Taiwán, Corea) puede funcionar, pero aún no está garantizado.
</details>

<details>
<summary><b>¿El medidor es preciso?</b></summary>

Cuenta lo que envía el juego. En algunos casos el medidor no ve todo, y avisa cuando no está leyendo el juego. El sitio explica cómo mide: [precisión](https://aioncore.app/es/precisao/).
</details>

<details>
<summary><b>¿Hay que ejecutarlo como administrador?</b></summary>

No. AionCore se instala solo para tu usuario y nunca pide permisos de administrador por su cuenta. Si tu Npcap se instaló con la opción *Restrict Npcap driver's access to Administrators only*, el medidor muestra el botón **Reabrir como administrador** (vale solo esa vez). Para no necesitarlo nunca, reinstala Npcap sin marcar esa opción.
</details>

<details>
<summary><b>El medidor desaparece cuando el juego está al frente.</b></summary>

El juego está en **Pantalla completa** exclusiva, y Windows no muestra ventanas encima. En las opciones de video de Aion 2, cambia a **Ventana sin bordes**.
</details>

<details>
<summary><b>Windows o el antivirus avisó al instalar.</b></summary>

El instalador no tiene un certificado de firma de código de pago, así que Windows no conoce al editor y muestra «Windows protegió su PC». Haz clic en **Más información** y luego en **Ejecutar de todas formas**. Un antivirus puede pedir confirmación por el mismo motivo. Para comprobar que el archivo es el original, compara el SHA-256 que está en `latest.json` (en los Assets de la versión) con el resultado de:

```powershell
Get-FileHash .\AionCore-Setup.exe
```
</details>

<details>
<summary><b>¿Qué sale de mi PC?</b></summary>

Los combates solo salen de tu PC si activas el envío (opcional, desactivado por defecto). El medidor descarga los íconos de las habilidades desde la CDN del juego y consulta este repositorio para saber si hay versión nueva. La actualización automática nunca instala con Aion 2 abierto.
</details>

<details>
<summary><b>¿Cómo lo desinstalo? ¿Pierdo mis datos?</b></summary>

*Configuración de Windows › Aplicaciones instaladas › AionCore*. El desinstalador pregunta si también borra tus datos (historial, configuración); por defecto los conserva. Instalar una versión nueva encima también conserva todo.
</details>

<details>
<summary><b>¿Es oficial? ¿El código es abierto?</b></summary>

No y no. AionCore es un proyecto independiente, hecho por un jugador, sin afiliación ni respaldo de NCSOFT. El código fuente no es público: este repositorio guarda solo los instaladores publicados y esta página.
</details>

## Errores y contacto

Abre un [issue](https://github.com/filvoch/AionCoreUpdate/issues) o escribe a contato@aioncore.app. En la app: **Configuración › Ayuda y comunidad**.

## Créditos

AionCore por **Guilherme Filvoch (Simavi)**.
Proyecto independiente de fans, sin vínculo con NCSOFT. Aion 2 y sus íconos, nombres y artes pertenecen a NCSOFT y a sus licenciantes.
