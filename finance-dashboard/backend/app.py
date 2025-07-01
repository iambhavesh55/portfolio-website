from flask import Flask, jsonify
from flask_cors import CORS
from models import db
from routes import api
import os

def create_app():
    app = Flask(__name__)
    
    # Configuration
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "finance.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your-secret-key-here'  # Change this in production
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(api, url_prefix='/api')
    
    # Health check endpoint
    @app.route('/health')
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'Finance Dashboard API is running'})
    
    # Root endpoint
    @app.route('/')
    def root():
        return jsonify({
            'message': 'Personal Finance Dashboard API',
            'version': '1.0.0',
            'endpoints': {
                'transactions': '/api/transactions',
                'categories': '/api/categories',
                'budgets': '/api/budgets',
                'goals': '/api/goals',
                'analytics': {
                    'summary': '/api/analytics/summary',
                    'category_breakdown': '/api/analytics/category-breakdown',
                    'monthly_trends': '/api/analytics/monthly-trends'
                }
            }
        })
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    
    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()
    
    # Run the application
    print("Starting Personal Finance Dashboard API...")
    print("API Documentation available at: http://localhost:5000/")
    print("Health check available at: http://localhost:5000/health")
    
    app.run(debug=True, host='0.0.0.0', port=5000)