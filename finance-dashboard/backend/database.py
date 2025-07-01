from flask import Flask
from models import db, Category, Transaction, Budget, Goal
from datetime import datetime, date, timedelta
import os

def create_app():
    app = Flask(__name__)
    
    # Database configuration
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "finance.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    return app

def init_database():
    """Initialize database with tables and sample data"""
    app = create_app()
    
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Check if data already exists
        if Category.query.first():
            print("Database already initialized with data.")
            return
        
        # Create default categories
        default_categories = [
            # Expense categories
            {'name': 'Food & Dining', 'color': '#e74c3c', 'icon': 'fas fa-utensils', 'type': 'expense'},
            {'name': 'Transportation', 'color': '#3498db', 'icon': 'fas fa-car', 'type': 'expense'},
            {'name': 'Shopping', 'color': '#9b59b6', 'icon': 'fas fa-shopping-bag', 'type': 'expense'},
            {'name': 'Entertainment', 'color': '#f39c12', 'icon': 'fas fa-film', 'type': 'expense'},
            {'name': 'Bills & Utilities', 'color': '#34495e', 'icon': 'fas fa-file-invoice-dollar', 'type': 'expense'},
            {'name': 'Healthcare', 'color': '#e67e22', 'icon': 'fas fa-heartbeat', 'type': 'expense'},
            {'name': 'Education', 'color': '#2ecc71', 'icon': 'fas fa-graduation-cap', 'type': 'expense'},
            {'name': 'Travel', 'color': '#1abc9c', 'icon': 'fas fa-plane', 'type': 'expense'},
            {'name': 'Personal Care', 'color': '#f1c40f', 'icon': 'fas fa-spa', 'type': 'expense'},
            {'name': 'Other Expenses', 'color': '#95a5a6', 'icon': 'fas fa-ellipsis-h', 'type': 'expense'},
            
            # Income categories
            {'name': 'Salary', 'color': '#27ae60', 'icon': 'fas fa-money-bill-wave', 'type': 'income'},
            {'name': 'Freelance', 'color': '#16a085', 'icon': 'fas fa-laptop-code', 'type': 'income'},
            {'name': 'Investment', 'color': '#8e44ad', 'icon': 'fas fa-chart-line', 'type': 'income'},
            {'name': 'Gift', 'color': '#e91e63', 'icon': 'fas fa-gift', 'type': 'income'},
            {'name': 'Other Income', 'color': '#607d8b', 'icon': 'fas fa-plus-circle', 'type': 'income'},
        ]
        
        categories = []
        for cat_data in default_categories:
            category = Category(**cat_data)
            categories.append(category)
            db.session.add(category)
        
        db.session.commit()
        
        # Create sample transactions
        sample_transactions = [
            # Recent transactions (last 30 days)
            {'amount': 3500.00, 'description': 'Monthly Salary', 'type': 'income', 'category_id': 11, 'date': date.today() - timedelta(days=1)},
            {'amount': 45.50, 'description': 'Grocery Shopping', 'type': 'expense', 'category_id': 1, 'date': date.today() - timedelta(days=2)},
            {'amount': 12.00, 'description': 'Coffee Shop', 'type': 'expense', 'category_id': 1, 'date': date.today() - timedelta(days=3)},
            {'amount': 85.00, 'description': 'Gas Station', 'type': 'expense', 'category_id': 2, 'date': date.today() - timedelta(days=4)},
            {'amount': 25.99, 'description': 'Netflix Subscription', 'type': 'expense', 'category_id': 4, 'date': date.today() - timedelta(days=5)},
            {'amount': 120.00, 'description': 'Electricity Bill', 'type': 'expense', 'category_id': 5, 'date': date.today() - timedelta(days=6)},
            {'amount': 35.00, 'description': 'Pharmacy', 'type': 'expense', 'category_id': 6, 'date': date.today() - timedelta(days=7)},
            {'amount': 200.00, 'description': 'Freelance Project', 'type': 'income', 'category_id': 12, 'date': date.today() - timedelta(days=8)},
            {'amount': 67.80, 'description': 'Restaurant Dinner', 'type': 'expense', 'category_id': 1, 'date': date.today() - timedelta(days=9)},
            {'amount': 15.00, 'description': 'Public Transport', 'type': 'expense', 'category_id': 2, 'date': date.today() - timedelta(days=10)},
            {'amount': 89.99, 'description': 'Online Shopping', 'type': 'expense', 'category_id': 3, 'date': date.today() - timedelta(days=12)},
            {'amount': 40.00, 'description': 'Movie Tickets', 'type': 'expense', 'category_id': 4, 'date': date.today() - timedelta(days=14)},
            {'amount': 55.00, 'description': 'Internet Bill', 'type': 'expense', 'category_id': 5, 'date': date.today() - timedelta(days=15)},
            {'amount': 30.00, 'description': 'Haircut', 'type': 'expense', 'category_id': 9, 'date': date.today() - timedelta(days=18)},
            {'amount': 150.00, 'description': 'Gift from Family', 'type': 'income', 'category_id': 14, 'date': date.today() - timedelta(days=20)},
        ]
        
        for trans_data in sample_transactions:
            transaction = Transaction(**trans_data)
            db.session.add(transaction)
        
        db.session.commit()
        
        # Create sample budgets
        current_month_start = date.today().replace(day=1)
        current_month_end = (current_month_start + timedelta(days=32)).replace(day=1) - timedelta(days=1)
        
        sample_budgets = [
            {'category_id': 1, 'amount': 400.00, 'period': 'monthly', 'start_date': current_month_start, 'end_date': current_month_end},
            {'category_id': 2, 'amount': 200.00, 'period': 'monthly', 'start_date': current_month_start, 'end_date': current_month_end},
            {'category_id': 3, 'amount': 150.00, 'period': 'monthly', 'start_date': current_month_start, 'end_date': current_month_end},
            {'category_id': 4, 'amount': 100.00, 'period': 'monthly', 'start_date': current_month_start, 'end_date': current_month_end},
            {'category_id': 5, 'amount': 300.00, 'period': 'monthly', 'start_date': current_month_start, 'end_date': current_month_end},
        ]
        
        for budget_data in sample_budgets:
            budget = Budget(**budget_data)
            db.session.add(budget)
        
        db.session.commit()
        
        # Create sample goals
        sample_goals = [
            {
                'title': 'Emergency Fund',
                'description': 'Build an emergency fund for unexpected expenses',
                'target_amount': 5000.00,
                'current_amount': 1200.00,
                'target_date': date.today() + timedelta(days=365)
            },
            {
                'title': 'Vacation Fund',
                'description': 'Save for a trip to Europe',
                'target_amount': 3000.00,
                'current_amount': 450.00,
                'target_date': date.today() + timedelta(days=180)
            },
            {
                'title': 'New Laptop',
                'description': 'Save for a new MacBook Pro',
                'target_amount': 2500.00,
                'current_amount': 800.00,
                'target_date': date.today() + timedelta(days=120)
            }
        ]
        
        for goal_data in sample_goals:
            goal = Goal(**goal_data)
            db.session.add(goal)
        
        db.session.commit()
        
        print("Database initialized successfully with sample data!")
        print(f"Created {len(default_categories)} categories")
        print(f"Created {len(sample_transactions)} sample transactions")
        print(f"Created {len(sample_budgets)} sample budgets")
        print(f"Created {len(sample_goals)} sample goals")

if __name__ == '__main__':
    init_database()