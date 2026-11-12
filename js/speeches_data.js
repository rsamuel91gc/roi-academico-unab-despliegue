/**
 * speeches_data.js - Catálogo Integral de Discursos y Comunicaciones Multicanal
 * Plataforma: roi-academico-unab-despliegue (Universidad Dr. Andrés Bello)
 * Estándar: Cero Placeholders, Imparcialidad Metodológica (Anti-Sesgo), Tono Colegial Respetuoso
 * Proyecto de Investigación Académica sobre Utilidad Curricular e Inserción Laboral
 * Autor: Roberto Samuel García Cerna • Universidad Dr. Andrés Bello
 * 
 * Variables interpolables soportadas:
 * {nombre}   -> Nombre del emisor o docente
 * {facultad} -> Nombre de la Facultad seleccionada
 * {sede}     -> Sede universitaria (San Salvador, Sonsonate, etc.)
 * {link}     -> URL canónica según el modo activo (TinyURL o UTM)
 * {tiempo}   -> Estimación de tiempo de respuesta (3 a 5 minutos)
 */

window.UNAB_SPEECHES = [
  // =========================================================================
  // 1. PERSPECTIVA: INSTITUCIONAL / ESTUDIO ACADÉMICO OFICIAL
  // =========================================================================
  {
    id: "unab-email-institucional",
    perspective: "institucional",
    perspectiveLabel: "🏛️ Institucional (UNAB)",
    channel: "email",
    channelLabel: "📧 Correo Institucional",
    title: "Comunicado Institucional sobre Pertinencia Curricular",
    context: "Envío formal a la comunidad estudiantil de la facultad para convocar al diagnóstico curricular.",
    readingTime: "1m 15s",
    words: 175,
    subject: "Evaluación de Pertinencia Curricular y Trayectoria Laboral UNAB",
    body: `Estimada comunidad estudiantil de la {facultad} (Sede {sede}):

En el marco del compromiso constante con la calidad educativa de la Universidad Dr. Andrés Bello, se pone a su disposición el Instrumento de Diagnóstico sobre Utilidad Curricular e Inserción Laboral.

El objetivo de este estudio es recopilar información objetiva y representativa sobre la pertinencia de las competencias y contenidos impartidos, así como su vinculación con las demandas profesionales en El Salvador. Tanto sus valoraciones positivas como sus sugerencias constructivas de fortalecimiento son indispensables para obtener un diagnóstico fidedigno.

🔒 Garantía de Confidencialidad y Anonimato:
- Su participación es 100% anónima.
- La información se procesa mediante análisis psicométrico agregado.
- Al completar el cuestionario, el sistema generará una constancia digital con comprobante criptográfico SHA-256.

Tiempo estimado de respuesta: {tiempo}.

Les invitamos a participar de manera reflexiva ingresando en:
👉 {link}

Atentamente,
Equipo de Investigación Académica • Universidad Dr. Andrés Bello`
  },
  {
    id: "unab-whatsapp-oficial",
    perspective: "institucional",
    perspectiveLabel: "🏛️ Institucional (UNAB)",
    channel: "whatsapp",
    channelLabel: "💬 WhatsApp / Telegram",
    title: "Aviso Institucional para Canales y Grupos de Mensajería",
    context: "Para difusión informativa en canales universitarios, grupos de materia y listas de anuncios.",
    readingTime: "40s",
    words: 105,
    subject: "Aviso Informativo UNAB - Diagnóstico Curricular",
    body: `🏛️ *UNIVERSIDAD DR. ANDRÉS BELLO • INVESTIGACIÓN ACADÉMICA*

Estimado(a) estudiante de {facultad} - Sede {sede}:

Les extendemos una cordial invitación a participar en el *Diagnóstico de Percepción de Utilidad Curricular e Inserción Laboral*. 

Su valoración sincera y reflexiva sobre las asignaturas de la carrera aportará datos objetivos para evaluar la pertinencia formativa.

⏱️ *Duración:* {tiempo} (6 secciones estructuradas).
🔒 *Privacidad:* 100% Anónimo y Confidencial.
📜 *Constancia:* Genera comprobante digital con código de verificación al finalizar.

Pueden acceder al cuestionario directamente desde su dispositivo móvil:
👉 {link}

Agradecemos su valiosa colaboración en este estudio académico. 🦅`
  },
  {
    id: "unab-lms-banner",
    perspective: "institucional",
    perspectiveLabel: "🏛️ Institucional (UNAB)",
    channel: "lms",
    channelLabel: "🖥️ Aula Virtual / LMS",
    title: "Anuncio Académico para Campus Virtual (Canvas / Moodle)",
    context: "Para fijar como aviso en el tablón principal o cartelera informativa del aula virtual.",
    readingTime: "35s",
    words: 90,
    subject: "Aviso Académico en Campus Virtual",
    body: `📢 **PARTICIPACIÓN ESTUDIANTIL • ESTUDIO DE PERTINENCIA CURRICULAR**

Estimados estudiantes de la {facultad}:

Les invitamos a formar parte del estudio sobre *Percepción de Utilidad Curricular y Retorno Formativo*. 

Sus respuestas imparciales sobre los contenidos temáticos y las competencias laborales son esenciales para fundamentar análisis académicos rigurosos.

- **Tiempo estimado:** {tiempo}
- **Anonimato total:** No se solicita inicio de sesión ni datos personales identificables.

[➡️ ACCEDER AL FORMULARIO OFICIAL]({link})`
  },
  {
    id: "unab-social-linkedin",
    perspective: "institucional",
    perspectiveLabel: "🏛️ Institucional (UNAB)",
    channel: "social",
    channelLabel: "📱 Redes Sociales",
    title: "Publicación Institucional para Redes Profesionales",
    context: "Orientado a proyectar rigor investigativo, transparencia y participación comunitaria.",
    readingTime: "50s",
    words: 130,
    subject: "Difusión Institucional en Redes",
    body: `En la Universidad Dr. Andrés Bello la retroalimentación estudiantil es un pilar indispensable para la pertinencia académica. 💼📊

Invitamos a los estudiantes activos de la {facultad} (Sede {sede}) a participar en la investigación académica sobre *Percepción de Utilidad Curricular y Expectativas de Inserción Laboral*.

El estudio recopila valoraciones imparciales para evaluar la relación entre la formación universitaria y el entorno profesional.

✅ 100% anónimo, confidencial y para fines estrictamente académicos.
✅ Duración estimada: {tiempo}.
✅ Constancia digital de participación con validación SHA-256.

Participa desde cualquier dispositivo:
👉 {link}

#OrgulloUNAB #EducacionSuperior #InvestigacionAcademica #ElSalvador`
  },
  {
    id: "unab-print-mural",
    perspective: "institucional",
    perspectiveLabel: "🏛️ Institucional (UNAB)",
    channel: "print",
    channelLabel: "📄 Afiches y Material Físico",
    title: "Texto Informativo para Afiches de Campus y Murales",
    context: "Texto de apoyo para carteles con código QR en pasillos, biblioteca y áreas comunes del campus.",
    readingTime: "30s",
    words: 70,
    subject: "Información de Afiche con Código QR",
    body: `🏛️ UNIVERSIDAD DR. ANDRÉS BELLO
DIAGNÓSTICO ACADÉMICO: PERCEPCIÓN DE UTILIDAD CURRICULAR

Tu perspectiva sobre los contenidos y competencias de tu carrera aporta datos objetivos para la investigación académica.

⏱️ Duración: {tiempo}.
🔒 Participación 100% anónima y confidencial.
📱 Escanea el código QR con tu celular o ingresa en:
👉 {link}

Proyecto de Investigación Académica UNAB`
  },

  // =========================================================================
  // 2. PERSPECTIVA: DOCENTE A ESTUDIANTE (CÁTEDRA -> GRUPO)
  // =========================================================================
  {
    id: "docente-speech-aula",
    perspective: "docente",
    perspectiveLabel: "👨‍🏫 Docente a Estudiante",
    channel: "speech",
    channelLabel: "🗣️ Speech Oral en Aula (60-90s)",
    title: "Guion Oral en Vivo: Pausa Activa en Clase",
    context: "Para ser leído o parafraseado por el docente al inicio o cierre de la clase, proyectando el QR en pantalla para que el grupo responda de forma reflexiva.",
    readingTime: "1m 10s",
    words: 155,
    subject: "Guion Verbal para Salón de Clases Presencial / Virtual",
    body: `(El docente proyecta en pantalla la diapositiva con el QR y se dirige al grupo):

"Buenos días / tardes, jóvenes de la {facultad}. Les solicito unos breves minutos de su atención antes de iniciar formalmente nuestra sesión.

En nuestra universidad se está desarrollando una investigación académica para conocer de primera mano cómo perciben ustedes la utilidad de las asignaturas que cursan y cuáles son sus expectativas laborales al egresar.

El valor de este estudio radica en contar con respuestas completamente sinceras y objetivas. Tanto si consideran que los contenidos responden con solidez a sus metas, como si identifican áreas que ameritan mayor profundización práctica, su criterio es fundamental.

La encuesta es 100% anónima, no solicita nombre ni carné, y toma de 3 a 5 minutos.

He colocado en pantalla el código QR y también les compartí el enlace al chat. Vamos a tomarnos esta breve pausa para completarla en silencio. Al finalizar podrán descargar su constancia digital.

Enlace directo: {link}. Iniciemos ahora."`
  },
  {
    id: "docente-whatsapp-grupo",
    perspective: "docente",
    perspectiveLabel: "👨‍🏫 Docente a Estudiante",
    channel: "whatsapp",
    channelLabel: "💬 WhatsApp / Telegram",
    title: "Mensaje del Docente al Grupo de la Asignatura",
    context: "Para compartir directamente en el grupo de clase de la materia, motivando la participación reflexiva.",
    readingTime: "45s",
    words: 120,
    subject: "Mensaje del Catedrático a sus Estudiantes",
    body: `Estimados estudiantes de nuestra cátedra en {facultad}:

Les saluda {nombre}. Espero que se encuentren muy bien.

Les escribo para invitarles a colaborar en un estudio de investigación académica que se está realizando en la UNAB sobre la utilidad curricular de nuestras asignaturas y su relación con el campo laboral.

Como su docente, les pido que respondan con total honestidad y objetividad, reflejando su perspectiva sincera sobre su experiencia de aprendizaje.

✅ 100% anónimo y confidencial.
⏱️ Toma entre {tiempo}.
📱 Enlace directo para completar desde el teléfono:
👉 {link}

Agradeceré me confirmen con un pulgar arriba (👍) cuando lo hayan completado. Su aporte enriquece este estudio académico.`
  },
  {
    id: "docente-email-alumnos",
    perspective: "docente",
    perspectiveLabel: "👨‍🏫 Docente a Estudiante",
    channel: "email",
    channelLabel: "📧 Correo Institucional",
    title: "Correo del Docente con Enfoque Formativo y Rigor",
    context: "Para enviar a través de la lista de correo de la asignatura o mensajería de plataforma virtual.",
    readingTime: "1m 00s",
    words: 145,
    subject: "Invitación a participar: Diagnóstico Académico sobre Utilidad Curricular",
    body: `Apreciables estudiantes:

Les saluda su docente {nombre}. A lo largo de este ciclo en la {facultad} (Sede {sede}), hemos reflexionado sobre la importancia de consolidar competencias aplicables a la realidad profesional.

En este momento se encuentra abierta la recopilación de datos para una investigación sobre la percepción estudiantil de los planes de estudio y las aspiraciones de inserción laboral.

Les solicito dedicar {tiempo} a contestar este cuestionario con criterio analítico y madurez:
👉 {link}

Sus respuestas están totalmente protegidas bajo anonimato psicométrico, por lo que pueden responder con entera libertad y objetividad.

Agradezco de antemano su colaboración responsable.

Atentamente,
{nombre}
Docente UNAB • Sede {sede}`
  },
  {
    id: "docente-classroom-post",
    perspective: "docente",
    perspectiveLabel: "👨‍🏫 Docente a Estudiante",
    channel: "lms",
    channelLabel: "🖥️ Aula Virtual / LMS",
    title: "Publicación en el Tablón de Google Classroom / Moodle",
    context: "Para publicar como aviso en el tablón principal de la clase virtual.",
    readingTime: "30s",
    words: 80,
    subject: "Aviso de Investigación en Tablón de Clase",
    body: `📌 **Estudio Académico sobre Pertinencia Curricular e Inserción Laboral**

Estimado grupo: les comparto el enlace al diagnóstico psicométrico que se lleva a cabo en la UNAB.

Su valoración objetiva nos permitirá contar con datos representativos de nuestra facultad. La encuesta es completamente anónima y toma {tiempo}.

Enlace de acceso:
🔗 {link}

Agradezco su participación activa.`
  },

  // =========================================================================
  // 3. PERSPECTIVA: ESTUDIANTE A ESTUDIANTE (PEER-TO-PEER / COLEGIAL)
  // =========================================================================
  {
    id: "peer-whatsapp-amigos",
    perspective: "estudiante",
    perspectiveLabel: "🎓 Estudiante a Estudiante",
    channel: "whatsapp",
    channelLabel: "💬 WhatsApp / Telegram",
    title: "Mensaje Colegial para Grupos de Compañeros de Carrera",
    context: "Para ser compartido por representantes de clase o compañeros en grupos de estudio con tono respetuoso y cercano.",
    readingTime: "35s",
    words: 100,
    subject: "Mensaje Estudiantil Colegial y Respetuoso",
    body: `Estimados compañeros de {facultad} 👋

Les comparto la encuesta del estudio de investigación académica sobre Utilidad Curricular y Retorno Formativo en la UNAB.

El objetivo de esta investigación es recopilar nuestra perspectiva genuina sobre las asignaturas y cómo se alinean con las competencias profesionales. Tanto los aspectos que consideren plenamente satisfactorios como aquellos que identifiquen como oportunidades de fortalecimiento son indispensables para reflejar la realidad estudiantil.

🔒 Es 100% anónima (no pide carné ni correo).
⏱️ Toma entre {tiempo}.

Les invito a completarla desde su teléfono en este enlace:
👉 {link}

¡Gracias por su colaboración!`
  },
  {
    id: "peer-speech-delegado",
    perspective: "estudiante",
    perspectiveLabel: "🎓 Estudiante a Estudiante",
    channel: "speech",
    channelLabel: "🗣️ Speech Oral en Aula (60-90s)",
    title: "Intervención de Representante Estudiantil en Cambio de Hora",
    context: "Para que un estudiante líder o representante hable de manera respetuosa frente a sus compañeros entre clases.",
    readingTime: "50s",
    words: 115,
    subject: "Guion de Representante Estudiantil Colegial",
    body: `"Buenas tardes / días, compañeros. Les solicito dos minutos de su atención antes de iniciar la siguiente clase.

En este ciclo se está desarrollando un estudio de investigación académica sobre la pertinencia de las asignaturas de nuestra facultad frente a las exigencias profesionales. La encuesta busca conocer la valoración genuina y reflexiva de todos nosotros, sin sesgos, para obtener datos representativos de nuestra experiencia formativa.

Es 100% anónima, no solicita datos personales y toma de 3 a 5 minutos.

Les he compartido el enlace al grupo de WhatsApp de la clase: {link}. Su participación responsable es muy valiosa para que la perspectiva estudiantil quede debidamente registrada. ¡Muchas gracias por su tiempo!"`
  },
  {
    id: "peer-social-story",
    perspective: "estudiante",
    perspectiveLabel: "🎓 Estudiante a Estudiante",
    channel: "social",
    channelLabel: "📱 Redes Sociales",
    title: "Copy para Redes Sociales y Estados con Enlace Directo",
    context: "Para compartir en historias de Instagram, WhatsApp o redes sociales con enlace directo sin etiquetas técnicas confusas.",
    readingTime: "25s",
    words: 60,
    subject: "Publicación para Redes Sociales Estudiantiles",
    body: `Comunidad estudiantil de {facultad} 🦅

Participa en el diagnóstico académico sobre Utilidad Curricular y Expectativas de Inserción Laboral en la UNAB. Tu valoración objetiva y reflexiva es fundamental para esta investigación.

🔒 100% anónimo
⏱️ Solo toma de {tiempo}

Enlace directo para participar:
👉 {link}

#UNAB #ComunidadEstudiantil #InvestigacionAcademica`
  },
  {
    id: "peer-dm-individual",
    perspective: "estudiante",
    perspectiveLabel: "🎓 Estudiante a Estudiante",
    channel: "whatsapp",
    channelLabel: "💬 WhatsApp / Telegram",
    title: "Mensaje Directo Individual entre Compañeros",
    context: "Para compartir por privado a compañeros de clase que aún no han participado.",
    readingTime: "20s",
    words: 50,
    subject: "Mensaje Directo Colegial",
    body: `¡Hola! 👋 Te comparto el enlace a la encuesta de investigación de nuestra facultad sobre la pertinencia de los contenidos académicos.

Es 100% anónima y se responde en {tiempo} desde el teléfono. Tu evaluación sincera y objetiva ayuda a que la muestra sea representativa:
👉 {link}

¡Te agradecería mucho tu participación!`
  },

  // =========================================================================
  // 4. PERSPECTIVA: EGRESADO / GRADUADO A ESTUDIANTE
  // =========================================================================
  {
    id: "egresado-linkedin-post",
    perspective: "egresado",
    perspectiveLabel: "💼 Egresado / Graduado",
    channel: "social",
    channelLabel: "📱 Redes Sociales",
    title: "Publicación de Egresado en Redes Profesionales",
    context: "Para graduados que desean aportar una mirada reflexiva sobre la pertinencia académica y el ejercicio laboral.",
    readingTime: "1m 00s",
    words: 140,
    subject: "Reflexión de Graduado UNAB sobre Pertinencia Curricular",
    body: `Como graduado de la Universidad Dr. Andrés Bello, reconozco la importancia de que la formación superior mantenga un diálogo constante con las realidades del entorno laboral.

La retroalimentación objetiva y fundamentada de los estudiantes activos sobre sus asignaturas es una herramienta clave para comprender la relación entre teoría y práctica profesional.

Invito a los estudiantes de la {facultad} a participar en este Diagnóstico de Utilidad Curricular:
👉 {link}

La encuesta es 100% anónima y toma {tiempo}. Su aporte analítico es un insumo muy valioso para la investigación académica.

#GraduadosUNAB #EducacionSuperior #ComunidadAcademica #ElSalvador`
  },
  {
    id: "egresado-whatsapp-red",
    perspective: "egresado",
    perspectiveLabel: "💼 Egresado / Graduado",
    channel: "whatsapp",
    channelLabel: "💬 WhatsApp / Telegram",
    title: "Mensaje de Graduado para Grupos de Tutoría o Redes Mixtas",
    context: "Para compartir en grupos académicos donde conviven graduados y estudiantes.",
    readingTime: "40s",
    words: 95,
    subject: "Mensaje de Graduado a Estudiantes Activos",
    body: `Estimados compañeros del grupo: les saluda un egresado de la {facultad}.

Desde la experiencia en el ejercicio profesional, considero que la evaluación reflexiva de las asignaturas durante la etapa formativa aporta datos indispensables sobre la pertinencia laboral de la carrera.

Actualmente se encuentra disponible la encuesta de investigación sobre retorno académico:
👉 {link}

Es 100% anónima y toma únicamente {tiempo}. Les motivo a participar con criterio objetivo. ¡Muchos éxitos en su ciclo académico!`
  },

  // =========================================================================
  // 5. PERSPECTIVA: EQUIPO DE INVESTIGACIÓN CIENTÍFICA
  // =========================================================================
  {
    id: "comite-email-cientifico",
    perspective: "investigacion",
    perspectiveLabel: "🔬 Equipo de Investigación",
    channel: "email",
    channelLabel: "📧 Correo Institucional",
    title: "Convocatoria Metodológica del Estudio Psicométrico",
    context: "Para docentes, tutores y estudiantes interesados en el rigor metodológico y psicométrico del estudio.",
    readingTime: "1m 15s",
    words: 165,
    subject: "Convocatoria Metodológica: Estudio Psicométrico de Inserción Laboral UNAB",
    body: `Estimada comunidad académica de la Universidad Dr. Andrés Bello:

El equipo de investigación a cargo del proyecto *Percepción de Utilidad Curricular y Retorno Formativo* extiende una cordial invitación a formar parte de la muestra institucional de este ciclo.

El estudio aplica técnicas psicométricas avanzadas de Análisis Factorial Confirmatorio (CFA), coeficientes de fiabilidad Omega de McDonald ($\omega$) y correlaciones de Pearson, con el propósito de examinar la relación entre la autoeficacia académica y las expectativas laborales.

Principios Metodológicos y de Privacidad:
1. Consentimiento Informado explícito (Bloque 0).
2. Anonimato absoluto (cero almacenamiento de identificadores personales o IP).
3. Generación de constancia criptográfica verificable mediante SHA-256.
4. Duración estimada: {tiempo}.

Agradecemos su colaboración objetiva ingresando en:
👉 {link}

Proyecto de Investigación Académica • Universidad Dr. Andrés Bello`
  },
  {
    id: "comite-whatsapp-datos",
    perspective: "investigacion",
    perspectiveLabel: "🔬 Equipo de Investigación",
    channel: "whatsapp",
    channelLabel: "💬 WhatsApp / Telegram",
    title: "Aviso de Muestreo y Participación Representativa",
    context: "Para recordar a los grupos la importancia de alcanzar la representatividad estadística por facultad.",
    readingTime: "35s",
    words: 85,
    subject: "Aviso de Muestreo Estadístico",
    body: `📊 *AVISO DE INVESTIGACIÓN ACADÉMICA UNAB*

Estudiantes de {facultad} (Sede {sede}):

Les recordamos la importancia de sumar su perspectiva a la muestra estadística de su carrera. Una participación representativa garantiza que los datos reflejen con fidelidad las experiencias de todas las áreas de estudio.

⏱️ Duración: {tiempo}.
🔒 100% anónimo y confidencial.
📜 Constancia digital al finalizar.

Enlace al cuestionario:
👉 {link}

¡Gracias por su colaboración científica!`
  },
  {
    id: "comite-print-flyer",
    perspective: "investigacion",
    perspectiveLabel: "🔬 Equipo de Investigación",
    channel: "print",
    channelLabel: "📄 Afiches y Material Físico",
    title: "Volante Informativo con Código QR para Aulas",
    context: "Para material impreso de mano distribuido en aulas o salas de estudio.",
    readingTime: "25s",
    words: 65,
    subject: "Volante Informativo con QR",
    body: `🔬 INVESTIGACIÓN ACADÉMICA UNAB
"Percepción de Utilidad Curricular y Retorno Formativo"

Colabora en el estudio sobre pertinencia de planes de estudio y competencias laborales.

• Participación 100% anónima y confidencial.
• Duración: {tiempo}.
• Constancia digital con sello SHA-256.

📱 Escanea el código QR con tu celular o ingresa en:
👉 {link}`
  },
  {
    id: "docente-print-catedra",
    perspective: "docente",
    perspectiveLabel: "👨‍🏫 Docente a Estudiante",
    channel: "print",
    channelLabel: "📄 Afiches y Material Físico",
    title: "Aviso de Cátedra para Laboratorios y Pasillos",
    context: "Para fijar en carteleras de laboratorios y pasillos de la facultad.",
    readingTime: "30s",
    words: 75,
    subject: "Aviso de Cátedra en Laboratorios",
    body: `👨‍🏫 ATENCIÓN ESTUDIANTES DE {facultad} (SEDE {sede})

Su valoración reflexiva sobre las asignaturas teóricas y prácticas de la carrera constituye un insumo fundamental para la investigación académica sobre utilidad curricular.

Les invitamos a participar de forma objetiva y anónima.

⏱️ Duración: {tiempo}.
📲 Escanea el código QR o ingresa en:
👉 {link}`
  },
  {
    id: "peer-lms-foro",
    perspective: "estudiante",
    perspectiveLabel: "🎓 Estudiante a Estudiante",
    channel: "lms",
    channelLabel: "🖥️ Aula Virtual / LMS",
    title: "Mensaje Colegial para Foros de Aula Virtual / Moodle",
    context: "Para abrir un hilo de participación constructiva en los foros del campus virtual.",
    readingTime: "40s",
    words: 95,
    subject: "Foro Estudiantil sobre Utilidad Curricular",
    body: `Estimados compañeros de {facultad}:

Les comparto este mensaje para motivarles a participar en el diagnóstico académico sobre Utilidad Curricular e Inserción Laboral.

Contar con las valoraciones de todos nosotros permite que la investigación refleje con rigor la experiencia estudiantil de nuestra facultad. La encuesta es completamente anónima y toma únicamente {tiempo}.

Pueden ingresar desde su dispositivo en el siguiente enlace:
🔗 {link}

¡Agradezco su colaboración responsable!`
  },
  {
    id: "egresado-speech-charla",
    perspective: "egresado",
    perspectiveLabel: "💼 Egresado / Graduado",
    channel: "speech",
    channelLabel: "🗣️ Speech Oral en Aula (60-90s)",
    title: "Intervención de Graduado Invitado en Ponencias y Clases",
    context: "Para profesionales egresados que visitan las aulas y desean motivar la participación reflexiva.",
    readingTime: "1m 10s",
    words: 130,
    subject: "Guion de Egresado Invitado",
    body: `"Buenas tardes a todos. Como profesional graduado de esta facultad en la UNAB, me complace compartir con ustedes este espacio.

En el mercado laboral actual, la correspondencia entre los contenidos académicos y las habilidades prácticas es un factor clave. Les motivo a participar en el diagnóstico académico sobre retorno curricular que se está llevando a cabo en nuestra universidad.

La encuesta es 100% anónima y toma entre {tiempo}. Su valoración objetiva y fundamentada aportará datos sumamente valiosos para este estudio.

He colocado el enlace en pantalla: {link}. Les invito a completarla con total franqueza. ¡Muchos éxitos en su carrera!"`
  },
  {
    id: "comite-social-x",
    perspective: "investigacion",
    perspectiveLabel: "🔬 Equipo de Investigación",
    channel: "social",
    channelLabel: "📱 Redes Sociales",
    title: "Síntesis para Redes Sociales Académicas",
    context: "Formato breve para difusión rápida enfocado en transparencia y objetividad.",
    readingTime: "30s",
    words: 65,
    subject: "Publicación para Redes Sociales",
    body: `Estudio de Investigación Académica UNAB 📊🇸🇻
"Percepción de Utilidad Curricular y Retorno Formativo" en la {facultad}.

Invitamos a la comunidad estudiantil a aportar su valoración reflexiva y objetiva.

✅ 100% anónimo
⏱️ Duración: {tiempo}
📜 Constancia digital verificable (SHA-256)

Participa aquí:
👉 {link}

#InvestigacionAcademica #UNAB #EducacionSuperior`
  }
];

// Opciones de configuración institucional para inyección dinámica
window.UNAB_CAMPUSES = [
  "San Salvador (Sede Central)",
  "Sonsonate",
  "Chalatenango",
  "San Miguel"
];

window.UNAB_FACULTADES = [
  "Facultad de Tecnología e Innovación",
  "Facultad de Ciencias Económicas",
  "Facultad de Ciencias de la Salud",
  "Facultad de Ciencias Sociales y Humanidades",
  "Facultad de Postgrados y Maestrías"
];
