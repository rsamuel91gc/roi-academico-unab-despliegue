#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
test_despliegue_e2e_playwright.py
Suite de Pruebas Automatizadas E2E en Navegador Real (Chromium & Mobile Pixel 7)
Universidad Dr. Andrés Bello • Plataforma 'roi-academico-unab-despliegue'
Flujo Progresivo Secuencial (Paso 1 -> Paso 2 -> Paso 3), Purificación Fáctica,
Personalizador Superior y Temporizador de Aula de 5 Minutos (05:00)
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

    def test_01_desktop_progressive_flow_and_interactions(self):
        """Verifica el flujo progresivo secuencial, fondo blanco, personalizador visible, afiche QR y cronómetro de 5 min"""
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(viewport={"width": 1440, "height": 900})
            page = context.new_page()

            page.goto(f"{SERVER_URL}/index.html", wait_until="networkidle")
            self.assertIn("Centro de Despliegue", page.title())

            # 1. Comprobar fondo blanco luminoso
            body_bg = page.evaluate("window.getComputedStyle(document.body).backgroundColor")
            self.assertIn("rgb(248, 250, 252)", body_bg, f"El fondo del body no es blanco luminoso: {body_bg}")

            # 2. Comprobar que el Panel de Personalización Rápida está visible al inicio
            config_panel = page.locator("#config-panel")
            self.assertTrue(config_panel.is_visible(), "El panel de personalización debe estar visible arriba")

            # 3. Comprobar el Flujo Progresivo Inicial
            step1 = page.locator("#step-1-container")
            step2 = page.locator("#step-2-container")
            step3 = page.locator("#step-3-container")

            self.assertTrue(step1.is_visible(), "El Paso 1 debe ser visible al cargar")
            self.assertTrue("hidden" in (step2.get_attribute("class") or ""), "El Paso 2 debe iniciar oculto con clase hidden")
            self.assertTrue("hidden" in (step3.get_attribute("class") or ""), "El Paso 3 debe iniciar oculto con clase hidden")

            # Inicialmente no hay tarjetas de discurso renderizadas
            self.assertEqual(page.locator(".speech-card").count(), 0, "No debe haber tarjetas antes de completar el Paso 2")

            # 4. Interactuar con Paso 1: Seleccionar Canal WhatsApp
            page.click("#btn-chan-whatsapp")
            page.wait_for_timeout(300)

            # Paso 2 debe revelarse inmediatamente
            self.assertFalse("hidden" in (step2.get_attribute("class") or ""), "El Paso 2 debe revelarse tras seleccionar un canal")
            self.assertTrue("hidden" in (step3.get_attribute("class") or ""), "El Paso 3 aún debe permanecer oculto")

            # 5. Interactuar con Paso 2: Seleccionar Perspectiva Docente
            page.click("#btn-pers-docente")
            page.wait_for_timeout(300)

            # Paso 3 debe revelarse y renderizar tarjetas
            self.assertFalse("hidden" in (step3.get_attribute("class") or ""), "El Paso 3 debe revelarse tras seleccionar una perspectiva")
            cards = page.locator(".speech-card")
            card_count = cards.count()
            self.assertGreater(card_count, 0, f"Debe haber tarjetas renderizadas en el Paso 3, encontradas: {card_count}")

            # 6. Probar Personalizador Dinámico en Vivo (Facultad, Sede y Docente)
            page.select_option("#custom-faculty", "Facultad de Ciencias Económicas")
            page.wait_for_timeout(200)
            page.fill("#custom-sender", "Lic. Roberto García")
            page.wait_for_timeout(200)

            first_card_text = page.locator(".speech-card").first.inner_text()
            self.assertIn("Facultad de Ciencias Económicas", first_card_text)
            self.assertIn("Lic. Roberto García", first_card_text)

            # 7. Probar Selector Inteligente de Enlace (Toggle Modo UTM)
            toggle_utm = page.locator("#toggle-utm-mode")
            toggle_utm.set_checked(True, force=True)
            page.wait_for_timeout(200)
            badge_label = page.locator("#link-mode-label").inner_text()
            self.assertIn("Modo UTM Activo", badge_label)

            # 8. Probar Botón de Copiar Discurso y Toast Notification
            copy_btn = page.locator("[id^='btn-copy-']").first
            copy_btn.click()
            page.wait_for_timeout(300)
            toast = page.locator("#toast-notification")
            self.assertTrue(toast.is_visible(), "El toast de confirmación debe mostrarse tras copiar")

            # 9. Probar Modal de Mockup con Pestaña de Afiche Promocional con QR
            page.locator("[id^='btn-mockup-']").first.click()
            page.wait_for_selector("#mockup-modal:not(.hidden)")

            # Pestaña Afiche con QR Oficial
            page.click("#btn-tab-poster")
            page.wait_for_timeout(300)
            self.assertTrue(page.locator("text=Apunta la cámara de tu celular").is_visible())
            self.assertTrue(page.locator("text=3 a 5 minutos").first.is_visible())
            self.assertTrue(page.locator("a:has-text('Descargar PNG')").is_visible())

            # Pestaña Correo
            page.click("#btn-tab-email")
            page.wait_for_timeout(200)
            self.assertTrue(page.locator("text=Bandeja de Entrada • UNAB Mail").is_visible())

            # Pestaña Instagram
            page.click("#btn-tab-ig")
            page.wait_for_timeout(200)
            self.assertTrue(page.locator("text=unab_elsalvador").first.is_visible())

            # Pestaña WhatsApp
            page.click("#btn-tab-wa")
            page.wait_for_timeout(200)
            self.assertTrue(page.locator("text=en línea").first.is_visible())

            # Cerrar Modal de Mockup
            page.click("#btn-close-mockup")
            page.wait_for_timeout(200)
            self.assertTrue(page.locator("#mockup-modal").is_hidden())

            # 10. Probar Modo Proyección en Aula (16:9 con Temporizador calibrado a 5 minutos)
            page.click("button:has-text('Modo Aula 16:9')")
            page.wait_for_selector("#presentation-modal:not(.hidden)")
            self.assertTrue(page.locator("#pres-timer-display").is_visible())
            initial_timer = page.locator("#pres-timer-display").inner_text()
            self.assertEqual(initial_timer, "05:00", f"El cronómetro inicial debe ser 05:00, mostró: {initial_timer}")

            # Iniciar temporizador (debe pasar de 05:00 a 04:59)
            page.click("#pres-timer-toggle")
            page.wait_for_timeout(1200) # Dejar correr 1 segundo
            timer_text = page.locator("#pres-timer-display").inner_text()
            self.assertEqual(timer_text, "04:59", f"El temporizador no decreció a 04:59, mostró: {timer_text}")

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
        """Verifica la renderización responsiva y flujo progresivo en emulador móvil Pixel 7"""
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            pixel7 = p.devices["Pixel 7"]
            context = browser.new_context(**pixel7)
            page = context.new_page()

            page.goto(f"{SERVER_URL}/index.html", wait_until="networkidle")

            # Activar Paso 1 y Paso 2 en móvil
            page.click("#btn-chan-whatsapp")
            page.wait_for_timeout(300)
            page.click("#btn-pers-docente")
            page.wait_for_timeout(300)

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
