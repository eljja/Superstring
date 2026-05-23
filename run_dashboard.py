#!/usr/bin/env python
"""
Helper script to start a local HTTP server and open the Superstring Dashboard in the default browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print(f"Starting server for directory: {DIRECTORY}")
    
    # Try starting server
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Superstring Dashboard running at: http://localhost:{PORT}")
            print("Press Ctrl+C to stop the server.")
            
            # Automatically open the web browser
            webbrowser.open(f"http://localhost:{PORT}")
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        sys.exit(0)
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    start_server()
