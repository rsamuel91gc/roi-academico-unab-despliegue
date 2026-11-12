#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
serve_despliegue.py
Servidor HTTP local de desarrollo para la plataforma 'despliegue'
Universidad Dr. Andrés Bello (UNAB) • Puerto por defecto: 8090
"""

import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8090
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class DespliegueHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        # Desactivar caché local para desarrollo ágil
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

def run_server():
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, DespliegueHandler)
    print(f"🚀 Servidor Local 'despliegue' activo en: http://localhost:{PORT}")
    print(f"📁 Directorio Raíz: {BASE_DIR}")
    print("Presiona Ctrl+C para detener el servidor.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido.")
        httpd.server_close()

if __name__ == "__main__":
    run_server()
