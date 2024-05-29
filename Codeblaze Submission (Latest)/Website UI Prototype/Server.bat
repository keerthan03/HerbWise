@echo off
start python -m http.server
timeout 1
start python app.py
timeout 1
start http://localhost:8000/Home.html
timeout 1
start http://127.0.0.1:5000
