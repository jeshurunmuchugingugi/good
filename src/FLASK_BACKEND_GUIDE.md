# Flask Backend Implementation Guide

This guide provides the structure and examples for building the Flask + SQLAlchemy backend to work with this React frontend.

## 📦 Required Python Packages

```bash
pip install flask flask-sqlalchemy flask-cors flask-jwt-extended requests python-dotenv
```

## 🗄️ Database Models (models.py)

```python
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('user', 'admin'), default='user')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    bookings = db.relationship('Booking', backref='user', lazy=True)
    payments = db.relationship('Payment', backref='user', lazy=True)
    transport_requests = db.relationship('TransportRequest', backref='user', lazy=True)

class StorageUnit(db.Model):
    __tablename__ = 'storage_units'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    unit_number = db.Column(db.String(20), unique=True, nullable=False)
    size = db.Column(db.String(50), nullable=False)
    dimensions = db.Column(db.String(50), nullable=False)
    monthly_price = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Enum('available', 'booked', 'maintenance'), default='available')
    description = db.Column(db.Text)
    
    bookings = db.relationship('Booking', backref='unit', lazy=True)

class Booking(db.Model):
    __tablename__ = 'bookings'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    unit_id = db.Column(db.String(36), db.ForeignKey('storage_units.id'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Enum('pending', 'confirmed', 'cancelled'), default='pending')
    payment_status = db.Column(db.Enum('pending', 'success', 'failed'), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    payments = db.relationship('Payment', backref='booking', lazy=True)

class Payment(db.Model):
    __tablename__ = 'payments'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    booking_id = db.Column(db.String(36), db.ForeignKey('bookings.id'), nullable=False)
    method = db.Column(db.Enum('mpesa', 'paypal', 'card'), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Enum('pending', 'success', 'failed'), default='pending')
    transaction_code = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class TransportRequest(db.Model):
    __tablename__ = 'transport_requests'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    booking_id = db.Column(db.String(36), db.ForeignKey('bookings.id'))
    pickup_address = db.Column(db.String(255), nullable=False)
    delivery_address = db.Column(db.String(255), nullable=False)
    distance = db.Column(db.Float, nullable=False)
    estimated_cost = db.Column(db.Integer, nullable=False)
    preferred_time = db.Column(db.DateTime, nullable=False)
    items_description = db.Column(db.Text, nullable=False)
    status = db.Column(db.Enum('requested', 'scheduled', 'in_progress', 'completed', 'cancelled'), default='requested')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
```

## 🔐 Authentication Routes (routes/auth.py)

```python
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    
    # Check if user exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 400
    
    # Create new user
    user = User(
        email=data['email'],
        phone=data['phone'],
        name=data['name'],
        password_hash=generate_password_hash(data['password'])
    )
    
    db.session.add(user)
    db.session.commit()
    
    # Create access token
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'success': True,
        'token': access_token,
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'role': user.role
        }
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'success': True,
        'token': access_token,
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'role': user.role
        }
    })

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    return jsonify({
        'id': user.id,
        'email': user.email,
        'name': user.name,
        'phone': user.phone,
        'role': user.role
    })
```

## 🏢 Storage Units Routes (routes/units.py)

```python
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, StorageUnit, User

units_bp = Blueprint('units', __name__)

@units_bp.route('/', methods=['GET'])
def get_units():
    units = StorageUnit.query.all()
    
    return jsonify({
        'success': True,
        'data': [{
            'id': unit.id,
            'unit_number': unit.unit_number,
            'size': unit.size,
            'dimensions': unit.dimensions,
            'monthly_price': unit.monthly_price,
            'status': unit.status,
            'description': unit.description
        } for unit in units]
    })

@units_bp.route('/<unit_id>', methods=['GET'])
def get_unit(unit_id):
    unit = StorageUnit.query.get_or_404(unit_id)
    
    return jsonify({
        'success': True,
        'data': {
            'id': unit.id,
            'unit_number': unit.unit_number,
            'size': unit.size,
            'dimensions': unit.dimensions,
            'monthly_price': unit.monthly_price,
            'status': unit.status,
            'description': unit.description
        }
    })

@units_bp.route('/<unit_id>', methods=['PUT'])
@jwt_required()
def update_unit(unit_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    
    unit = StorageUnit.query.get_or_404(unit_id)
    data = request.json
    
    if 'status' in data:
        unit.status = data['status']
    if 'monthly_price' in data:
        unit.monthly_price = data['monthly_price']
    
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Unit updated'})
```

## 💳 M-PESA Integration (routes/payments.py)

```python
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
import base64
from datetime import datetime
import os
from models import db, Payment, Booking

payments_bp = Blueprint('payments', __name__)

def get_mpesa_access_token():
    consumer_key = os.getenv('MPESA_CONSUMER_KEY')
    consumer_secret = os.getenv('MPESA_CONSUMER_SECRET')
    
    api_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    
    response = requests.get(api_url, auth=(consumer_key, consumer_secret))
    return response.json()['access_token']

@payments_bp.route('/mpesa/initiate', methods=['POST'])
@jwt_required()
def initiate_mpesa():
    data = request.json
    user_id = get_jwt_identity()
    
    access_token = get_mpesa_access_token()
    
    api_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    shortcode = os.getenv('MPESA_SHORTCODE')
    passkey = os.getenv('MPESA_PASSKEY')
    
    password = base64.b64encode(f"{shortcode}{passkey}{timestamp}".encode()).decode()
    
    payload = {
        'BusinessShortCode': shortcode,
        'Password': password,
        'Timestamp': timestamp,
        'TransactionType': 'CustomerPayBillOnline',
        'Amount': data['amount'],
        'PartyA': data['phone_number'],
        'PartyB': shortcode,
        'PhoneNumber': data['phone_number'],
        'CallBackURL': os.getenv('MPESA_CALLBACK_URL'),
        'AccountReference': data['account_reference'],
        'TransactionDesc': f"Payment for booking {data['booking_id']}"
    }
    
    response = requests.post(api_url, json=payload, headers=headers)
    
    # Create payment record
    payment = Payment(
        user_id=user_id,
        booking_id=data['booking_id'],
        method='mpesa',
        amount=data['amount'],
        phone_number=data['phone_number'],
        status='pending'
    )
    
    db.session.add(payment)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'data': response.json()
    })

@payments_bp.route('/mpesa/callback', methods=['POST'])
def mpesa_callback():
    data = request.json
    
    result_code = data['Body']['stkCallback']['ResultCode']
    
    if result_code == 0:
        # Payment successful
        checkout_request_id = data['Body']['stkCallback']['CheckoutRequestID']
        
        # Update payment status
        # This requires storing CheckoutRequestID when initiating payment
        # For simplicity, update the most recent pending payment
        
        metadata = data['Body']['stkCallback']['CallbackMetadata']['Item']
        transaction_code = next(item['Value'] for item in metadata if item['Name'] == 'MpesaReceiptNumber')
        
        payment = Payment.query.filter_by(status='pending').order_by(Payment.timestamp.desc()).first()
        
        if payment:
            payment.status = 'success'
            payment.transaction_code = transaction_code
            
            # Update booking
            booking = Booking.query.get(payment.booking_id)
            booking.payment_status = 'success'
            booking.status = 'confirmed'
            
            # Update unit status
            booking.unit.status = 'booked'
            
            db.session.commit()
    
    return jsonify({'ResultCode': 0, 'ResultDesc': 'Success'})

@payments_bp.route('/status/<booking_id>', methods=['GET'])
@jwt_required()
def get_payment_status(booking_id):
    payment = Payment.query.filter_by(booking_id=booking_id).first()
    
    if not payment:
        return jsonify({'success': False, 'message': 'Payment not found'}), 404
    
    return jsonify({
        'success': True,
        'data': {
            'id': payment.id,
            'status': payment.status,
            'amount': payment.amount,
            'transaction_code': payment.transaction_code,
            'timestamp': payment.timestamp.isoformat()
        }
    })
```

## 📅 Bookings Routes (routes/bookings.py)

```python
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Booking, StorageUnit
from datetime import datetime

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/', methods=['POST'])
@jwt_required()
def create_booking():
    data = request.json
    user_id = get_jwt_identity()
    
    # Check if unit is available
    unit = StorageUnit.query.get(data['unit_id'])
    if unit.status != 'available':
        return jsonify({'message': 'Unit not available'}), 400
    
    # Create booking
    booking = Booking(
        user_id=user_id,
        unit_id=data['unit_id'],
        start_date=datetime.strptime(data['start_date'], '%Y-%m-%d').date(),
        end_date=datetime.strptime(data['end_date'], '%Y-%m-%d').date(),
        total_price=data['total_price']
    )
    
    # Temporarily reserve the unit
    unit.status = 'booked'
    
    db.session.add(booking)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'data': {
            'id': booking.id,
            'status': booking.status,
            'payment_status': booking.payment_status
        }
    }), 201

@bookings_bp.route('/<user_id>', methods=['GET'])
@jwt_required()
def get_user_bookings(user_id):
    bookings = Booking.query.filter_by(user_id=user_id).all()
    
    return jsonify({
        'success': True,
        'data': [{
            'id': b.id,
            'unit_id': b.unit_id,
            'start_date': b.start_date.isoformat(),
            'end_date': b.end_date.isoformat(),
            'total_price': b.total_price,
            'status': b.status,
            'payment_status': b.payment_status,
            'created_at': b.created_at.isoformat()
        } for b in bookings]
    })
```

## 🚚 Transport Routes (routes/transport.py)

```python
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, TransportRequest
from datetime import datetime

transport_bp = Blueprint('transport', __name__)

@transport_bp.route('/', methods=['POST'])
@jwt_required()
def create_transport_request():
    data = request.json
    user_id = get_jwt_identity()
    
    transport_request = TransportRequest(
        user_id=user_id,
        booking_id=data.get('booking_id'),
        pickup_address=data['pickup_address'],
        delivery_address=data['delivery_address'],
        distance=data['distance'],
        estimated_cost=data['estimated_cost'],
        preferred_time=datetime.fromisoformat(data['preferred_time']),
        items_description=data['items_description']
    )
    
    db.session.add(transport_request)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'data': {
            'id': transport_request.id,
            'status': transport_request.status
        }
    }), 201

@transport_bp.route('/<user_id>', methods=['GET'])
@jwt_required()
def get_user_transport_requests(user_id):
    requests = TransportRequest.query.filter_by(user_id=user_id).all()
    
    return jsonify({
        'success': True,
        'data': [{
            'id': r.id,
            'pickup_address': r.pickup_address,
            'delivery_address': r.delivery_address,
            'distance': r.distance,
            'estimated_cost': r.estimated_cost,
            'preferred_time': r.preferred_time.isoformat(),
            'items_description': r.items_description,
            'status': r.status,
            'created_at': r.created_at.isoformat()
        } for r in requests]
    })
```

## 🎯 Main Application (app.py)

```python
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from routes.auth import auth_bp
from routes.units import units_bp
from routes.bookings import bookings_bp
from routes.payments import payments_bp
from routes.transport import transport_bp
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///jesh.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')

# Initialize extensions
db.init_app(app)
CORS(app)
JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(units_bp, url_prefix='/api/units')
app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
app.register_blueprint(payments_bp, url_prefix='/api/payments')
app.register_blueprint(transport_bp, url_prefix='/api/transport-requests')

# Create tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
```

## 🔧 Environment Variables (.env)

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost/jesh_storage

# JWT
JWT_SECRET_KEY=your-super-secret-jwt-key-change-in-production

# M-PESA Credentials (Sandbox)
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PASSKEY=your_passkey
MPESA_SHORTCODE=174379

# M-PESA Callback URL (must be HTTPS in production)
MPESA_CALLBACK_URL=https://yourdomain.com/api/payments/mpesa/callback

# Production M-PESA URL
# MPESA_API_URL=https://api.safaricom.co.ke
```

## 🚀 Running the Backend

```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

The API will be available at `http://localhost:5000/api`

## 📝 Notes

1. **Security**: Always use HTTPS in production
2. **Database**: Use PostgreSQL in production instead of SQLite
3. **M-PESA**: Test with sandbox credentials before going live
4. **Authentication**: Implement refresh tokens for better security
5. **Validation**: Add input validation using Flask-Marshmallow
6. **Error Handling**: Implement comprehensive error handling
7. **Logging**: Add logging for debugging and monitoring
8. **Rate Limiting**: Implement rate limiting to prevent abuse

## 🔗 Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [M-PESA Daraja API](https://developer.safaricom.co.ke/)
- [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/)
