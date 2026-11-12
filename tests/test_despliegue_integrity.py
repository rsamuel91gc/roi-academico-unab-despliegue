#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
test_despliegue_integrity.py
Suite de Pruebas Unitarias e Integridad Estática de la Web 'despliegue'
Universidad Dr. Andrés Bello (UNAB) • Estándar: Cero Placeholders
"""

import os
import re
import unittest

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_PATH = os.path.join(BASE_DIR, "index.html")
SPEECHES_PATH = os.path.join(BASE_DIR, "js", "speeches_data.js")
APP_PATH = os.path.join(BASE_DIR, "js", "app.js")
ASSETS_DIR = os.path.join(BASE_DIR, "assets")

class TestDespliegueIntegrity(unittest.TestCase):

    def setUp(self):
        self.assertTrue(os.path.exists(BASE_DIR), f"Directorio base no encontrado: {BASE_DIR}")

    def test_01_assets_exist_and_valid(self):
        """Verifica que los assets vectoriales y gráficos existan y tengan tamaño mayor a 10KB"""
        required_assets = [
            "QR_UNAB_ROI_Academico.svg",
            "QR_UNAB_ROI_Academico.png",
            "logo_unab.png"
        ]
        for asset in required_assets:
            path = os.path.join(ASSETS_DIR, asset)
            self.assertTrue(os.path.exists(path), f"Asset faltante: {asset}")
            size = os.path.getsize(path)
            self.assertGreater(size, 10240, f"Asset {asset} es demasiado pequeño ({size} bytes)")

    def test_02_speeches_catalog_structure(self):
        """Verifica que el catálogo de discursos contenga al menos 20 discursos completos y estructurados"""
        self.assertTrue(os.path.exists(SPEECHES_PATH), f"No existe {SPEECHES_PATH}")
        with open(SPEECHES_PATH, "r", encoding="utf-8") as f:
            content = f.read()

        # Conteo de discursos mediante ids
        speech_ids = re.findall(r'id:\s*["\']([^"\']+)["\']', content)
        self.assertGreaterEqual(len(speech_ids), 20, f"Se esperaban >= 20 discursos, encontrados: {len(speech_ids)}")

        # Verificación de unicidad de IDs
        self.assertEqual(len(speech_ids), len(set(speech_ids)), "Existen IDs duplicados en el catálogo de discursos")

    def test_03_all_perspectives_covered(self):
        """Verifica que las 5 perspectivas estén presentes en el catálogo"""
        with open(SPEECHES_PATH, "r", encoding="utf-8") as f:
            content = f.read()

        required_perspectives = [
            "institucional",
            "docente",
            "estudiante",
            "egresado",
            "investigacion"
        ]
        for p in required_perspectives:
            self.assertIn(f'perspective: "{p}"', content, f"Falta perspectiva requerida: {p}")

    def test_04_all_channels_covered(self):
        """Verifica que los 6 canales comunicativos estén presentes en el catálogo"""
        with open(SPEECHES_PATH, "r", encoding="utf-8") as f:
            content = f.read()

        required_channels = [
            "email",
            "whatsapp",
            "speech",
            "social",
            "lms",
            "print"
        ]
        for c in required_channels:
            self.assertIn(f'channel: "{c}"', content, f"Falta canal requerido: {c}")

    def test_05_no_unresolved_placeholders(self):
        """Verifica que no existan placeholders rotos, TODOs o textos simulados"""
        with open(SPEECHES_PATH, "r", encoding="utf-8") as f:
            content = f.read()

        forbidden_patterns = [
            r"\[TODO",
            r"\[placeholder",
            r"\[inserte",
            r"lorem ipsum",
            r"texto de ejemplo",
            r"AQUÍ_ID"
        ]
        for pat in forbidden_patterns:
            matches = re.findall(pat, content, re.IGNORECASE)
            self.assertEqual(len(matches), 0, f"Se encontraron textos simulados o incompletos con patrón '{pat}': {matches}")

    def test_06_index_html_contracts(self):
        """Verifica que index.html contenga los selectores y scripts requeridos"""
        self.assertTrue(os.path.exists(INDEX_PATH), f"No existe {INDEX_PATH}")
        with open(INDEX_PATH, "r", encoding="utf-8") as f:
            html = f.read()

        required_ids = [
            'id="custom-faculty"',
            'id="custom-campus"',
            'id="custom-sender"',
            'id="toggle-utm-mode"',
            'id="search-speeches"',
            'id="speeches-container"',
            'id="mockup-modal"',
            'id="btn-tab-poster"',
            'id="presentation-modal"',
            'id="toast-notification"',
            'id="pres-timer-display"'
        ]
        for req_id in required_ids:
            self.assertIn(req_id, html, f"ID de DOM obligatorio faltante en index.html: {req_id}")

        self.assertIn('src="js/speeches_data.js"', html, "Falta script speeches_data.js en index.html")
        self.assertIn('src="js/app.js"', html, "Falta script app.js en index.html")

    def test_07_app_js_security_and_clipboard(self):
        """Verifica que app.js contenga escapeHtml, clipboard writeText y temporizador"""
        self.assertTrue(os.path.exists(APP_PATH), f"No existe {APP_PATH}")
        with open(APP_PATH, "r", encoding="utf-8") as f:
            js = f.read()

        self.assertIn("escapeHtml", js, "Falta función de sanitización escapeHtml en app.js")
        self.assertIn("clipboard.writeText", js, "Falta API de portapapeles en app.js")
        self.assertIn("openPresentationMode", js, "Falta Modo Proyección en app.js")
        self.assertIn("openMockupModal", js, "Falta Modo Mockup en app.js")
        self.assertIn("tinyurl.com/roi-academico-unabsv", js, "Falta URL corta canónica en app.js")
        self.assertIn("3 a 5 minutos", js, "Falta calibración de duración a 3 a 5 minutos en app.js")


if __name__ == "__main__":
    unittest.main()
