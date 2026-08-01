"""
DATA AI STUDIO - Local Flask Web Application
Standalone entry point for local Python execution: python app.py
"""

import os
import sys

# Ensure backend directory is accessible
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from backend.app import (
    get_system_status,
    get_dataset_list,
    get_dataset_details,
    process_uploaded_csv,
    generate_local_chart,
    clear_temporary_data
)

try:
    from flask import Flask, request, jsonify, render_template, send_from_directory
    app = Flask(__name__, static_folder="dist", template_folder="dist")

    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify(get_system_status())

    @app.route("/api/datasets", methods=["GET"])
    def datasets():
        return jsonify({"datasets": get_dataset_list()})

    @app.route("/api/datasets/<dataset_id>", methods=["GET"])
    def dataset(dataset_id):
        data = get_dataset_details(dataset_id)
        if "error" in data:
            return jsonify(data), 404
        return jsonify(data)

    @app.route("/api/upload", methods=["POST"])
    def upload():
        payload = request.get_json(silent=True) or {}
        filename = payload.get("filename", "uploaded.csv")
        content = payload.get("content", "")
        res = process_uploaded_csv(filename, content)
        if "error" in res:
            return jsonify(res), 400
        return jsonify(res)

    @app.route("/api/chart", methods=["POST"])
    def chart():
        payload = request.get_json(silent=True) or {}
        res = generate_local_chart(payload)
        return jsonify(res)

    @app.route("/api/clear_temp", methods=["POST"])
    def clear_temp():
        return jsonify(clear_temporary_data())

    @app.errorhandler(404)
    def not_found(e):
        from flask import request
        if request.path.startswith("/api/"):
            return jsonify({"error": "API endpoint not found"}), 404
        return send_from_directory(app.static_folder, "index.html")

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def catch_all(path):
        if path.startswith("api/"):
            return jsonify({"error": "API endpoint not found"}), 404
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")

    if __name__ == "__main__":
        port = int(os.environ.get("PORT", 3000))
        print(f"Starting DATA AI STUDIO Flask server on port {port}...")
        app.run(host="0.0.0.0", port=port, debug=False)

except ImportError as err:
    print(f"Flask not imported: {err}")
