# Manual de Dependencias Core (Ledger v2): `roi-academico-unab-despliegue`
> **Proyecto**: Plataforma Web de Difusión, Despliegue Comunicativo Multicanal y Recursos de Aula  
> **Repositorio Oficial**: `rsamuel91gc/roi-academico-unab-despliegue`  
> **URL Pública Canónica**: `https://rsamuel91gc.github.io/roi-academico-unab-despliegue/`  
> **Ubicación Canónica**: `C:\Users\Samuel Garcia\.gemini\antigravity\scratch\despliegue`  
> **Conversación de Origen**: `conversation://296c85dc-ae26-4ca7-bcbf-48af09f4f178`  
> **Estándar de Calidad**: Control de Calidad e Ingeniería Inquebrantables (Cero Placeholders, Cero Código Simulado, Ledger v2)

---

## 🧭 1. Tríada Epistémica y Gobernanza de Hechos
- `[G] GENERADO`: Métricas, conteo de discursos, hashes de assets, firmas de métodos y grafos de llamadas.
- `[V] VERIFICADO`: Pruebas automatizadas (integrity + E2E Playwright), validación de URLs y códigos QR.
- `[N] NARRATIVO`: Decisiones de diseño, intenciones pedagógicas, acuerdos del protocolo `/grill-me`, flujo progresivo y calibración de tiempos reales.

---

## 🗺️ 2. Mapeo de los 10 Puntos de Contacto del Ciclo de Vida

| Variable Crítica | 1. Entrada DOM | 2. Transporte DTO | 3. Validación | 4. Persistencia | 5. Lógica | 6. Vista UI | 7. Exportación | 8. Documentación | 9. Fixtures | 10. Tests Unitarios |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `selectedFaculty` | `#custom-faculty` | `filterState.faculty` | Regex / Whitelist | `localStorage` | `applyCustomizations()` | Tarjetas / Mockup | Clipboard / URL | §4.1 | `speeches_data.js` | `test_despliegue_integrity.py` |
| `selectedCampus` | `#custom-campus` | `filterState.campus` | 4 Sedes Oficiales | `localStorage` | `applyCustomizations()` | Tarjetas / Mockup | Clipboard / URL | §4.1 | `speeches_data.js` | `test_despliegue_integrity.py` |
| `senderName` | `#custom-sender` | `filterState.sender` | Sanitización HTML | `localStorage` | `applyCustomizations()` | Tarjetas / Mockup | Clipboard | §4.2 | `speeches_data.js` | `test_despliegue_integrity.py` |
| `linkMode` | `#toggle-utm-mode` | `filterState.linkMode` | Boolean (`tinyurl`/`utm`) | `localStorage` | `resolveTargetLink()` | Badge / URL Preview| Clipboard / Link | §4.3 | URLs Canónicas | `test_despliegue_e2e_playwright.py` |
| `activeChannel` | `#step-1-container .channel-card` | `state.channel` | 5 Medios Separados | `state` | Revela Paso 2 + Scroll | Módulos separados | - | §3.1 | Catálogo 22 | `test_despliegue_e2e_playwright.py` |
| `activePerspective` | `#step-2-container .persona-card` | `state.persona`| 4 Perspectivas | `state` | Revela Paso 3 + `renderSpeeches()` | Grid reactivo | - | §3.2 | Catálogo 22 | `test_despliegue_e2e_playwright.py` |
| `activeMockupTab` | `[data-mockup-tab]` | `state.activeMockupTab` | WA/Email/IG/Poster | `state` | `renderActiveMockupContent()` | Mockup Modal | SVG/PNG Download | §3.3 | Mockup Templates | `test_despliegue_e2e_playwright.py` |
| `timerSeconds` | `#timer-display` / `#timer-toggle` | `state.timerSeconds` | Integer (300 segs) | En memoria | `toggleTimer()` / `resetTimer()` | Visualizador 05:00 | Audio Beep | §3.4 | Cronómetro 5m | `test_despliegue_e2e_playwright.py` |
| `surveyDuration` | Inyectada `{tiempo}` | Constant "3 a 5 minutos" | String fijo | Inmutable | `interpolateText()` | Tarjetas / Afiches | Text / Clipboard | §1.4 | Speeches | `test_despliegue_integrity.py` |

---

## 🔀 2.1 Flujo Progresivo Secuencial Condicional

```mermaid
flowchart TD
    Config["#config-panel: Personalización Visible al Inicio (Sede, Facultad, Docente, Modo Link)"] --> P1["#step-1-container (Paso 1: ¿Por qué medio vas a compartir?)"]
    P1 -- "Click en Canal" --> P2["#step-2-container (Paso 2: ¿Quién eres tú? - Desoculta 'hidden')"]
    P2 -- "Click en Perspectiva" --> P3["#step-3-container (Paso 3: Elige tu mensaje y pulsa Copiar - Desoculta 'hidden')"]
    P3 --> Cards["22 Tarjetas con Copiado en 1 Clic y Visualizador de Afiche QR"]
```

---

## 📐 3. Grafo de Dependencias Estáticas y DAG Acíclico (§4.1)

```mermaid
graph TD
    A["speeches_data.js (Catálogo de 22 Discursos)"] --> B["app.js (Controlador Reactivo)"]
    C["assets/QR_UNAB_ROI_Academico.svg"] --> D["index.html (Fondo Blanco Luminoso)"]
    E["assets/QR_UNAB_ROI_Academico.png"] --> D
    F["assets/logo_unab.png"] --> D
    B --> D
    D --> G["Medios Separados (WhatsApp, Correo, Afiche QR, Aula, Redes)"]
    D --> H["Modal de Mockups (WA / Email / IG / Afiche con QR)"]
    D --> I["Modo Proyección Aula 16:9 (Cronómetro 5 min / 300s)"]
    D --> J["Centro de Descargas Oficiales"]
```

---

## 🛡️ 4. Matriz de Efectos Secundarios (Blast Radius) y Seguridad

1. **Aislamiento de Entorno**:
   - La web `despliegue` es 100% cliente (estática) y no realiza mutaciones POST/DELETE hacia Google Sheets.
2. **Sanitización Contra XSS**:
   - Toda entrada de usuario en la barra de personalización rápida (`#custom-sender`, `#custom-faculty`, `#custom-campus`) se escapa antes de la interpolación en el DOM mediante `escapeHtml()`.
3. **Persistencia Segura**:
   - `localStorage` se utiliza exclusivamente para recordar la última selección de sede/facultad en el navegador del usuario.
4. **Flujo Progresivo Antierrores**:
   - Evita la parálisis de decisión al no saturar al usuario con opciones antes de que defina su canal y rol emisor.

---

## 🚦 5. Pipeline de Quality Gates (G0 a G6)

- [x] **G0**: Sincronización del Ledger v2 y especificación formal aprobada.
- [ ] **G1**: Verificación de sintaxis HTML5 y JavaScript ES6 sin errores de compilación.
- [ ] **G2**: Pruebas unitarias de integridad de discursos aprobadas (`test_despliegue_integrity.py`).
- [ ] **G3**: Pruebas de integración E2E con Playwright en Desktop y Móvil (`test_despliegue_e2e_playwright.py`).
- [ ] **G4**: Auditoría Bonsái y estabilidad estática certificada (`audit_engine.py`).
- [ ] **G5**: Despliegue en producción y verificación de HTTP 200 en GitHub Pages.
- [ ] **G6**: Asentamiento final en `Bitacora_despliegue.md`.
