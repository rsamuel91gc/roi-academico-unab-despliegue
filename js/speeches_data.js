/**
 * speeches_data.js - Catálogo Integral de Discursos y Comunicaciones Multicanal
 * Plataforma: roi-academico-unab-despliegue (Universidad Dr. Andrés Bello)
 * Estándar: Cero Placeholders, 100% Textos Funcionales, Híbrido Reactivo
 * 
 * Variables interpolables soportadas:
 * {nombre}   -> Nombre del emisor o docente
 * {facultad} -> Nombre de la Facultad seleccionada
 * {sede}     -> Sede universitaria (San Salvador, Sonsonate, etc.)
 * {link}     -> URL canónica según el modo activo (TinyURL o UTM)
 * {tiempo}   -> Estimación de tiempo de respuesta (2m 15s)
 */

window.UNAB_SPEECHES = [
  // =========================================================================
  // 1. PERSPECTIVA: INSTITUCIONAL (UNAB OFICIAL -> ESTUDIANTE)
  // =========================================================================
  {
    id: "unab-email-rectoria",
    perspective: "institucional",
    perspectiveLabel: "🏛️ Institucional (UNAB)",
    channel: "email",
    channelLabel: "📧 Correo Institucional",
    title: "Comunicado Oficial de Rectoría y Vicerrectoría Académica",
    context: "Envío masivo oficial a toda la base de datos de correos estudiantiles activos (@unab.edu.sv).",
    readingTime: "1m 15s",
    words: 185,
    subject: "Tu opinión define el futuro de tu carrera: Diagnóstico Oficial de Retorno Curricular UNAB 2026",
    body: `Estimada comunidad estudiantil de la {facultad} (Sede {sede}):

En la Universidad Dr. Andrés Bello asumimos el compromiso ineludible de garantizar que cada ciclo, materia y competencia académica que cursas represente un verdadero retorno de inversión para tu inserción laboral y superación profesional.

Por ello, la Dirección de Investigación y Vicerrectoría Académica ponen a tu disposición el Instrumento Oficial de Diagnóstico Psicométrico sobre Utilidad Curricular. 

Tus respuestas permitirán identificar con exactitud estadística qué áreas de tu plan de estudios requieren actualización, fortalecimiento práctico o vinculación tecnológica inmediata con los sectores productivos de El Salvador.

🔒 Garantía de Confidencialidad y Ética:
- Tu participación es 100% anónima.
- Los datos se procesan mediante análisis estadístico agregado.
- Al finalizar, recibirás una constancia digital institucional con comprobante criptográfico SHA-256.

Tiempo estimado: únicamente {tiempo}.

Ingresa y participa activamente aquí:
👉 {link}

"Tu voz fundamentada construye la excelencia académica de la UNAB."

Atentamente,
Comité de Calidad y Vicerrectoría de Investigación UNAB`
  },
  {
    id: "unab-whatsapp-oficial",
    perspective: "institucional",
    perspectiveLabel: "🏛️ Institucional (UNAB)",
    channel: "whatsapp",
    channelLabel: "💬 WhatsApp / Telegram",
    title: "Aviso Oficial de Difusión por Canales de Mensajería",
    context: "Para difusión en listas de difusión institucional, canales oficiales de Telegram o WhatsApp Channels de la UNAB.",
    readingTime: "40s",
    words: 110,
    subject: "Aviso Oficial UNAB - Encuesta Curricular",
    body: `🏛️ *UNIVERSIDAD DR. ANDRÉS BELLO • VICERRECTORÍA ACADÉMICA*

Estimado(a) estudiante de {facultad} - Sede {sede}:

¿Qué tan útiles consideras las materias que estás cursando para conseguir el trabajo que deseas? 🎯

Tu opinión es vital para los procesos de acreditación y renovación de los planes de estudio. Te invitamos a completar el *Diagnóstico Oficial de Utilidad Curricular e Inserción Laboral*.

⏱️ *Duración:* Solo {tiempo} (6 secciones breves).
🔒 *Privacidad:* 100% Anónimo y Confidencial.
📜 *Constancia:* Genera comprobante digital de participación con hash de seguridad al completar.

Haz valer tu experiencia universitaria aquí:
👉 {link}

¡Gracias por ser protagonista del cambio en la UNAB! 🦅`
  },
  {
    id: "unab-lms-banner",
    perspective: "institucional",
    perspectiveLabel: "🏛️ Institucional (UNAB)",
    channel: "lms",
    channelLabel: "🖥️ Aula Virtual / LMS",
    title: "Anuncio Destacado en Campus Virtual (Canvas / Moodle)",
    context: "Para fijar en la cabecera principal del aula virtual de todos los estudiantes al iniciar sesión.",
    readingTime: "35s",
    words: 95,
    subject: "Aviso Global en Campus Virtual",
    body: `📢 **PARTICIPACIÓN ESTUDIANTIL REQUERIDA • DIAGNÓSTICO INSTITUCIONAL 2026**

Estimado estudiante de la {facultad}:

La Dirección de Investigación de la UNAB te invita a participar en la evaluación de pertinencia curricular y retorno de inversión académica. 

Tus valoraciones objetivas sobre las asignaturas y habilidades profesionales son indispensables para adecuar los programas de estudio a la realidad del mercado laboral salvadoreño.

- **Tiempo estimado:** {tiempo}
- **Anonimato garantizado:** No se solicitan contraseñas ni datos sensibles.

[➡️ HAZ CLIC AQUÍ PARA COMPLETAR LA EVALUACIÓN]({link})`
  },
  {
    id: "unab-social-linkedin",
    perspective: "institucional",
    perspectiveLabel: "🏛️ Institucional (UNAB)",
    channel: "social",
    channelLabel: "📱 Redes Sociales",
    title: "Publicación Institucional para LinkedIn y Facebook",
    context: "Orientado a proyectar rigor institucional, empleabilidad y compromiso con la mejora continua.",
    readingTime: "50s",
    words: 135,
    subject: "Post de Redes Institucionales",
    body: `En la Universidad Dr. Andrés Bello creemos en una educación superior conectada con las exigencias reales del mercado laboral. 💼📊

Iniciamos la jornada institucional de diagnóstico sobre *Percepción de Utilidad Curricular y Expectativas de Inserción Laboral*, una investigación psicométrica que permitirá evaluar el retorno académico de nuestra oferta curricular en todas las sedes y facultades.

Si eres estudiante activo de la {facultad} en Sede {sede}, tu perspectiva es el insumo fundamental para las actualizaciones curriculares del próximo quinquenio.

✅ 100% anónimo y respaldado por el Comité de Ética en Investigación.
✅ Solo toma {tiempo}.
✅ Incluye constancia digital con validación criptográfica SHA-256.

Participa hoy mismo desde tu dispositivo móvil:
👉 {link}

#OrgulloUNAB #EducacionSuperior #CalidadAcademica #InvestigacionUNAB #ElSalvador`
  },
  {
    id: "unab-print-mural",
    perspective: "institucional",
    perspectiveLabel: "🏛️ Institucional (UNAB)",
    channel: "print",
    channelLabel: "📄 Afiches y Material Físico",
    title: "Texto para Afiches de Pasillo, Murales y Cafeterías",
    context: "Diseñado para carteles tamaño póster/carta ubicados junto a los códigos QR impresos en puntos de alto tráfico del campus.",
    readingTime: "30s",
    words: 75,
    subject: "Copia para Afiche de Pared con Código QR",
    body: `🏛️ UNIVERSIDAD DR. ANDRÉS BELLO
¿LO QUE ESTÁS APRENDIENDO TE PREPARA PARA EL EMPLEO QUE QUIERES?

Tu voz tiene poder de decisión. Participa en el Estudio Oficial de Pertinencia Curricular.

⏱️ Te toma menos de {tiempo}.
🔒 Tu respuesta es 100% ANÓNIMA.
📱 Escanea el código QR central con la cámara de tu celular.

O ingresa directamente desde tu navegador:
👉 {link}

Comité de Investigación y Vicerrectoría Académica UNAB`
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
    title: "Guion Oral en Vivo: Pausa Activa de 3 Minutos en Clase",
    context: "Para ser leído o parafraseado por el docente al inicio o cierre de la clase, proyectando el QR en pantalla y dando 3 minutos en silencio para que todos respondan.",
    readingTime: "1m 10s",
    words: 160,
    subject: "Guion Verbal para Salón de Clases Presencial / Virtual",
    body: `(El docente proyecta en pantalla la diapositiva con el QR y se dirige al grupo):

"Buenos días / tardes, jóvenes de la {facultad}. Les pido dos minutos de su atención antes de iniciar formalmente la clase de hoy.

Como docentes, nos interesa profundamente que cada hora que pasan en esta aula y cada materia de la carrera realmente les abra puertas cuando salgan a buscar empleo o emprender. La universidad está realizando un estudio de investigación formal para evaluar exactamente eso: qué tan útiles perciben los contenidos de su carrera y cuáles son sus expectativas reales de trabajo.

La encuesta es totalmente anónima, no les pide su nombre ni su carné, y está avalada por el Comité de Ética. 

He puesto en la pantalla el código QR y también les envié el enlace al grupo de WhatsApp. Vamos a tomarnos exactamente 3 minutos en este momento para que todos saquemos el teléfono y la completemos juntos. Quien termine verá en su pantalla su constancia digital.

Por favor, ingresen en: {link} o escaneen el QR en pantalla. Empecemos ahora."`
  },
  {
    id: "docente-whatsapp-grupo",
    perspective: "docente",
    perspectiveLabel: "👨‍🏫 Docente a Estudiante",
    channel: "whatsapp",
    channelLabel: "💬 WhatsApp / Telegram",
    title: "Mensaje del Catedrático al Grupo de WhatsApp de la Materia",
    context: "Para enviar directamente en el grupo de clase de la materia, generando cercanía y sentido de responsabilidad compartida.",
    readingTime: "45s",
    words: 125,
    subject: "Mensaje de WhatsApp del Catedrático a sus Alumnos",
    body: `Estimados estudiantes de nuestra cátedra en {facultad}:

Les saluda {nombre}. Espero que estén teniendo una excelente semana.

Les escribo para pedirles un apoyo muy especial pero sobre todo muy valioso para ustedes mismos. La UNAB está levantando un diagnóstico para saber si las materias que estamos impartiendo responden a lo que el sector laboral está exigiendo actualmente.

Como su docente, me interesa que sean sumamente honestos: señalen lo que está funcionando y también lo que necesita ser más práctico y actualizado.

✅ La encuesta es 100% anónima.
⏱️ Toma solo {tiempo}.
📱 Pueden llenarla directamente desde su teléfono aquí:
👉 {link}

Les agradecería me confirmen con un pulgar arriba (👍) en cuanto la hayan completado. ¡Su retroalimentación nos ayuda a ser mejores docentes y a tener una mejor universidad!`
  },
  {
    id: "docente-email-alumnos",
    perspective: "docente",
    perspectiveLabel: "👨‍🏫 Docente a Estudiante",
    channel: "email",
    channelLabel: "📧 Correo Institucional",
    title: "Correo del Docente con Enfoque en Mentoría y Calidad",
    context: "Para enviar a través de la lista de correo de la asignatura o mensaje interno de plataforma virtual.",
    readingTime: "1m 00s",
    words: 155,
    subject: "Aporte indispensable a nuestra carrera: Diagnóstico de inserción laboral UNAB",
    body: `Apreciables estudiantes:

Les saluda su docente {nombre}. A lo largo de este ciclo en la {facultad} (Sede {sede}), hemos reflexionado constantemente sobre la importancia de adquirir competencias prácticas aplicables al campo profesional.

En este momento, la universidad está recopilando la perspectiva de ustedes sobre la utilidad de los planes de estudio y sus metas laborales. Esta información es la herramienta más contundente que tenemos como cuerpo académico para solicitar mejoras en laboratorios, actualización de bibliografía y nuevos enfoques metodológicos.

Les solicito encarecidamente que dediquen {tiempo} a contestar este cuestionario oficial:
👉 {link}

Sus respuestas están totalmente blindadas bajo anonimato y rigor psicométrico, por lo que pueden responder con entera libertad y franqueza.

Agradezco de antemano su madurez y compromiso con nuestra facultad.

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
    context: "Para publicar como aviso prioritario en el tablón principal de la clase virtual.",
    readingTime: "30s",
    words: 85,
    subject: "Aviso en Tablón de Tareas",
    body: `📌 **Actividad de Retroalimentación Curricular (No evaluada, impacto institucional)**

Estimado grupo: les comparto el enlace a la encuesta de diagnóstico psicométrico de la UNAB sobre Utilidad Curricular e Inserción Laboral.

Les pido que la respondan hoy antes de las 11:59 p.m. Son solo 6 bloques rápidos ({tiempo}) y es completamente anónima. Al terminar se les generará una constancia con código de verificación.

Enlace de acceso:
🔗 {link}

¡Gracias por su colaboración activa!`
  },

  // =========================================================================
  // 3. PERSPECTIVA: ESTUDIANTE A ESTUDIANTE (PEER-TO-PEER / LÍDERES)
  // =========================================================================
  {
    id: "peer-whatsapp-amigos",
    perspective: "estudiante",
    perspectiveLabel: "🎓 Estudiante a Estudiante",
    channel: "whatsapp",
    channelLabel: "💬 WhatsApp / Telegram",
    title: "Mensaje Directo para Grupos de Compañeros de Carrera",
    context: "Para ser compartido por presidentes de clase, representantes estudiantiles o entre amigos de confianza sin tono acartonado.",
    readingTime: "35s",
    words: 105,
    subject: "Mensaje Estudiantil Relajado y Directo",
    body: `Oigan gente de {facultad} 👋

¿No les pasa que a veces sentimos que nos enseñan cosas que no tienen nada que ver con lo que piden en los trabajos de verdad? 🤦‍♂️😅

Bueno, justo ahorita la UNAB sacó una encuesta oficial que SÍ van a tomar en cuenta para actualizar los planes de estudio y ver qué tan útil sentimos la carrera frente a los salarios reales.

No pide carné ni correo, es 100% anónima y no quita ni 3 minutos (literal {tiempo}). 

Hagámonos escuchar de verdad con datos duros:
👉 {link}

Llévenla antes de que se les olvide, entre más seamos más presión hay para que mejoren las cosas. ¡Pásenla a sus otros grupos! 🔥`
  },
  {
    id: "peer-speech-delegado",
    perspective: "estudiante",
    perspectiveLabel: "🎓 Estudiante a Estudiante",
    channel: "speech",
    channelLabel: "🗣️ Speech Oral en Aula (60-90s)",
    title: "Intervención de Delegado Estudiantil en Cambio de Hora",
    context: "Para que un estudiante líder o representante de la Asociación Estudiantil hable 1 minuto frente a sus compañeros entre clases.",
    readingTime: "50s",
    words: 120,
    subject: "Guion de Delegado o Representante Estudiantil",
    body: `"Qué onda compañeros, solo les robo un minuto antes de que llegue el siguiente licenciado.

Siempre nos estamos quejando en los pasillos de que hay materias con demasiada teoría, de que los laboratorios necesitan actualización o de que cuando salgamos a trabajar no sabemos si nos van a pagar bien. Pues miren: ahorita hay una encuesta de investigación oficial abierta exactamente para eso.

Si no la llenamos, luego no tenemos derecho a quejarnos de que nadie nos escucha. No les pide nombre, es completamente anónima y toma menos de 3 minutos.

Les acabo de reenviar el link al grupo de WhatsApp del salón. Por favor ábranlo ahorita mismo mientras esperamos clase: {link}.

Demostremos que a los estudiantes de {facultad} sí nos importa el futuro de nuestra carrera. ¡Gracias!"`
  },
  {
    id: "peer-social-story",
    perspective: "estudiante",
    perspectiveLabel: "🎓 Estudiante a Estudiante",
    channel: "social",
    channelLabel: "📱 Redes Sociales",
    title: "Copy para Instagram Story / TikTok con Sticker de Enlace",
    context: "Para que estudiantes e influencers universitarios suban una historia con captura de pantalla y sticker de enlace.",
    readingTime: "25s",
    words: 65,
    subject: "Guion para Story de Instagram / TikTok",
    body: `Gente de la UNAB 🦅
¿Sienten que la U de verdad los está preparando para el mercado laboral actual? 🤔

Abrieron una encuesta oficial 100% ANÓNIMA para evaluar exactamente eso. Solo toma 2 minutos y te da constancia con comprobante al final 📜✨

Haz valer tu opinión aquí 👇
[STICKER DE ENLACE: {link}]

#UNAB #VidaUniversitaria #ElSalvador`
  },
  {
    id: "peer-dm-individual",
    perspective: "estudiante",
    perspectiveLabel: "🎓 Estudiante a Estudiante",
    channel: "whatsapp",
    channelLabel: "💬 WhatsApp / Telegram",
    title: "Mensaje Directo 1 a 1 de Compañero a Compañero",
    context: "Para enviar por privado a amigos de clase que aún no han llenado el cuestionario.",
    readingTime: "20s",
    words: 55,
    subject: "Mensaje Directo Individual",
    body: `¡Hola! 👋 Mira, te comparto esta encuesta rápida de la UNAB sobre si sentimos que la carrera realmente sirve para conseguir trabajo afuera.

Es 100% anónima y la llenas en {tiempo} desde el cel. Échame la mano llenándola por fa, es para la investigación de la facultad:
👉 {link}

¡Te lo agradecería un montón!`
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
    title: "Publicación de Egresado en LinkedIn con Foco Profesional",
    context: "Para graduados activos en el mercado que desean impulsar la pertinencia de su alma mater.",
    readingTime: "1m 00s",
    words: 160,
    subject: "Post de Graduado UNAB en LinkedIn",
    body: `Como graduado de la Universidad Dr. Andrés Bello, sé de primera mano lo desafiante que es el mercado laboral salvadoreño al momento de salir de las aulas.

La diferencia entre un egresado que consigue empleo rápido y uno que pasa meses esperando radica en la pertinencia de las competencias que aprendió en su carrera: menos memorización y más habilidades prácticas, pensamiento crítico y herramientas reales.

Por eso celebro que la UNAB esté ejecutando este Diagnóstico de Utilidad Curricular con sus estudiantes activos de {facultad}.

Si hoy estás en las aulas de la UNAB, no dejes pasar esta oportunidad. Tómate {tiempo} para responder con objetividad y madurez profesional:
👉 {link}

La encuesta es totalmente anónima. Lo que respondas hoy impactará directamente en el valor que el mercado le dará a tu título mañana.

#GraduadosUNAB #EducacionYSociedad #MercadoLaboral #ElSalvador`
  },
  {
    id: "egresado-whatsapp-red",
    perspective: "egresado",
    perspectiveLabel: "💼 Egresado / Graduado",
    channel: "whatsapp",
    channelLabel: "💬 WhatsApp / Telegram",
    title: "Mensaje de Egresado para Grupos de Tutoría o Exalumnos",
    context: "Para compartir en grupos mixtos donde conviven egresados, tesistas y estudiantes activos.",
    readingTime: "40s",
    words: 110,
    subject: "Consejo de Graduado a Estudiantes Activos",
    body: `Hola a todos en el grupo 👋 Les saluda un egresado de la {facultad}.

Un consejo sincero desde la experiencia afuera en las empresas: la mejor forma de que una universidad mejore no es quejándose cuando ya te graduaste, sino participando cuando estás dentro.

Ahorita está abierta la evaluación oficial de retorno académico de la UNAB. Solo toma {tiempo} y es 100% anónima.

Si quieren que sus planes de estudio sean más prácticos y valorados por los reclutadores, llenen esto:
👉 {link}

Aprovechen estos espacios que antes no existían. ¡Mucho éxito en su ciclo!`
  },

  // =========================================================================
  // 5. PERSPECTIVA: COMITÉ DE INVESTIGACIÓN CIENTÍFICA
  // =========================================================================
  {
    id: "comite-email-cientifico",
    perspective: "investigacion",
    perspectiveLabel: "🔬 Comité Científico",
    channel: "email",
    channelLabel: "📧 Correo Institucional",
    title: "Invitación Metodológica y Ética del Equipo Investigador",
    context: "Para envío a docentes, tutores de tesis y estudiantes con interés en rigor metodológico y psicometría.",
    readingTime: "1m 15s",
    words: 180,
    subject: "Convocatoria Científica: Modelo Psicométrico de Inserción Laboral UNAB",
    body: `Estimada comunidad académica de la Universidad Dr. Andrés Bello:

El equipo de investigadores principales del proyecto *Retorno de Inversión Académico e Inserción Laboral* extiende una cordial invitación a formar parte de la muestra probabilística institucional de este ciclo.

Nuestro estudio implementa modelos psicométricos avanzados de Análisis Factorial Confirmatorio (CFA), coeficientes de fiabilidad Omega de McDonald ($\omega$) y contraste de hipótesis de Pearson ($r$), orientados a medir la autoeficacia académica y su correlación con la inserción laboral en El Salvador.

Principios Éticos y Metodológicos del Instrumento:
1. Consentimiento Informado explícito (Bloque 0).
2. Anonimato absoluto (cero vinculación de identidad o IP).
3. Generación de constancia criptográfica SHA-256 verificable en tiempo real.
4. Duración optimizada de {tiempo}.

Invitamos a cada estudiante de la {facultad} en Sede {sede} a contribuir con sus datos al desarrollo científico del país:
👉 {link}

Por una ciencia rigurosa al servicio del desarrollo salvadoreño.

Comité de Investigación Psicométrica UNAB`
  },
  {
    id: "comite-whatsapp-datos",
    perspective: "investigacion",
    perspectiveLabel: "🔬 Comité Científico",
    channel: "whatsapp",
    channelLabel: "💬 WhatsApp / Telegram",
    title: "Aviso de Conteo de Muestra y Cierre Próximo",
    context: "Para enviar durante la fase de refuerzo para recordar la meta de muestra por facultad.",
    readingTime: "35s",
    words: 95,
    subject: "Aviso de Avance de Muestra en WhatsApp",
    body: `📊 *BARÓMETRO DE PARTICIPACIÓN UNAB 2026*

Aviso del Comité de Investigación para estudiantes de {facultad} (Sede {sede}):

Estamos a pocas respuestas de alcanzar la meta de representatividad estadística para tu facultad. Tu participación es decisiva para que los datos reflejen con exactitud la realidad de tu carrera.

⏱️ Solo te tomará {tiempo}.
🔒 Es 100% anónimo.
📜 Incluye constancia digital con comprobante al finalizar.

Ingresa y suma tu respuesta al barómetro científico:
👉 {link}

¡Gracias por tu aporte a la ciencia universitaria!`
  },
  {
    id: "comite-print-flyer",
    perspective: "investigacion",
    perspectiveLabel: "🔬 Comité Científico",
    channel: "print",
    channelLabel: "📄 Afiches y Material Físico",
    title: "Volante de Mano / Flyer Informativo con QR para Aulas",
    context: "Para imprimir en media cuartilla o volante de mano y repartir en pupitres o entradas de biblioteca.",
    readingTime: "25s",
    words: 70,
    subject: "Flyer de Mano con Código QR",
    body: `🔬 INVESTIGACIÓN CIENTÍFICA UNAB 2026
"Percepción de Utilidad Curricular y Retorno Académico"

Participa en el estudio que medirá la efectividad de los planes de estudio en El Salvador.

• 100% Anónimo y Seguro.
• Duración: {tiempo}.
• Constancia digital con sello SHA-256.

📱 Escanea el código QR con tu celular o ingresa en:
{link}`
  },
  {
    id: "docente-print-catedra",
    perspective: "docente",
    perspectiveLabel: "👨‍🏫 Docente a Estudiante",
    channel: "print",
    channelLabel: "📄 Afiches y Material Físico",
    title: "Afiche de Cátedra para Murales de Laboratorios y Pasillos",
    context: "Para colocar en la puerta de los laboratorios especializados y pasillos de la facultad.",
    readingTime: "30s",
    words: 80,
    subject: "Aviso de Cátedra en Laboratorios",
    body: `👨‍🏫 ATENCIÓN ESTUDIANTES DE {facultad} (SEDE {sede})
¿Quieres que los laboratorios y prácticas de tu carrera mejoren?

La retroalimentación honesta de los estudiantes es el único insumo válido para actualizar los programas de cátedra y el equipamiento técnico.

⏱️ Toma solo {tiempo} y es completamente anónimo.
📲 Escanea el código QR o ingresa en:
{link}`
  },
  {
    id: "peer-lms-foro",
    perspective: "estudiante",
    perspectiveLabel: "🎓 Estudiante a Estudiante",
    channel: "lms",
    channelLabel: "🖥️ Aula Virtual / LMS",
    title: "Participación en Foro de Aula Virtual / Moodle",
    context: "Para abrir un hilo de discusión constructiva en los foros de debate del campus virtual.",
    readingTime: "40s",
    words: 110,
    subject: "Hilo de Debate Estudiantil sobre Utilidad Curricular",
    body: `Hola compañeros de {facultad}:

Abro este hilo para motivar a que todos nos tomemos {tiempo} en completar la evaluación psicométrica institucional sobre Utilidad Curricular.

Muchas veces comentamos en los grupos que nos gustaría tener más proyectos prácticos y materias actualizadas con lo que piden las empresas. Esta encuesta es el canal oficial y anónimo para plasmarlo formalmente ante las autoridades.

Pueden responderla desde su celular en este enlace:
🔗 {link}

¡Hagamos valer nuestra perspectiva estudiantil!`
  },
  {
    id: "egresado-speech-charla",
    perspective: "egresado",
    perspectiveLabel: "💼 Egresado / Graduado",
    channel: "speech",
    channelLabel: "🗣️ Speech Oral en Aula (60-90s)",
    title: "Intervención de Egresado Invitado en Ponencias y Clases",
    context: "Para ser utilizado por profesionales egresados que asisten como invitados o conferencistas a las aulas.",
    readingTime: "1m 10s",
    words: 145,
    subject: "Guion de Egresado Invitado",
    body: `"Hola a todos. Como profesional graduado de esta misma facultad en la UNAB, les puedo asegurar que afuera en el mercado laboral cada decisión que tomen en su carrera cuenta.

Las empresas buscan profesionales adaptables, con sólidas competencias prácticas. Si ustedes sienten que hay áreas de su carrera que necesitan mayor enfoque técnico o preparación para el empleo, este es el momento exacto para decirlo.

La universidad tiene activo un diagnóstico de retorno de inversión académica que es 100% anónimo. Les toma únicamente {tiempo}.

He dejado el enlace en el proyector y en el chat: {link}. Llénenlo con total franqueza, porque de la calidad de sus planes de estudio dependerá el prestigio del título que todos llevaremos en nuestro currículum. ¡Éxitos!"`
  },
  {
    id: "comite-social-x",
    perspective: "investigacion",
    perspectiveLabel: "🔬 Comité Científico",
    channel: "social",
    channelLabel: "📱 Redes Sociales",
    title: "Campaña de Difusión Científica para Twitter / X e Hilos",
    context: "Formato síntesis para redes sociales rápidas enfocado en transparencia y participación representativa.",
    readingTime: "30s",
    words: 75,
    subject: "Publicación para Redes Sociales Rápidas",
    body: `¿La educación universitaria responde al mercado laboral en El Salvador? 📊🇸🇻

Desde el Comité de Investigación de la UNAB evaluamos psicométricamente la utilidad curricular en la {facultad}.

✅ 100% anónimo
⏱️ Solo {tiempo}
📜 Constancia digital verificable con sello SHA-256

Tu aporte hace la diferencia:
👉 {link}

#InvestigacionUNAB #EducacionSuperior`
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
