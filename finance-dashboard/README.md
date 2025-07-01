# Personal Finance Dashboard

## Project Overview

A comprehensive web-based personal finance management system that helps users track expenses, manage budgets, and gain insights into their financial habits. This project demonstrates full-stack development skills, data analysis capabilities, and practical problem-solving.

## Features

### Core Functionality
- **Expense Tracking**: Add, edit, and categorize expenses
- **Income Management**: Track multiple income sources
- **Budget Planning**: Set and monitor budget limits by category
- **Financial Analytics**: Visual insights and spending patterns
- **Goal Setting**: Set and track financial goals
- **Data Export**: Export financial data to CSV/PDF

### Technical Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Dynamic charts and calculations
- **Data Persistence**: SQLite database for data storage
- **RESTful API**: Clean API design for frontend-backend communication
- **Data Validation**: Input validation and error handling

## Technology Stack

### Backend
- **Python 3.9+**
- **Flask**: Web framework
- **SQLAlchemy**: Database ORM
- **SQLite**: Database
- **Flask-CORS**: Cross-origin resource sharing
- **Pandas**: Data manipulation and analysis

### Frontend
- **HTML5/CSS3**: Structure and styling
- **JavaScript (ES6+)**: Interactive functionality
- **Chart.js**: Data visualization
- **Bootstrap**: Responsive design framework

### Development Tools
- **Git**: Version control
- **Postman**: API testing
- **VS Code**: Development environment

## Project Structure

```
finance-dashboard/
├── backend/
│   ├── app.py                 # Flask application
│   ├── models.py              # Database models
│   ├── routes.py              # API routes
│   ├── database.py            # Database configuration
│   ├── utils.py               # Utility functions
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── index.html             # Main dashboard
│   ├── css/
│   │   ├── style.css          # Custom styles
│   │   └── dashboard.css      # Dashboard-specific styles
│   ├── js/
│   │   ├── app.js             # Main application logic
│   │   ├── charts.js          # Chart configurations
│   │   ├── api.js             # API communication
│   │   └── utils.js           # Utility functions
│   └── assets/
│       └── images/            # Icons and images
├── data/
│   └── sample_data.sql        # Sample data for testing
├── docs/
│   ├── api_documentation.md   # API documentation
│   └── user_guide.md          # User guide
└── README.md                  # This file
```

## Installation & Setup

### Prerequisites
- Python 3.9 or higher
- pip (Python package manager)
- Modern web browser

### Backend Setup
```bash
# Navigate to backend directory
cd finance-dashboard/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
python database.py

# Run the application
python app.py
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd finance-dashboard/frontend

# Open index.html in your browser or use a local server
# Using Python's built-in server:
python -m http.server 8080

# Or using Node.js live-server:
npx live-server
```

## API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/<id>` - Update transaction
- `DELETE /api/transactions/<id>` - Delete transaction

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Analytics
- `GET /api/analytics/monthly` - Monthly spending analysis
- `GET /api/analytics/category` - Category-wise breakdown
- `GET /api/analytics/trends` - Spending trends

### Budgets
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/<id>` - Update budget

## Key Learning Outcomes

### Technical Skills Demonstrated
1. **Full-Stack Development**: Complete web application from database to UI
2. **API Design**: RESTful API with proper HTTP methods and status codes
3. **Database Design**: Normalized database schema with relationships
4. **Data Visualization**: Interactive charts and graphs
5. **Responsive Design**: Mobile-first approach
6. **Error Handling**: Comprehensive error handling and validation

### Business Skills Demonstrated
1. **Problem Analysis**: Understanding personal finance pain points
2. **User Experience**: Intuitive interface design
3. **Data Analysis**: Financial insights and reporting
4. **Project Planning**: Structured development approach

## Future Enhancements

### Phase 2 Features
- **Bank Integration**: Connect to bank APIs for automatic transaction import
- **Investment Tracking**: Portfolio management and performance tracking
- **Bill Reminders**: Automated bill payment reminders
- **Multi-Currency**: Support for multiple currencies
- **Mobile App**: React Native mobile application

### Advanced Features
- **Machine Learning**: Spending prediction and anomaly detection
- **Financial Advice**: AI-powered financial recommendations
- **Social Features**: Family budget sharing and collaboration
- **Advanced Analytics**: Predictive analytics and forecasting

## Deployment Options

### Local Development
- Run on localhost for development and testing

### Cloud Deployment
- **Heroku**: Easy deployment with PostgreSQL addon
- **AWS**: EC2 instance with RDS database
- **DigitalOcean**: Droplet with managed database
- **Netlify/Vercel**: Frontend deployment with serverless backend

## Contributing

This project is part of my professional portfolio. However, suggestions and feedback are welcome!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

**Bhavesh Chaudhary**
- Email: iambhavesh55@gmail.com
- LinkedIn: [Connect with me](https://www.linkedin.com/in/bhavesh-chaudhary-3a055a28a/)
- GitHub: [View my repositories](https://github.com/iambhavesh55)

---

*This project demonstrates practical application of data analytics and web development skills for real-world financial management challenges.*