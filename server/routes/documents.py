from flask import Blueprint, jsonify
from models import Document

documents_bp = Blueprint('documents_bp', __name__)

@documents_bp.route('', methods=['GET'])
def get_documents():
    try:
        docs = Document.query.all()
        return jsonify([doc.to_dict() for doc in docs])
    except Exception as e:
        print("Error in /documents route:", e)
        return jsonify({"error": "Failed to fetch documents", "details": str(e)}), 500