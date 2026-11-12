/**
 * app.js - Controlador Lógico Reactivo y Gestor de Campaña Multicanal
 * Plataforma: roi-academico-unab-despliegue (Universidad Dr. Andrés Bello)
 * Estándar: Cero Mocks, Manejo de Estado en Caliente, Modo Presentación 16:9
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
    timerSeconds: 180, // 3 minutos
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
      badge.className = "text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40";
    } else {
      badge.textContent = "Enlace Corto Verificado (TinyURL)";
      badge.className = "text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
    }
  }

  // Inicializa botones de filtro por perspectiva y canal
  function initFilters() {
    var persButtons = document.querySelectorAll("[data-filter-perspective]");
    persButtons.forEach(function(btn) {
      btn.addEventListener("click", function() {
        persButtons.forEach(function(b) {
          b.classList.remove("active-filter-btn", "bg-amber-500", "text-slate-950", "border-amber-400");
          b.classList.add("bg-slate-800/80", "text-slate-300", "border-slate-700");
        });
        this.classList.add("active-filter-btn", "bg-amber-500", "text-slate-950", "border-amber-400");
        this.classList.remove("bg-slate-800/80", "text-slate-300", "border-slate-700");
        state.activePerspective = this.getAttribute("data-filter-perspective");
        renderSpeeches();
      });
    });

    var chanButtons = document.querySelectorAll("[data-filter-channel]");
    chanButtons.forEach(function(btn) {
      btn.addEventListener("click", function() {
        chanButtons.forEach(function(b) {
          b.classList.remove("active-filter-btn", "bg-amber-500", "text-slate-950", "border-amber-400");
          b.classList.add("bg-slate-800/80", "text-slate-300", "border-slate-700");
        });
        this.classList.add("active-filter-btn", "bg-amber-500", "text-slate-950", "border-amber-400");
        this.classList.remove("bg-slate-800/80", "text-slate-300", "border-slate-700");
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
      .replace(/{tiempo}/g, "2m 15s");
  }

  // Renderiza el catálogo de discursos
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
      counter.textContent = filtered.length + " de " + window.UNAB_SPEECHES.length + " recursos comunicativos disponibles";
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center bg-slate-900/60 rounded-2xl border border-slate-800 p-8">
          <div class="text-4xl mb-3">🔍</div>
          <h3 class="text-lg font-bold text-slate-200">No se encontraron discursos con los filtros actuales</h3>
          <p class="text-slate-400 text-sm mt-1">Intenta seleccionar otra perspectiva o limpiar la búsqueda.</p>
          <button id="btn-reset-filters" class="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs transition">
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
      var currentLink = resolveTargetLink(speech);

      return `
        <div class="speech-card bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all duration-200 hover:-translate-y-1">
          <div>
            <!-- Cabecera de la tarjeta con Badges -->
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                ${escapeHtml(speech.perspectiveLabel)}
              </span>
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                ${escapeHtml(speech.channelLabel)}
              </span>
            </div>

            <!-- Título y Contexto -->
            <h3 class="text-lg font-extrabold text-white tracking-tight leading-snug mb-1">
              ${escapeHtml(speech.title)}
            </h3>
            <p class="text-xs text-slate-400 mb-4 line-clamp-2">
              💡 <span class="text-slate-300 font-medium">${escapeHtml(speech.context)}</span>
            </p>

            <!-- Metadatos de Lectura -->
            <div class="flex items-center gap-4 text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
              <span class="inline-flex items-center gap-1">⏱️ ${escapeHtml(speech.readingTime)}</span>
              <span class="inline-flex items-center gap-1">📝 ~${speech.words} palabras</span>
              <span class="inline-flex items-center gap-1 text-emerald-400">🔗 Link activo</span>
            </div>

            <!-- Asunto (si aplica) -->
            ${speech.subject ? `
              <div class="mb-3 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 text-xs">
                <span class="text-slate-400 font-semibold block mb-0.5">Asunto recomendado:</span>
                <span class="text-amber-200 font-medium select-all">${escapeHtml(subjectInterpolated)}</span>
              </div>
            ` : ''}

            <!-- Cuerpo del Discurso -->
            <div class="relative bg-slate-950/90 rounded-xl p-4 border border-slate-800/80 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto select-all mb-4 scrollbar-thin">
              ${escapeHtml(bodyInterpolated)}
            </div>
          </div>

          <!-- Acciones de la Tarjeta -->
          <div class="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-800/70">
            <button 
              onclick="window.copySpeechText('${speech.id}')"
              id="btn-copy-${speech.id}"
              class="flex-1 min-w-[130px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-md hover:shadow-amber-500/20 active:scale-95">
              <span>📋</span> Copiar Speech
            </button>
            <button 
              onclick="window.openMockupModal('${speech.id}')"
              class="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition hover:border-slate-600 active:scale-95"
              title="Previsualizar en WhatsApp, Correo o Redes">
              <span>👁️</span> Mockup
            </button>
            <button 
              onclick="window.openPresentationMode('${speech.id}')"
              class="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 transition active:scale-95"
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
      btn.classList.add("bg-emerald-500", "text-slate-950");
      btn.classList.remove("bg-amber-500");
      setTimeout(function() {
        btn.innerHTML = originalHtml;
        btn.classList.remove("bg-emerald-500");
        btn.classList.add("bg-amber-500");
      }, 2000);
    }
    showToast("Discurso copiado al portapapeles con éxito. ¡Listo para pegar!");
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

    // Pestañas del Mockup
    var mockupTabs = document.querySelectorAll("[data-mockup-tab]");
    mockupTabs.forEach(function(tab) {
      tab.addEventListener("click", function() {
        mockupTabs.forEach(function(t) {
          t.classList.remove("bg-amber-500", "text-slate-950", "font-bold");
          t.classList.add("bg-slate-800", "text-slate-300");
        });
        this.classList.add("bg-amber-500", "text-slate-950", "font-bold");
        this.classList.remove("bg-slate-800", "text-slate-300");
        state.activeMockupTab = this.getAttribute("data-mockup-tab");
        renderActiveMockupContent();
      });
    });
  }

  window.openMockupModal = function(speechId) {
    var speech = window.UNAB_SPEECHES.find(function(s) { return s.id === speechId; });
    if (!speech) return;

    state.activeMockupSpeech = speech;
    // Seleccionar pestaña automática según el canal
    if (speech.channel === "email") state.activeMockupTab = "email";
    else if (speech.channel === "social") state.activeMockupTab = "instagram";
    else state.activeMockupTab = "whatsapp";

    // Actualizar botones de pestaña
    var mockupTabs = document.querySelectorAll("[data-mockup-tab]");
    mockupTabs.forEach(function(t) {
      if (t.getAttribute("data-mockup-tab") === state.activeMockupTab) {
        t.classList.add("bg-amber-500", "text-slate-950", "font-bold");
        t.classList.remove("bg-slate-800", "text-slate-300");
      } else {
        t.classList.remove("bg-amber-500", "text-slate-950", "font-bold");
        t.classList.add("bg-slate-800", "text-slate-300");
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
      container.innerHTML = `
        <div class="max-w-md mx-auto bg-[#0b141a] text-slate-100 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
          <!-- WhatsApp Header -->
          <div class="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-slate-700">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm">
                🦅
              </div>
              <div>
                <div class="text-sm font-bold text-slate-200">${escapeHtml(sender)}</div>
                <div class="text-[11px] text-emerald-400">en línea</div>
              </div>
            </div>
            <div class="text-slate-400 text-sm">⋮</div>
          </div>
          <!-- WhatsApp Chat Area -->
          <div class="p-4 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] bg-[size:16px_16px] min-h-[260px] flex flex-col justify-end">
            <div class="bg-[#005c4b] text-slate-100 rounded-2xl rounded-tr-sm p-3.5 max-w-[90%] self-end shadow-md text-xs leading-relaxed">
              <div class="whitespace-pre-wrap">${escapeHtml(textInterpolated)}</div>
              <div class="flex items-center justify-end gap-1 text-[10px] text-emerald-200 mt-1.5">
                <span>${nowTime}</span>
                <span class="text-cyan-300">✓✓</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (state.activeMockupTab === "email") {
      container.innerHTML = `
        <div class="max-w-xl mx-auto bg-slate-900 text-slate-200 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl text-xs">
          <!-- Email Client Header -->
          <div class="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-500"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span class="ml-2 font-mono text-slate-400 text-[11px]">Bandeja de Entrada • UNAB Mail</span>
            </div>
          </div>
          <!-- Email Meta -->
          <div class="p-4 bg-slate-950/80 border-b border-slate-800 space-y-2">
            <div><span class="text-slate-400 font-bold">De:</span> <span class="text-slate-200">${escapeHtml(sender)} &lt;comunicacion@unab.edu.sv&gt;</span></div>
            <div><span class="text-slate-400 font-bold">Para:</span> <span class="text-slate-300">estudiantes.${state.selectedCampus.toLowerCase().replace(/[^a-z]/g, '')}@unab.edu.sv</span></div>
            <div><span class="text-slate-400 font-bold">Asunto:</span> <span class="text-amber-300 font-semibold">${escapeHtml(subjectInterpolated || "Diagnóstico Oficial UNAB 2026")}</span></div>
          </div>
          <!-- Email Body -->
          <div class="p-6 bg-slate-900 leading-relaxed whitespace-pre-wrap text-slate-300">
            ${escapeHtml(textInterpolated)}
          </div>
        </div>
      `;
    } else if (state.activeMockupTab === "instagram") {
      container.innerHTML = `
        <div class="max-w-sm mx-auto bg-slate-950 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl text-xs">
          <!-- Instagram Header -->
          <div class="p-3 flex items-center justify-between border-b border-slate-800">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-0.5">
                <div class="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-bold text-xs">
                  🦅
                </div>
              </div>
              <div>
                <div class="font-bold text-slate-200 text-xs">unab_elsalvador</div>
                <div class="text-[10px] text-slate-400">${state.selectedCampus}</div>
              </div>
            </div>
            <span class="text-slate-400">⋯</span>
          </div>
          <!-- Instagram Simulated Media -->
          <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/40 p-6 flex flex-col items-center justify-center text-center border-y border-slate-800 min-h-[200px]">
            <div class="text-2xl mb-2">📊🏛️</div>
            <div class="font-extrabold text-amber-300 text-sm mb-1">${escapeHtml(speech.title)}</div>
            <div class="text-[11px] text-slate-300 max-w-[220px]">Tu voz transforma los planes de estudio en la UNAB</div>
            <div class="mt-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
              Enlace en Biografía 🔗
            </div>
          </div>
          <!-- Instagram Caption -->
          <div class="p-3 space-y-1.5">
            <div class="flex items-center gap-3 text-sm text-slate-300 pb-1">
              <span>❤️</span> <span>💬</span> <span>↗️</span>
            </div>
            <div class="leading-relaxed">
              <span class="font-bold text-slate-200">unab_elsalvador</span>
              <span class="text-slate-300 whitespace-pre-wrap"> ${escapeHtml(textInterpolated.substring(0, 240))}...</span>
            </div>
            <div class="text-[10px] text-slate-500 uppercase mt-1">Hace 15 minutos</div>
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

  // Controlador de Temporizador para Aula
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
          display.classList.add("text-rose-400");
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
    state.timerSeconds = 180; // 3 minutos
    renderTimerDisplay();
    var display = document.getElementById("pres-timer-display");
    if (display) display.classList.remove("text-rose-400");
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
      btn.className = "px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow";
    } else {
      btn.innerHTML = "<span>▶️</span> Iniciar 3 Minutos";
      btn.className = "px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow";
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
