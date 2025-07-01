from flask import Blueprint, request, jsonify
from models import db, Transaction, Category, Budget, Goal
from datetime import datetime, date, timedelta
from sqlalchemy import func, extract, and_
import pandas as pd

api = Blueprint('api', __name__)

# Error handler
def handle_error(error_message, status_code=400):
    return jsonify({'error': error_message}), status_code

# Transaction routes
@api.route('/transactions', methods=['GET'])
def get_transactions():
    try:
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 50, type=int)
        category_id = request.args.get('category_id', type=int)
        transaction_type = request.args.get('type')
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        
        # Build query
        query = Transaction.query
        
        if category_id:
            query = query.filter(Transaction.category_id == category_id)
        
        if transaction_type:
            query = query.filter(Transaction.type == transaction_type)
        
        if start_date:
            start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
            query = query.filter(Transaction.date >= start_date)
        
        if end_date:
            end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
            query = query.filter(Transaction.date <= end_date)
        
        # Order by date (newest first)
        query = query.order_by(Transaction.date.desc(), Transaction.created_at.desc())
        
        # Paginate
        transactions = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'transactions': [t.to_dict() for t in transactions.items],
            'total': transactions.total,
            'pages': transactions.pages,
            'current_page': page,
            'per_page': per_page
        })
    
    except Exception as e:
        return handle_error(f"Error fetching transactions: {str(e)}")

@api.route('/transactions', methods=['POST'])
def create_transaction():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['amount', 'description', 'type', 'category_id']
        for field in required_fields:
            if field not in data:
                return handle_error(f"Missing required field: {field}")
        
        # Validate transaction type
        if data['type'] not in ['income', 'expense']:
            return handle_error("Transaction type must be 'income' or 'expense'")
        
        # Validate category exists
        category = Category.query.get(data['category_id'])
        if not category:
            return handle_error("Category not found")
        
        # Parse date
        transaction_date = date.today()
        if 'date' in data and data['date']:
            transaction_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        
        # Create transaction
        transaction = Transaction(
            amount=float(data['amount']),
            description=data['description'],
            type=data['type'],
            category_id=data['category_id'],
            date=transaction_date,
            notes=data.get('notes', '')
        )
        
        db.session.add(transaction)
        db.session.commit()
        
        return jsonify(transaction.to_dict()), 201
    
    except ValueError as e:
        return handle_error(f"Invalid data format: {str(e)}")
    except Exception as e:
        return handle_error(f"Error creating transaction: {str(e)}")

@api.route('/transactions/<int:transaction_id>', methods=['PUT'])
def update_transaction(transaction_id):
    try:
        transaction = Transaction.query.get_or_404(transaction_id)
        data = request.get_json()
        
        # Update fields if provided
        if 'amount' in data:
            transaction.amount = float(data['amount'])
        if 'description' in data:
            transaction.description = data['description']
        if 'type' in data:
            if data['type'] not in ['income', 'expense']:
                return handle_error("Transaction type must be 'income' or 'expense'")
            transaction.type = data['type']
        if 'category_id' in data:
            category = Category.query.get(data['category_id'])
            if not category:
                return handle_error("Category not found")
            transaction.category_id = data['category_id']
        if 'date' in data:
            transaction.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        if 'notes' in data:
            transaction.notes = data['notes']
        
        transaction.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify(transaction.to_dict())
    
    except ValueError as e:
        return handle_error(f"Invalid data format: {str(e)}")
    except Exception as e:
        return handle_error(f"Error updating transaction: {str(e)}")

@api.route('/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    try:
        transaction = Transaction.query.get_or_404(transaction_id)
        db.session.delete(transaction)
        db.session.commit()
        
        return jsonify({'message': 'Transaction deleted successfully'})
    
    except Exception as e:
        return handle_error(f"Error deleting transaction: {str(e)}")

# Category routes
@api.route('/categories', methods=['GET'])
def get_categories():
    try:
        category_type = request.args.get('type')
        
        query = Category.query
        if category_type:
            query = query.filter(Category.type == category_type)
        
        categories = query.order_by(Category.name).all()
        return jsonify([c.to_dict() for c in categories])
    
    except Exception as e:
        return handle_error(f"Error fetching categories: {str(e)}")

@api.route('/categories', methods=['POST'])
def create_category():
    try:
        data = request.get_json()
        
        # Validate required fields
        if 'name' not in data:
            return handle_error("Missing required field: name")
        
        # Check if category already exists
        existing = Category.query.filter_by(name=data['name']).first()
        if existing:
            return handle_error("Category with this name already exists")
        
        category = Category(
            name=data['name'],
            color=data.get('color', '#3498db'),
            icon=data.get('icon', 'fas fa-tag'),
            type=data.get('type', 'expense')
        )
        
        db.session.add(category)
        db.session.commit()
        
        return jsonify(category.to_dict()), 201
    
    except Exception as e:
        return handle_error(f"Error creating category: {str(e)}")

# Budget routes
@api.route('/budgets', methods=['GET'])
def get_budgets():
    try:
        budgets = Budget.query.filter_by(is_active=True).order_by(Budget.created_at.desc()).all()
        return jsonify([b.to_dict() for b in budgets])
    
    except Exception as e:
        return handle_error(f"Error fetching budgets: {str(e)}")

@api.route('/budgets', methods=['POST'])
def create_budget():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['category_id', 'amount', 'start_date', 'end_date']
        for field in required_fields:
            if field not in data:
                return handle_error(f"Missing required field: {field}")
        
        # Validate category exists
        category = Category.query.get(data['category_id'])
        if not category:
            return handle_error("Category not found")
        
        budget = Budget(
            category_id=data['category_id'],
            amount=float(data['amount']),
            period=data.get('period', 'monthly'),
            start_date=datetime.strptime(data['start_date'], '%Y-%m-%d').date(),
            end_date=datetime.strptime(data['end_date'], '%Y-%m-%d').date()
        )
        
        db.session.add(budget)
        db.session.commit()
        
        return jsonify(budget.to_dict()), 201
    
    except ValueError as e:
        return handle_error(f"Invalid data format: {str(e)}")
    except Exception as e:
        return handle_error(f"Error creating budget: {str(e)}")

# Analytics routes
@api.route('/analytics/summary', methods=['GET'])
def get_summary():
    try:
        # Get date range (default to current month)
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        
        if not start_date or not end_date:
            today = date.today()
            start_date = today.replace(day=1)
            end_date = (start_date + timedelta(days=32)).replace(day=1) - timedelta(days=1)
        else:
            start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
        
        # Calculate totals
        total_income = db.session.query(func.sum(Transaction.amount)).filter(
            Transaction.type == 'income',
            Transaction.date >= start_date,
            Transaction.date <= end_date
        ).scalar() or 0
        
        total_expenses = db.session.query(func.sum(Transaction.amount)).filter(
            Transaction.type == 'expense',
            Transaction.date >= start_date,
            Transaction.date <= end_date
        ).scalar() or 0
        
        net_income = total_income - total_expenses
        
        # Get transaction count
        transaction_count = Transaction.query.filter(
            Transaction.date >= start_date,
            Transaction.date <= end_date
        ).count()
        
        return jsonify({
            'total_income': float(total_income),
            'total_expenses': float(total_expenses),
            'net_income': float(net_income),
            'transaction_count': transaction_count,
            'start_date': start_date.isoformat(),
            'end_date': end_date.isoformat()
        })
    
    except Exception as e:
        return handle_error(f"Error calculating summary: {str(e)}")

@api.route('/analytics/category-breakdown', methods=['GET'])
def get_category_breakdown():
    try:
        transaction_type = request.args.get('type', 'expense')
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        
        if not start_date or not end_date:
            today = date.today()
            start_date = today.replace(day=1)
            end_date = (start_date + timedelta(days=32)).replace(day=1) - timedelta(days=1)
        else:
            start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
        
        # Get category breakdown
        breakdown = db.session.query(
            Category.name,
            Category.color,
            func.sum(Transaction.amount).label('total')
        ).join(Transaction).filter(
            Transaction.type == transaction_type,
            Transaction.date >= start_date,
            Transaction.date <= end_date
        ).group_by(Category.id).order_by(func.sum(Transaction.amount).desc()).all()
        
        return jsonify([{
            'category': item.name,
            'color': item.color,
            'amount': float(item.total)
        } for item in breakdown])
    
    except Exception as e:
        return handle_error(f"Error calculating category breakdown: {str(e)}")

@api.route('/analytics/monthly-trends', methods=['GET'])
def get_monthly_trends():
    try:
        # Get last 12 months of data
        end_date = date.today()
        start_date = end_date - timedelta(days=365)
        
        # Get monthly totals
        monthly_data = db.session.query(
            extract('year', Transaction.date).label('year'),
            extract('month', Transaction.date).label('month'),
            Transaction.type,
            func.sum(Transaction.amount).label('total')
        ).filter(
            Transaction.date >= start_date,
            Transaction.date <= end_date
        ).group_by(
            extract('year', Transaction.date),
            extract('month', Transaction.date),
            Transaction.type
        ).order_by(
            extract('year', Transaction.date),
            extract('month', Transaction.date)
        ).all()
        
        # Organize data by month
        trends = {}
        for item in monthly_data:
            month_key = f"{int(item.year)}-{int(item.month):02d}"
            if month_key not in trends:
                trends[month_key] = {'income': 0, 'expenses': 0}
            
            if item.type == 'income':
                trends[month_key]['income'] = float(item.total)
            else:
                trends[month_key]['expenses'] = float(item.total)
        
        # Convert to list format
        result = []
        for month, data in sorted(trends.items()):
            result.append({
                'month': month,
                'income': data['income'],
                'expenses': data['expenses'],
                'net': data['income'] - data['expenses']
            })
        
        return jsonify(result)
    
    except Exception as e:
        return handle_error(f"Error calculating monthly trends: {str(e)}")

# Goal routes
@api.route('/goals', methods=['GET'])
def get_goals():
    try:
        goals = Goal.query.order_by(Goal.target_date).all()
        return jsonify([g.to_dict() for g in goals])
    
    except Exception as e:
        return handle_error(f"Error fetching goals: {str(e)}")

@api.route('/goals', methods=['POST'])
def create_goal():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'target_amount', 'target_date']
        for field in required_fields:
            if field not in data:
                return handle_error(f"Missing required field: {field}")
        
        goal = Goal(
            title=data['title'],
            description=data.get('description', ''),
            target_amount=float(data['target_amount']),
            current_amount=float(data.get('current_amount', 0)),
            target_date=datetime.strptime(data['target_date'], '%Y-%m-%d').date()
        )
        
        db.session.add(goal)
        db.session.commit()
        
        return jsonify(goal.to_dict()), 201
    
    except ValueError as e:
        return handle_error(f"Invalid data format: {str(e)}")
    except Exception as e:
        return handle_error(f"Error creating goal: {str(e)}")

@api.route('/goals/<int:goal_id>', methods=['PUT'])
def update_goal(goal_id):
    try:
        goal = Goal.query.get_or_404(goal_id)
        data = request.get_json()
        
        # Update fields if provided
        if 'title' in data:
            goal.title = data['title']
        if 'description' in data:
            goal.description = data['description']
        if 'target_amount' in data:
            goal.target_amount = float(data['target_amount'])
        if 'current_amount' in data:
            goal.current_amount = float(data['current_amount'])
        if 'target_date' in data:
            goal.target_date = datetime.strptime(data['target_date'], '%Y-%m-%d').date()
        if 'is_completed' in data:
            goal.is_completed = bool(data['is_completed'])
        
        goal.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify(goal.to_dict())
    
    except ValueError as e:
        return handle_error(f"Invalid data format: {str(e)}")
    except Exception as e:
        return handle_error(f"Error updating goal: {str(e)}")