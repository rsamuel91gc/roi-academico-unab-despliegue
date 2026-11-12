#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
test_despliegue_e2e_playwright.py
Suite de Pruebas Automatizadas E2E en Navegador Real (Chromium & Mobile Pixel 7)
Universidad Dr. Andrés Bello • Plataforma 'roi-academico-unab-despliegue'
"""

import os
import sys
import time
import threading
import unittest
from http.server import HTTPServer
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)
from serve_despliegue import DespliegueHandler

TEST_PORT = 8092
SERVER_URL = f"http://127.0.0.1:{TEST_PORT}"
BRAIN_DIR = r"C:\Users\Samuel Garcia\.gemini\antigravity\brain\296c85dc-ae26-4ca7-bcbf-48af09f4f178"

class TestDespliegueE2E(unittest.TestCase):
    server = None
    server_thread = None

    @classmethod
    def setUpClass(cls):
        # Levantar servidor de pruebas en segundo plano
        cls.server = HTTPServer(("127.0.0.1", TEST_PORT), DespliegueHandler)
        cls.server_thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.server_thread.start()
        time.sleep(0.5)

    @classmethod
    def tearDownClass(cls):
        if cls.server:
            cls.server.shutdown()
            cls.server.server_close()

    def test_01_desktop_full_interactions(self):
        """Verifica el flujo interactivo completo en escritorio: filtros, personalizador, mockups y modo aula"""
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(viewport={"width": 1440, "height": 900})
            page = context.new_page()

            page.goto(f"{SERVER_URL}/index.html", wait_until="networkidle")
            self.assertIn("Centro de Despliegue", page.title())

            # 1. Comprobar que hay tarjetas renderizadas
            cards = page.locator(".speech-card")
            card_count = cards.count()
            self.assertGreaterEqual(card_count, 20, f"Se esperaban >= 20 tarjetas, encontradas: {card_count}")

            # 2. Probar Filtro de Perspectiva (Docente)
            page.click('[data-filter-perspective="docente"]')
            page.wait_for_timeout(300)
            docente_cards = page.locator(".speech-card")
            self.assertGreater(docente_cards.count(), 0)
            self.assertLess(docente_cards.count(), card_count)

            # 3. Probar Personalizador Dinámico en Vivo (Cambiar Facultad)
            page.select_option("#custom-faculty", "Facultad de Ciencias Económicas")
            page.wait_for_timeout(200)
            first_card_text = page.locator(".speech-card").first.inner_text()
            self.assertIn("Facultad de Ciencias Económicas", first_card_text)

            # 4. Probar Selector Inteligente de Enlace (Toggle Modo UTM)
            toggle_utm = page.locator("#toggle-utm-mode")
            toggle_utm.set_checked(True, force=True)
            page.wait_for_timeout(200)
            badge_label = page.locator("#link-mode-label").inner_text()
            self.assertIn("Modo UTM Activo", badge_label)

            # 5. Probar Modal de Mockup
            page.locator(".speech-card button:has-text('Mockup')").first.click()
            page.wait_for_selector("#mockup-modal:not(.hidden)")
            
            # Pestaña Correo
            page.click('[data-mockup-tab="email"]')
            page.wait_for_timeout(200)
            self.assertTrue(page.locator("text=Bandeja de Entrada • UNAB Mail").is_visible())

            # Pestaña Instagram
            page.click('[data-mockup-tab="instagram"]')
            page.wait_for_timeout(200)
            self.assertTrue(page.locator("text=unab_elsalvador").first.is_visible())

            # Cerrar Modal
            page.click("#btn-close-mockup")
            page.wait_for_timeout(200)
            self.assertTrue(page.locator("#mockup-modal").is_hidden())

            # 6. Probar Modo Proyección en Aula (16:9 Fullscreen con Temporizador)
            page.click("button:has-text('Modo Aula 16:9')")
            page.wait_for_selector("#presentation-modal:not(.hidden)")
            self.assertTrue(page.locator("#pres-title").is_visible())
            self.assertTrue(page.locator("#pres-timer-display").is_visible())

            # Iniciar temporizador
            page.click("#pres-timer-toggle")
            page.wait_for_timeout(1100) # Dejar correr 1 segundo
            timer_text = page.locator("#pres-timer-display").inner_text()
            self.assertEqual(timer_text, "02:59", f"El temporizador no decreció a 02:59, mostró: {timer_text}")

            # Salir de Modo Aula
            page.click("#btn-close-presentation")
            page.wait_for_timeout(200)
            self.assertTrue(page.locator("#presentation-modal").is_hidden())

            # Captura de Pantalla Desktop de Alta Fidelidad
            screenshot_path = os.path.join(BRAIN_DIR, "verified_despliegue_desktop.png")
            page.screenshot(path=screenshot_path, full_page=True)
            self.assertTrue(os.path.exists(screenshot_path))
            print(f"[OK] Captura Desktop guardada en: {screenshot_path}")

            browser.close()

    def test_02_mobile_pixel7_responsiveness(self):
        """Verifica la renderización en emulador móvil Pixel 7"""
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            # Emulación Pixel 7
            pixel7 = p.devices["Pixel 7"]
            context = browser.new_context(**pixel7)
            page = context.new_page()

            page.goto(f"{SERVER_URL}/index.html", wait_until="networkidle")
            page.wait_for_selector(".speech-card")

            # Comprobar que no hay desbordamiento horizontal en el body
            body_scroll_width = page.evaluate("document.body.scrollWidth")
            viewport_width = page.evaluate("window.innerWidth")
            self.assertLessEqual(body_scroll_width, viewport_width + 2, "Existe desbordamiento horizontal en móvil")

            # Captura de Pantalla Móvil Pixel 7
            screenshot_path = os.path.join(BRAIN_DIR, "verified_despliegue_mobile_pixel7.png")
            page.screenshot(path=screenshot_path, full_page=False)
            self.assertTrue(os.path.exists(screenshot_path))
            print(f"[OK] Captura Móvil Pixel 7 guardada en: {screenshot_path}")

            browser.close()

if __name__ == "__main__":
    unittest.main()
