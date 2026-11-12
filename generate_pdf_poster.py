#!/usr/bin/env python3
"""
generate_pdf_poster.py
Genera los afiches promocionales oficiales de la UNAB en formato PDF print-ready:
1. Tamaño Carta (US Letter: 8.5 x 11 pulgadas / 215.9 x 279.4 mm) - EXACTAMENTE 1 PÁGINA.
2. Tamaño 4x6 Pulgadas (101.6 x 152.4 mm) - FORMATO VOLANTE / POSTAL / MANO A MANO - EXACTAMENTE 1 PÁGINA.
3. Renders rasterizados en PNG a 300 DPI de ambos formatos para previsualización y redes sociales.
Verifica con pypdf que el número de páginas de cada PDF sea estrictamente 1.
"""

import os
import sys
import base64
import pypdf
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(BASE_DIR, "assets")

# Archivos de salida
PDF_CARTA_CANONICO = os.path.join(ASSETS_DIR, "Afiche_Promocional_UNAB_ROI.pdf")
PDF_CARTA_ALIAS = os.path.join(ASSETS_DIR, "Afiche_Promocional_UNAB_ROI_Carta.pdf")
PNG_CARTA = os.path.join(ASSETS_DIR, "Afiche_Promocional_UNAB_ROI_Carta.png")

PDF_4X6 = os.path.join(ASSETS_DIR, "Afiche_Promocional_UNAB_ROI_4x6.pdf")
PNG_4X6 = os.path.join(ASSETS_DIR, "Afiche_Promocional_UNAB_ROI_4x6.png")

TEMP_HTML_CARTA = os.path.join(BASE_DIR, "temp_afiche_carta.html")
TEMP_HTML_4X6 = os.path.join(BASE_DIR, "temp_afiche_4x6.html")

# 1. Cargar QR en Base64
qr_path = os.path.join(ASSETS_DIR, "QR_UNAB_ROI_Academico.png")
if not os.path.exists(qr_path):
    qr_path = os.path.join(ASSETS_DIR, "QR_UNAB_Despliegue.png")

with open(qr_path, "rb") as f:
    qr_base64 = base64.b64encode(f.read()).decode("utf-8")

# 2. Cargar Logo UNAB en Base64
logo_path = os.path.join(ASSETS_DIR, "logo_unab.png")
logo_base64 = ""
if os.path.exists(logo_path):
    with open(logo_path, "rb") as f:
        logo_base64 = base64.b64encode(f.read()).decode("utf-8")

# ==============================================================================
# PLANTILLA 1: TAMAÑO CARTA (US LETTER: 8.5 x 11 pulgadas)
# ==============================================================================
html_carta = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Afiche Promocional UNAB 2026 - Tamaño Carta</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 0;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      width: 8.5in;
      height: 11in;
      max-height: 11in;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f8fafc;
      color: #0f172a;
    }}
    .page-wrapper {{
      width: 8.5in;
      height: 11in;
      max-height: 11in;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      background: #f8fafc;
    }}
    .header {{
      background: linear-gradient(135deg, #1e3a8a 0%, #172554 100%);
      color: #ffffff;
      padding: 16mm 16mm 14mm 16mm;
      border-bottom: 5px solid #f59e0b;
    }}
    .header-badge {{
      display: inline-block;
      background: rgba(245, 158, 11, 0.25);
      border: 1px solid #f59e0b;
      color: #fbbf24;
      font-size: 10pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding: 4px 14px;
      border-radius: 9999px;
      margin-bottom: 8px;
    }}
    .header h1 {{
      margin: 0 0 6px 0;
      font-size: 22pt;
      font-weight: 900;
      line-height: 1.18;
      letter-spacing: -0.5px;
      color: #ffffff;
    }}
    .header p {{
      margin: 0;
      font-size: 11.5pt;
      color: #93c5fd;
      font-weight: 500;
    }}
    .content {{
      padding: 6mm 16mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex-grow: 1;
      justify-content: space-evenly;
    }}
    .intro-box {{
      max-width: 175mm;
      font-size: 11.5pt;
      line-height: 1.45;
      color: #334155;
    }}
    .intro-box strong {{
      color: #1e3a8a;
    }}
    .qr-card {{
      background: #ffffff;
      border: 3px solid #1e3a8a;
      border-radius: 18px;
      padding: 14px 24px;
      box-shadow: 0 8px 20px -4px rgba(30, 58, 138, 0.15);
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      margin: 4px 0;
    }}
    .qr-img {{
      width: 62mm;
      height: 62mm;
      object-fit: contain;
    }}
    .qr-caption {{
      margin-top: 8px;
      font-size: 11pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }}
    .short-link {{
      font-size: 13pt;
      font-weight: 800;
      color: #2563eb;
      background: #eff6ff;
      border: 1px dashed #93c5fd;
      padding: 5px 16px;
      border-radius: 10px;
      margin-top: 6px;
      font-family: monospace;
    }}
    .features-grid {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10mm;
      width: 100%;
      max-width: 175mm;
    }}
    .feature-item {{
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 10px 8px;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }}
    .feature-icon {{
      font-size: 18pt;
      margin-bottom: 3px;
    }}
    .feature-title {{
      font-size: 10pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
    }}
    .feature-sub {{
      font-size: 8.5pt;
      color: #64748b;
      line-height: 1.25;
    }}
    .footer {{
      background: #0f172a;
      color: #94a3b8;
      padding: 7mm 16mm;
      border-top: 3px solid #1e3a8a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9pt;
    }}
    .footer-brand {{
      font-weight: 700;
      color: #ffffff;
      font-size: 9.5pt;
    }}
  </style>
</head>
<body>
  <div class="page-wrapper">
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
        <div>San Salvador • Sonsonate • Chalatenango • San Miguel</div>
      </div>
      <div style="text-align: right; font-weight: 700; color: #f59e0b;">
        Ejercicio Académico 2026
      </div>
    </div>
  </div>
</body>
</html>
"""

# ==============================================================================
# PLANTILLA 2: TAMAÑO 4x6 PULGADAS (VOLANTE / POSTAL / MANO A MANO)
# ==============================================================================
html_4x6 = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Afiche UNAB 4x6 Pulgadas</title>
  <style>
    @page {{
      size: 4in 6in;
      margin: 0;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      width: 4in;
      height: 6in;
      max-height: 6in;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f8fafc;
      color: #0f172a;
    }}
    .page-wrapper {{
      width: 4in;
      height: 6in;
      max-height: 6in;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      background: #f8fafc;
    }}
    .header {{
      background: linear-gradient(135deg, #1e3a8a 0%, #172554 100%);
      color: #ffffff;
      padding: 3.5mm 4mm 3mm 4mm;
      border-bottom: 3px solid #f59e0b;
      text-align: center;
    }}
    .header-badge {{
      display: inline-block;
      background: rgba(245, 158, 11, 0.25);
      border: 1px solid #f59e0b;
      color: #fbbf24;
      font-size: 6.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 2px 8px;
      border-radius: 9999px;
      margin-bottom: 4px;
    }}
    .header h1 {{
      margin: 0 0 3px 0;
      font-size: 10.5pt;
      font-weight: 900;
      line-height: 1.18;
      letter-spacing: -0.3px;
      color: #ffffff;
    }}
    .header p {{
      margin: 0;
      font-size: 6.8pt;
      color: #93c5fd;
      font-weight: 500;
    }}
    .content {{
      padding: 2.5mm 3.5mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex-grow: 1;
      justify-content: space-evenly;
    }}
    .intro-callout {{
      font-size: 6.8pt;
      line-height: 1.35;
      color: #334155;
      max-width: 92mm;
    }}
    .intro-callout strong {{
      color: #1e3a8a;
    }}
    .qr-card {{
      background: #ffffff;
      border: 2px solid #1e3a8a;
      border-radius: 12px;
      padding: 6px 12px;
      box-shadow: 0 4px 12px -2px rgba(30, 58, 138, 0.15);
      display: inline-flex;
      flex-direction: column;
      align-items: center;
    }}
    .qr-img {{
      width: 42mm;
      height: 42mm;
      object-fit: contain;
    }}
    .qr-caption {{
      margin-top: 4px;
      font-size: 7.2pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}
    .short-link {{
      font-size: 8pt;
      font-weight: 800;
      color: #2563eb;
      background: #eff6ff;
      border: 1px dashed #93c5fd;
      padding: 2px 8px;
      border-radius: 6px;
      margin-top: 3px;
      font-family: monospace;
    }}
    .features-row {{
      display: flex;
      gap: 4px;
      width: 100%;
      max-width: 95mm;
      justify-content: space-between;
    }}
    .feature-pill {{
      flex: 1;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 4px 2px;
      text-align: center;
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.04);
    }}
    .feature-pill-icon {{
      font-size: 9pt;
      margin-bottom: 1px;
    }}
    .feature-pill-title {{
      font-size: 6.2pt;
      font-weight: 800;
      color: #0f172a;
    }}
    .feature-pill-sub {{
      font-size: 5.2pt;
      color: #64748b;
      line-height: 1.15;
    }}
    .footer {{
      background: #0f172a;
      color: #94a3b8;
      padding: 2.5mm 4mm;
      border-top: 2px solid #1e3a8a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6pt;
    }}
    .footer-brand {{
      font-weight: 700;
      color: #ffffff;
    }}
  </style>
</head>
<body>
  <div class="page-wrapper">
    <div class="header">
      <div class="header-badge">Investigación Oficial • UNAB 2026</div>
      <h1>¿Las materias de tu carrera te preparan para el trabajo?</h1>
      <p>Estudio de Pertinencia Curricular y Retorno Formativo</p>
    </div>

    <div class="content">
      <div class="intro-callout">
        Tu opinión objetiva calibra los planes de estudio en las <strong>5 Facultades y 4 Sedes de la UNAB</strong>.
      </div>

      <div class="qr-card">
        <img src="data:image/png;base64,{qr_base64}" class="qr-img" alt="Código QR Encuesta UNAB">
        <div class="qr-caption">📷 Escanea con tu celular</div>
        <div class="short-link">tinyurl.com/roi-academico-unabsv</div>
      </div>

      <div class="features-row">
        <div class="feature-pill">
          <div class="feature-pill-icon">🔒</div>
          <div class="feature-pill-title">100% Anónimo</div>
          <div class="feature-pill-sub">Sin nombres ni carné</div>
        </div>
        <div class="feature-pill">
          <div class="feature-pill-icon">⏱️</div>
          <div class="feature-pill-title">3-5 Minutos</div>
          <div class="feature-pill-sub">Ágil y en tu móvil</div>
        </div>
        <div class="feature-pill">
          <div class="feature-pill-icon">📜</div>
          <div class="feature-pill-title">Constancia</div>
          <div class="feature-pill-sub">Sello SHA-256</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div>
        <div class="footer-brand">Universidad Dr. Andrés Bello • El Salvador</div>
      </div>
      <div style="text-align: right; font-weight: 700; color: #f59e0b;">
        UNAB 2026
      </div>
    </div>
  </div>
</body>
</html>
"""

# Guardar archivos temporales HTML
with open(TEMP_HTML_CARTA, "w", encoding="utf-8") as f:
    f.write(html_carta)

with open(TEMP_HTML_4X6, "w", encoding="utf-8") as f:
    f.write(html_4x6)

print(f"[PASO 1] Plantillas HTML generadas.")

with sync_playwright() as p:
    browser = p.chromium.launch()

    # 1. Renderizar Afiche Tamaño Carta (Letter)
    page_carta = browser.new_page(viewport={"width": 816, "height": 1056}, device_scale_factor=2)
    page_carta.goto(f"file:///{TEMP_HTML_CARTA.replace(os.sep, '/')}")
    page_carta.wait_for_load_state("networkidle")

    # Render PDF Carta
    page_carta.pdf(
        path=PDF_CARTA_CANONICO,
        format="Letter",
        print_background=True,
        margin={"top": "0", "right": "0", "bottom": "0", "left": "0"}
    )
    # Copiar también como alias explícito
    with open(PDF_CARTA_CANONICO, "rb") as src, open(PDF_CARTA_ALIAS, "wb") as dst:
        dst.write(src.read())

    # Render Screenshot PNG Carta
    page_carta.screenshot(path=PNG_CARTA, full_page=True)
    page_carta.close()

    # 2. Renderizar Afiche Tamaño 4x6 Pulgadas
    page_4x6 = browser.new_page(viewport={"width": 400, "height": 600}, device_scale_factor=3)
    page_4x6.goto(f"file:///{TEMP_HTML_4X6.replace(os.sep, '/')}")
    page_4x6.wait_for_load_state("networkidle")

    # Render PDF 4x6 Pulgadas
    page_4x6.pdf(
        path=PDF_4X6,
        width="4in",
        height="6in",
        print_background=True,
        margin={"top": "0", "right": "0", "bottom": "0", "left": "0"}
    )

    # Render Screenshot PNG 4x6
    page_4x6.screenshot(path=PNG_4X6, full_page=True)
    page_4x6.close()

    browser.close()

# Limpiar temporales
if os.path.exists(TEMP_HTML_CARTA):
    os.remove(TEMP_HTML_CARTA)
if os.path.exists(TEMP_HTML_4X6):
    os.remove(TEMP_HTML_4X6)

# ==============================================================================
# VERIFICACIÓN DE CONTROL DE CALIDAD ESTRICTO: EXACTAMENTE 1 PÁGINA
# ==============================================================================
reader_carta = pypdf.PdfReader(PDF_CARTA_CANONICO)
reader_4x6 = pypdf.PdfReader(PDF_4X6)

pages_carta = len(reader_carta.pages)
pages_4x6 = len(reader_4x6.pages)

print(f"[VERIFICACIÓN] Afiche Carta páginas: {pages_carta} (Esperado: 1) -> Tamaño: {os.path.getsize(PDF_CARTA_CANONICO):,} bytes")
print(f"[VERIFICACIÓN] Afiche 4x6 páginas:   {pages_4x6} (Esperado: 1) -> Tamaño: {os.path.getsize(PDF_4X6):,} bytes")

if pages_carta != 1:
    raise AssertionError(f"ERROR CRÍTICO: El afiche Carta tiene {pages_carta} páginas en lugar de 1.")

if pages_4x6 != 1:
    raise AssertionError(f"ERROR CRÍTICO: El afiche 4x6 tiene {pages_4x6} páginas en lugar de 1.")

print("[ÉXITO TOTAL] Ambos afiches fueron generados estrictamente en 1 SOLA PÁGINA.")
