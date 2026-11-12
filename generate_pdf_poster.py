#!/usr/bin/env python3
"""
generate_pdf_poster.py
Genera el afiche promocional oficial de la UNAB en formato PDF A4 de alta fidelidad para imprenta.
Utiliza Playwright headless Chromium para rasterizar el layout vectorizado con CSS print-ready.
"""

import os
import base64
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(BASE_DIR, "assets")
OUTPUT_PDF = os.path.join(ASSETS_DIR, "Afiche_Promocional_UNAB_ROI.pdf")
TEMP_HTML = os.path.join(BASE_DIR, "temp_afiche_a4.html")

# Cargar QR en Base64 para garantizar renderizado inmediato offline
qr_path = os.path.join(ASSETS_DIR, "QR_UNAB_ROI_Academico.png")
if not os.path.exists(qr_path):
    qr_path = os.path.join(ASSETS_DIR, "QR_UNAB_Despliegue.png")

with open(qr_path, "rb") as f:
    qr_base64 = base64.b64encode(f.read()).decode("utf-8")

# Cargar Logo en Base64 si existe
logo_path = os.path.join(ASSETS_DIR, "logo_unab.png")
logo_base64 = ""
if os.path.exists(logo_path):
    with open(logo_path, "rb") as f:
        logo_base64 = base64.b64encode(f.read()).decode("utf-8")

html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Afiche Promocional UNAB 2026</title>
  <style>
    @page {{
      size: A4 portrait;
      margin: 0;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    body {{
      margin: 0;
      padding: 0;
      width: 210mm;
      height: 297mm;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}
    .header {{
      background: linear-gradient(135deg, #1e3a8a 0%, #172554 100%);
      color: #ffffff;
      padding: 24mm 16mm 18mm 16mm;
      border-bottom: 6px solid #f59e0b;
      position: relative;
    }}
    .header-badge {{
      display: inline-block;
      background: rgba(245, 158, 11, 0.2);
      border: 1px solid #f59e0b;
      color: #fbbf24;
      font-size: 11pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding: 4px 14px;
      border-radius: 9999px;
      margin-bottom: 10px;
    }}
    .header h1 {{
      margin: 0 0 8px 0;
      font-size: 26pt;
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -0.5px;
      color: #ffffff;
    }}
    .header p {{
      margin: 0;
      font-size: 13pt;
      color: #93c5fd;
      font-weight: 500;
    }}
    .content {{
      padding: 12mm 18mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex-grow: 1;
      justify-content: space-around;
    }}
    .intro-box {{
      max-width: 170mm;
      font-size: 13pt;
      line-height: 1.5;
      color: #334155;
    }}
    .intro-box strong {{
      color: #1e3a8a;
    }}
    .qr-card {{
      background: #ffffff;
      border: 3px solid #1e3a8a;
      border-radius: 20px;
      padding: 18px 24px;
      box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.15);
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 0;
    }}
    .qr-img {{
      width: 75mm;
      height: 75mm;
      object-fit: contain;
    }}
    .qr-caption {{
      margin-top: 10px;
      font-size: 12pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 1px;
    }}
    .short-link {{
      font-size: 14pt;
      font-weight: 800;
      color: #2563eb;
      background: #eff6ff;
      border: 1px dashed #93c5fd;
      padding: 6px 18px;
      border-radius: 12px;
      margin-top: 8px;
      font-family: monospace;
    }}
    .features-grid {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12mm;
      width: 100%;
      max-width: 175mm;
      margin-top: 8px;
    }}
    .feature-item {{
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 12px 10px;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }}
    .feature-icon {{
      font-size: 20pt;
      margin-bottom: 4px;
    }}
    .feature-title {{
      font-size: 11pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
    }}
    .feature-sub {{
      font-size: 9.5pt;
      color: #64748b;
    }}
    .footer {{
      background: #0f172a;
      color: #94a3b8;
      padding: 10mm 16mm;
      border-top: 4px solid #1e3a8a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9.5pt;
    }}
    .footer-brand {{
      font-weight: 700;
      color: #ffffff;
    }}
  </style>
</head>
<body>

  <div class="header">
    <div class="header-badge">Investigación Académica Oficial • UNAB 2026</div>
    <h1>¿Las materias de tu carrera te preparan para el mercado laboral?</h1>
    <p>Estudio de Diagnóstico sobre Utilidad Curricular, Autoeficacia y Retorno de Inversión Formativo</p>
  </div>

  <div class="content">
    <div class="intro-box">
      Tu valoración objetiva es el motor para calibrar la pertinencia de los planes de estudio y las herramientas de aprendizaje en las <strong>5 Facultades y 4 Sedes Regionales de la Universidad Dr. Andrés Bello</strong>.
    </div>

    <div class="qr-card">
      <img src="data:image/png;base64,{qr_base64}" class="qr-img" alt="Código QR Encuesta UNAB">
      <div class="qr-caption">📷 Escanea este código con tu celular</div>
      <div class="short-link">tinyurl.com/roi-academico-unabsv</div>
    </div>

    <div class="features-grid">
      <div class="feature-item">
        <div class="feature-icon">🔒</div>
        <div class="feature-title">100% Anónimo</div>
        <div class="feature-sub">Sin nombres, carné ni correos. Datos cifrados y protegidos.</div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">⏱️</div>
        <div class="feature-title">3 a 5 Minutos</div>
        <div class="feature-sub">6 secciones intuitivas optimizadas para celular.</div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">📜</div>
        <div class="feature-title">Constancia Digital</div>
        <div class="feature-sub">Comprobante de participación con sello SHA-256.</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div>
      <div class="footer-brand">Universidad Dr. Andrés Bello • El Salvador</div>
      <div>Dirección de Investigación y Proyección Social • San Salvador • Sonsonate • Chalatenango • San Miguel</div>
    </div>
    <div style="text-align: right; font-weight: 700; color: #f59e0b;">
      Ejercicio Académico 2026
    </div>
  </div>

</body>
</html>
"""

with open(TEMP_HTML, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"[PASO 1] Plantilla HTML temporal generada: {TEMP_HTML}")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f"file:///{TEMP_HTML.replace(os.sep, '/')}")
    page.wait_for_load_state("networkidle")
    page.pdf(
        path=OUTPUT_PDF,
        format="A4",
        print_background=True,
        margin={"top": "0", "right": "0", "bottom": "0", "left": "0"}
    )
    browser.close()

if os.path.exists(TEMP_HTML):
    os.remove(TEMP_HTML)

print(f"[OK] Afiche PDF oficial generado exitosamente: {OUTPUT_PDF} ({os.path.getsize(OUTPUT_PDF):,} bytes)")
