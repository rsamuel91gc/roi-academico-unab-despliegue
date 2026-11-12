/**
 * app.js - Controlador Lógico Reactivo y Gestor de Campaña Multicanal
 * Plataforma: roi-academico-unab-despliegue (Universidad Dr. Andrés Bello)
 * Estándar: Cero Mocks, Manejo de Estado en Caliente, Modo Presentación 16:9, Fondo Blanco Luminoso
 */

(function() {
  'use strict';

  // URLs Canónicas de Producción
  var CANONICAL_PORTAL_URL = "https://rsamuel91gc.github.io/roi-academico-unab/";
  var CANONICAL_SHORT_URL = "https://tinyurl.com/roi-academico-unabsv";
  var CANONICAL_GAS_URL = "https://script.google.com/macros/s/AKfycbw2DStj17C_fnc8UPw3-9y1Rfcp1ILf7tvW9Ht14i4vG1FgP6ce0y1oY_KJgBmjVjuvig/exec";

  // Estado Central de la Aplicación
  var state = {
    selectedFaculty: "Facultad de Tecnología e Innovación",
    selectedCampus: "San Salvador (Sede Central)",
    senderName: "",
    linkMode: "tinyurl", // 'tinyurl' o 'utm'
    activePerspective: "todas",
    activeChannel: "todos",
    searchQuery: "",
    activeMockupSpeech: null,
    activeMockupTab: "whatsapp",
    timerInterval: null,
    timerSeconds: 240, // 4 minutos (dentro del rango 3-5 min)
    timerRunning: false
  };

  // Inicialización
  document.addEventListener("DOMContentLoaded", function() {
    initPersonalizationBar();
    initFilters();
    initSearch();
    initModals();
    initTimerControls();
    renderSpeeches();
  });

  // Inicializa barra de personalización superior
  function initPersonalizationBar() {
    var selFaculty = document.getElementById("custom-faculty");
    var selCampus = document.getElementById("custom-campus");
    var inpSender = document.getElementById("custom-sender");
    var toggleUtm = document.getElementById("toggle-utm-mode");

    if (selFaculty && window.UNAB_FACULTADES) {
      selFaculty.innerHTML = window.UNAB_FACULTADES.map(function(f) {
        return '<option value="' + escapeHtml(f) + '">' + escapeHtml(f) + '</option>';
      }).join("");
      selFaculty.value = state.selectedFaculty;
      selFaculty.addEventListener("change", function() {
        state.selectedFaculty = this.value;
        renderSpeeches();
      });
    }

    if (selCampus && window.UNAB_CAMPUSES) {
      selCampus.innerHTML = window.UNAB_CAMPUSES.map(function(c) {
        return '<option value="' + escapeHtml(c) + '">' + escapeHtml(c) + '</option>';
      }).join("");
      selCampus.value = state.selectedCampus;
      selCampus.addEventListener("change", function() {
        state.selectedCampus = this.value;
        renderSpeeches();
      });
    }

    if (inpSender) {
      inpSender.addEventListener("input", function() {
        state.senderName = this.value.trim();
        renderSpeeches();
      });
    }

    if (toggleUtm) {
      toggleUtm.addEventListener("change", function() {
        state.linkMode = this.checked ? "utm" : "tinyurl";
        updateLinkModeBadge();
        renderSpeeches();
      });
    }
  }

  function updateLinkModeBadge() {
    var badge = document.getElementById("link-mode-label");
    if (!badge) return;
    if (state.linkMode === "utm") {
      badge.textContent = "Modo UTM Activo (Tracking Analítico)";
      badge.className = "text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 truncate";
    } else {
      badge.textContent = "Enlace Corto (TinyURL)";
      badge.className = "text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 truncate";
    }
  }

  // Inicializa botones de filtro por perspectiva y canal (Medios Separados)
  function initFilters() {
    // 1. Filtros por Perspectiva
    var persButtons = document.querySelectorAll("[data-filter-perspective]");
    persButtons.forEach(function(btn) {
      btn.addEventListener("click", function() {
        persButtons.forEach(function(b) {
          b.classList.remove("active-pers-pill", "bg-blue-600", "text-white", "shadow-xs");
          b.classList.add("bg-slate-100", "text-slate-700", "border-slate-200");
        });
        this.classList.add("active-pers-pill", "bg-blue-600", "text-white", "shadow-xs");
        this.classList.remove("bg-slate-100", "text-slate-700", "border-slate-200");
        state.activePerspective = this.getAttribute("data-filter-perspective");
        renderSpeeches();
      });
    });

    // 2. Filtros por Canal (Medios Separados)
    var chanButtons = document.querySelectorAll("[data-filter-channel]");
    chanButtons.forEach(function(btn) {
      btn.addEventListener("click", function() {
        chanButtons.forEach(function(b) {
          b.classList.remove("active-channel-card", "border-blue-600", "bg-blue-50/70", "text-blue-900", "shadow-xs");
          b.classList.add("border-slate-200", "bg-white", "text-slate-800");
        });
        this.classList.add("active-channel-card", "border-blue-600", "bg-blue-50/70", "text-blue-900", "shadow-xs");
        this.classList.remove("border-slate-200", "bg-white", "text-slate-800");
        state.activeChannel = this.getAttribute("data-filter-channel");
        renderSpeeches();
      });
    });
  }

  // Inicializa buscador en tiempo real
  function initSearch() {
    var searchInput = document.getElementById("search-speeches");
    if (searchInput) {
      searchInput.addEventListener("input", function() {
        state.searchQuery = this.value.toLowerCase().trim();
        renderSpeeches();
      });
    }
  }

  // Resuelve el enlace de destino dinámicamente
  function resolveTargetLink(speech) {
    if (state.linkMode === "utm") {
      var utmParams = "?utm_source=" + encodeURIComponent(speech.channel) +
                      "&utm_medium=" + encodeURIComponent(speech.perspective) +
                      "&utm_campaign=cfa_unab_2026";
      return CANONICAL_PORTAL_URL + utmParams;
    }
    return CANONICAL_SHORT_URL;
  }

  // Interpola variables dentro del texto
  function interpolateText(text, speech) {
    if (!text) return "";
    var sender = state.senderName || (speech.perspective === "docente" ? "Tu Docente" : "Estudiante UNAB");
    var link = resolveTargetLink(speech);
    
    return text
      .replace(/{nombre}/g, sender)
      .replace(/{facultad}/g, state.selectedFaculty)
      .replace(/{sede}/g, state.selectedCampus)
      .replace(/{link}/g, link)
      .replace(/{tiempo}/g, "3 a 5 minutos");
  }

  // Renderiza el catálogo de discursos en fondo blanco limpio
  function renderSpeeches() {
    var container = document.getElementById("speeches-container");
    var counter = document.getElementById("speeches-counter");
    if (!container || !window.UNAB_SPEECHES) return;

    var filtered = window.UNAB_SPEECHES.filter(function(s) {
      var matchPers = (state.activePerspective === "todas" || s.perspective === state.activePerspective);
      var matchChan = (state.activeChannel === "todos" || s.channel === state.activeChannel);
      var matchQuery = true;
      if (state.searchQuery) {
        var fullText = (s.title + " " + s.subject + " " + s.body + " " + s.context).toLowerCase();
        matchQuery = fullText.indexOf(state.searchQuery) !== -1;
      }
      return matchPers && matchChan && matchQuery;
    });

    if (counter) {
      counter.textContent = filtered.length + " de " + window.UNAB_SPEECHES.length + " mensajes disponibles";
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div class="text-4xl mb-2">🔍</div>
          <h3 class="text-base font-bold text-slate-800">No se encontraron discursos para esta combinación</h3>
          <p class="text-slate-500 text-xs mt-1">Intenta seleccionar "Todos" en los medios o perspectivas.</p>
          <button id="btn-reset-filters" class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition cursor-pointer">
            Restablecer todos los filtros
          </button>
        </div>
      `;
      var resetBtn = document.getElementById("btn-reset-filters");
      if (resetBtn) {
        resetBtn.addEventListener("click", function() {
          state.activePerspective = "todas";
          state.activeChannel = "todos";
          state.searchQuery = "";
          var searchInput = document.getElementById("search-speeches");
          if (searchInput) searchInput.value = "";
          initFilters();
          renderSpeeches();
        });
      }
      return;
    }

    container.innerHTML = filtered.map(function(speech) {
      var bodyInterpolated = interpolateText(speech.body, speech);
      var subjectInterpolated = interpolateText(speech.subject, speech);

      return `
        <div class="speech-card bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200">
          <div>
            <!-- Cabecera de la tarjeta con Badges -->
            <div class="flex items-center justify-between gap-2 mb-2.5">
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                ${escapeHtml(speech.perspectiveLabel)}
              </span>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                ${escapeHtml(speech.channelLabel)}
              </span>
            </div>

            <!-- Título y Contexto -->
            <h4 class="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug mb-1">
              ${escapeHtml(speech.title)}
            </h4>
            <p class="text-xs text-slate-500 mb-3 line-clamp-2">
              💡 <span class="text-slate-600 font-medium">${escapeHtml(speech.context)}</span>
            </p>

            <!-- Metadatos de Lectura -->
            <div class="flex items-center gap-3 text-[11px] text-slate-500 mb-3 pb-2.5 border-b border-slate-100">
              <span class="inline-flex items-center gap-1">⏱️ Lectura: ${escapeHtml(speech.readingTime)}</span>
              <span class="inline-flex items-center gap-1 font-semibold text-blue-700">📋 Encuesta: 3 a 5 min</span>
            </div>

            <!-- Asunto Recomendado (si aplica) -->
            ${speech.subject ? `
              <div class="mb-3 bg-blue-50/70 p-2.5 rounded-xl border border-blue-100 text-xs">
                <span class="text-blue-900 font-bold block mb-0.5">Asunto sugerido:</span>
                <span class="text-blue-800 font-medium select-all">${escapeHtml(subjectInterpolated)}</span>
              </div>
            ` : ''}

            <!-- Cuerpo del Discurso -->
            <div class="relative bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto select-all mb-4 scrollbar-thin">
              ${escapeHtml(bodyInterpolated)}
            </div>
          </div>

          <!-- Acciones de la Tarjeta (Botón Gigante Verde) -->
          <div class="pt-3 flex flex-wrap items-center gap-2 border-t border-slate-100">
            <button 
              onclick="window.copySpeechText('${speech.id}')"
              id="btn-copy-${speech.id}"
              class="flex-1 min-w-[130px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-xs hover:shadow active:scale-95 cursor-pointer"
              title="Copiar texto listo al portapapeles">
              <span>📋</span> Copiar Mensaje
            </button>
            <button 
              onclick="window.openMockupModal('${speech.id}')"
              id="btn-mockup-${speech.id}"
              class="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition active:scale-95 cursor-pointer"
              title="Previsualizar en WhatsApp, Correo, Afiche o Redes">
              <span>👁️</span> Ver
            </button>
            <button 
              onclick="window.openPresentationMode('${speech.id}')"
              id="btn-aula-${speech.id}"
              class="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition active:scale-95 cursor-pointer"
              title="Proyectar en pantalla gigante para salón de clases">
              <span>📽️</span> Aula
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  // Copiado al Portapapeles con Toast
  window.copySpeechText = function(speechId) {
    var speech = window.UNAB_SPEECHES.find(function(s) { return s.id === speechId; });
    if (!speech) return;

    var fullText = interpolateText(speech.body, speech);
    if (speech.channel === "email" && speech.subject) {
      fullText = "Asunto: " + interpolateText(speech.subject, speech) + "\n\n" + fullText;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullText).then(function() {
        showCopySuccess(speechId);
      }).catch(function(err) {
        fallbackCopyText(fullText, speechId);
      });
    } else {
      fallbackCopyText(fullText, speechId);
    }
  };

  function showCopySuccess(speechId) {
    var btn = document.getElementById("btn-copy-" + speechId);
    if (btn) {
      var originalHtml = btn.innerHTML;
      btn.innerHTML = '<span>✅</span> ¡Copiado!';
      btn.classList.add("bg-emerald-800");
      setTimeout(function() {
        btn.innerHTML = originalHtml;
        btn.classList.remove("bg-emerald-800");
      }, 2000);
    }
    showToast("Mensaje copiado al portapapeles con éxito. ¡Listo para pegar!");
  }

  function fallbackCopyText(text, speechId) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showCopySuccess(speechId);
    } catch (err) {
      alert("Por favor selecciona y copia el texto manualmente.");
    }
    document.body.removeChild(textArea);
  }

  function showToast(message) {
    var toast = document.getElementById("toast-notification");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
    toast.classList.add("opacity-100", "translate-y-0");
    setTimeout(function() {
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
    }, 2800);
  }

  // Modales y Mockups
  function initModals() {
    var closeMockupBtn = document.getElementById("btn-close-mockup");
    var mockupBackdrop = document.getElementById("mockup-modal-backdrop");
    if (closeMockupBtn) closeMockupBtn.addEventListener("click", closeMockupModal);
    if (mockupBackdrop) mockupBackdrop.addEventListener("click", closeMockupModal);

    var closePresBtn = document.getElementById("btn-close-presentation");
    if (closePresBtn) closePresBtn.addEventListener("click", closePresentationMode);

    // Pestañas del Mockup (WhatsApp, Email, Poster con QR, Instagram)
    var mockupTabs = document.querySelectorAll("[data-mockup-tab]");
    mockupTabs.forEach(function(tab) {
      tab.addEventListener("click", function() {
        mockupTabs.forEach(function(t) {
          t.classList.remove("bg-blue-600", "text-white", "font-bold");
          t.classList.add("bg-slate-100", "text-slate-700", "font-semibold");
        });
        this.classList.add("bg-blue-600", "text-white", "font-bold");
        this.classList.remove("bg-slate-100", "text-slate-700", "font-semibold");
        state.activeMockupTab = this.getAttribute("data-mockup-tab");
        renderActiveMockupContent();
      });
    });
  }

  window.openMockupModal = function(speechId, preferredTab) {
    var speech = window.UNAB_SPEECHES.find(function(s) { return s.id === speechId; });
    if (!speech) speech = window.UNAB_SPEECHES[0];

    state.activeMockupSpeech = speech;
    
    // Seleccionar pestaña automática según canal o preferencia
    if (preferredTab) {
      state.activeMockupTab = preferredTab;
    } else if (speech.channel === "print") {
      state.activeMockupTab = "poster";
    } else if (speech.channel === "email") {
      state.activeMockupTab = "email";
    } else if (speech.channel === "social") {
      state.activeMockupTab = "instagram";
    } else {
      state.activeMockupTab = "whatsapp";
    }

    // Actualizar botones de pestaña
    var mockupTabs = document.querySelectorAll("[data-mockup-tab]");
    mockupTabs.forEach(function(t) {
      if (t.getAttribute("data-mockup-tab") === state.activeMockupTab) {
        t.classList.add("bg-blue-600", "text-white", "font-bold");
        t.classList.remove("bg-slate-100", "text-slate-700", "font-semibold");
      } else {
        t.classList.remove("bg-blue-600", "text-white", "font-bold");
        t.classList.add("bg-slate-100", "text-slate-700", "font-semibold");
      }
    });

    renderActiveMockupContent();
    var modal = document.getElementById("mockup-modal");
    if (modal) modal.classList.remove("hidden");
  };

  function closeMockupModal() {
    var modal = document.getElementById("mockup-modal");
    if (modal) modal.classList.add("hidden");
    state.activeMockupSpeech = null;
  }

  function renderActiveMockupContent() {
    var container = document.getElementById("mockup-content-body");
    var speech = state.activeMockupSpeech;
    if (!container || !speech) return;

    var textInterpolated = interpolateText(speech.body, speech);
    var subjectInterpolated = interpolateText(speech.subject, speech);
    var sender = state.senderName || (speech.perspective === "docente" ? "Prof. " + state.selectedFaculty : "Universidad Dr. Andrés Bello");
    var nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (state.activeMockupTab === "whatsapp") {
      // WhatsApp Web Oficial en Modo Claro
      container.innerHTML = `
        <div class="max-w-md mx-auto bg-[#efeae2] text-slate-900 rounded-2xl overflow-hidden border border-slate-300 shadow-xl">
          <!-- WhatsApp Header -->
          <div class="bg-[#075e54] text-white px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-base shadow">
                🦅
              </div>
              <div>
                <div class="text-sm font-bold text-white">${escapeHtml(sender)}</div>
                <div class="text-[11px] text-emerald-200">en línea</div>
              </div>
            </div>
            <div class="text-white text-sm">⋮</div>
          </div>
          <!-- WhatsApp Chat Area -->
          <div class="p-4 min-h-[260px] flex flex-col justify-end bg-[radial-gradient(#d1d7db_1px,transparent_1px)] bg-[size:16px_16px]">
            <div class="bg-[#dcf8c6] text-slate-900 rounded-2xl rounded-tr-sm p-3.5 max-w-[90%] self-end shadow text-xs leading-relaxed border border-[#c4e3b0]">
              <div class="whitespace-pre-wrap">${escapeHtml(textInterpolated)}</div>
              <div class="flex items-center justify-end gap-1 text-[10px] text-slate-500 mt-1.5">
                <span>${nowTime}</span>
                <span class="text-blue-500 font-bold">✓✓</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (state.activeMockupTab === "email") {
      // Correo Institucional en Modo Claro
      container.innerHTML = `
        <div class="max-w-xl mx-auto bg-white text-slate-800 rounded-2xl overflow-hidden border border-slate-300 shadow-xl text-xs">
          <!-- Email Client Header -->
          <div class="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-400"></span>
              <span class="w-3 h-3 rounded-full bg-amber-400"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
              <span class="ml-2 font-semibold text-slate-600 text-[11px]">Bandeja de Entrada • UNAB Mail</span>
            </div>
          </div>
          <!-- Email Meta -->
          <div class="p-4 bg-slate-50 border-b border-slate-200 space-y-1.5">
            <div><span class="text-slate-500 font-bold">De:</span> <span class="text-slate-900 font-semibold">${escapeHtml(sender)} &lt;comunicacion@unab.edu.sv&gt;</span></div>
            <div><span class="text-slate-500 font-bold">Para:</span> <span class="text-slate-700">estudiantes.${state.selectedCampus.toLowerCase().replace(/[^a-z]/g, '')}@unab.edu.sv</span></div>
            <div><span class="text-slate-500 font-bold">Asunto:</span> <span class="text-blue-700 font-bold">${escapeHtml(subjectInterpolated || "Diagnóstico Oficial UNAB 2026")}</span></div>
          </div>
          <!-- Email Body -->
          <div class="p-6 bg-white leading-relaxed whitespace-pre-wrap text-slate-700">
            ${escapeHtml(textInterpolated)}
          </div>
        </div>
      `;
    } else if (state.activeMockupTab === "poster") {
      // Afiche Promocional con Código QR Integrado
      container.innerHTML = `
        <div class="max-w-md mx-auto bg-white text-slate-900 rounded-3xl overflow-hidden border-2 border-slate-200 shadow-2xl flex flex-col">
          <!-- Poster Top Header -->
          <div class="bg-blue-800 text-white px-5 py-4 flex items-center justify-between border-b-4 border-amber-400">
            <div class="flex items-center gap-3">
              <img src="assets/logo_unab.png" alt="UNAB" class="h-9 w-auto bg-white p-1 rounded-lg">
              <div>
                <div class="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">Universidad Dr. Andrés Bello</div>
                <div class="text-xs font-bold text-slate-100">Vicerrectoría Académica • Investigaciones</div>
              </div>
            </div>
            <span class="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full">2026</span>
          </div>

          <!-- Poster Body -->
          <div class="p-6 text-center space-y-4 bg-gradient-to-b from-blue-50/40 via-white to-slate-50">
            <div>
              <span class="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider mb-2">
                Diagnóstico Oficial Estudiantil
              </span>
              <h4 class="text-lg font-black text-slate-900 leading-tight">
                ¿Lo que estás aprendiendo te prepara para el empleo que quieres?
              </h4>
              <p class="text-xs text-slate-600 mt-1">
                Participa en la evaluación sobre <strong class="text-blue-800">Utilidad Curricular y Retorno Académico</strong> en la ${escapeHtml(state.selectedFaculty)}.
              </p>
            </div>

            <!-- Official Giant QR Code -->
            <div class="p-4 bg-white rounded-2xl shadow-lg border-2 border-blue-600 inline-block mx-auto">
              <img src="assets/QR_UNAB_ROI_Academico.png" alt="Código QR Oficial" class="w-48 h-48 sm:w-52 sm:h-52 object-contain mx-auto">
              <div class="text-[10px] font-extrabold text-blue-800 uppercase tracking-wider mt-2">
                📷 Apunta la cámara de tu celular
              </div>
            </div>

            <!-- Key Features -->
            <div class="grid grid-cols-3 gap-2 text-left bg-slate-100/80 p-3 rounded-xl border border-slate-200 text-[10px] text-slate-700">
              <div>
                <div class="font-black text-slate-900">🔒 100%</div>
                <div>Anónimo y seguro</div>
              </div>
              <div>
                <div class="font-black text-slate-900">⏱️ 3 a 5 min</div>
                <div>Duración real</div>
              </div>
              <div>
                <div class="font-black text-slate-900">📜 Sello</div>
                <div>Constancia digital</div>
              </div>
            </div>

            <!-- Short Link -->
            <div class="text-xs text-slate-500">
              O ingresa directamente:  
              <a href="https://tinyurl.com/roi-academico-unabsv" target="_blank" class="font-mono text-blue-700 font-bold block sm:inline hover:underline select-all">
                tinyurl.com/roi-academico-unabsv
              </a>
            </div>

            <!-- Download Action Buttons -->
            <div class="flex flex-wrap gap-2 justify-center pt-2 border-t border-slate-200">
              <a href="assets/QR_UNAB_ROI_Academico.png" download="Afiche_QR_UNAB.png" class="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1 cursor-pointer">
                <span>⬇️</span> Descargar PNG
              </a>
              <a href="assets/QR_UNAB_ROI_Academico.svg" download="Afiche_QR_UNAB.svg" class="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs transition flex items-center gap-1 cursor-pointer">
                <span>⬇️</span> Descargar SVG
              </a>
            </div>
          </div>

          <!-- Poster Footer -->
          <div class="bg-slate-100 px-4 py-2 text-center text-[10px] text-slate-500 border-t border-slate-200">
            Universidad Dr. Andrés Bello • Instrumento Psicométrico Institucional
          </div>
        </div>
      `;
    } else if (state.activeMockupTab === "instagram") {
      // Instagram Post en Modo Claro
      container.innerHTML = `
        <div class="max-w-sm mx-auto bg-white text-slate-900 rounded-2xl overflow-hidden border border-slate-300 shadow-xl text-xs">
          <!-- Instagram Header -->
          <div class="p-3 flex items-center justify-between border-b border-slate-200">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-0.5">
                <div class="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-xs">
                  🦅
                </div>
              </div>
              <div>
                <div class="font-bold text-slate-900 text-xs">unab_elsalvador</div>
                <div class="text-[10px] text-slate-500">${state.selectedCampus}</div>
              </div>
            </div>
            <span class="text-slate-400">⋯</span>
          </div>
          <!-- Instagram Simulated Media -->
          <div class="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <div class="text-2xl mb-1.5">📊🏛️</div>
            <div class="font-black text-amber-300 text-sm mb-1">${escapeHtml(speech.title)}</div>
            <div class="text-[11px] text-blue-100 max-w-[220px]">Tu voz transforma los planes de estudio en la UNAB</div>
            <div class="mt-3 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px]">
              Enlace en Biografía 🔗
            </div>
          </div>
          <!-- Instagram Caption -->
          <div class="p-3 space-y-1.5">
            <div class="flex items-center gap-3 text-sm text-slate-600 pb-1">
              <span>❤️</span> <span>💬</span> <span>↗️</span>
            </div>
            <div class="leading-relaxed">
              <span class="font-bold text-slate-900">unab_elsalvador</span>
              <span class="text-slate-700 whitespace-pre-wrap"> ${escapeHtml(textInterpolated.substring(0, 240))}...</span>
            </div>
            <div class="text-[10px] text-slate-400 uppercase mt-1">Hace 15 minutos</div>
          </div>
        </div>
      `;
    }
  }

  // =========================================================================
  // MODO PROYECCIÓN EN AULA (16:9 FULLSCREEN CON TEMPORIZADOR Y QR GIGANTE)
  // =========================================================================
  window.openPresentationMode = function(speechId) {
    var speech = window.UNAB_SPEECHES.find(function(s) { return s.id === speechId; }) || window.UNAB_SPEECHES[0];
    var modal = document.getElementById("presentation-modal");
    if (!modal) return;

    var titleEl = document.getElementById("pres-title");
    var facultyEl = document.getElementById("pres-faculty");
    var campusEl = document.getElementById("pres-campus");
    var linkEl = document.getElementById("pres-link-text");

    if (titleEl) titleEl.textContent = speech.title;
    if (facultyEl) facultyEl.textContent = state.selectedFaculty;
    if (campusEl) campusEl.textContent = state.selectedCampus;
    if (linkEl) linkEl.textContent = resolveTargetLink(speech);

    modal.classList.remove("hidden");
    resetTimer();
  };

  function closePresentationMode() {
    var modal = document.getElementById("presentation-modal");
    if (modal) modal.classList.add("hidden");
    pauseTimer();
  }

  // Controlador de Temporizador para Aula (4 Minutos = 240s)
  function initTimerControls() {
    var btnToggle = document.getElementById("pres-timer-toggle");
    var btnReset = document.getElementById("pres-timer-reset");

    if (btnToggle) {
      btnToggle.addEventListener("click", function() {
        if (state.timerRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      });
    }

    if (btnReset) {
      btnReset.addEventListener("click", resetTimer);
    }
  }

  function startTimer() {
    if (state.timerRunning) return;
    state.timerRunning = true;
    updateTimerToggleBtn();

    state.timerInterval = setInterval(function() {
      if (state.timerSeconds > 0) {
        state.timerSeconds--;
        renderTimerDisplay();
      } else {
        pauseTimer();
        var display = document.getElementById("pres-timer-display");
        if (display) {
          display.textContent = "00:00 - ¡Tiempo!";
          display.classList.add("text-rose-600");
        }
        showToast("¡Tiempo completado! Agradece a los estudiantes por su participación.");
      }
    }, 1000);
  }

  function pauseTimer() {
    state.timerRunning = false;
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
    updateTimerToggleBtn();
  }

  function resetTimer() {
    pauseTimer();
    state.timerSeconds = 240; // 4 minutos (en rango 3-5 min)
    renderTimerDisplay();
    var display = document.getElementById("pres-timer-display");
    if (display) display.classList.remove("text-rose-600");
  }

  function renderTimerDisplay() {
    var display = document.getElementById("pres-timer-display");
    if (!display) return;
    var mins = Math.floor(state.timerSeconds / 60);
    var secs = state.timerSeconds % 60;
    display.textContent = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
  }

  function updateTimerToggleBtn() {
    var btn = document.getElementById("pres-timer-toggle");
    if (!btn) return;
    if (state.timerRunning) {
      btn.innerHTML = "<span>⏸️</span> Pausar";
      btn.className = "px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition shadow-sm cursor-pointer";
    } else {
      btn.innerHTML = "<span>▶️</span> Iniciar Tiempo";
      btn.className = "px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm cursor-pointer";
    }
  }

  // Utilidad de escape contra XSS
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

})();
