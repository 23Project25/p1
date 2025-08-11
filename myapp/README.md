
# Paws & Care - Animal Health Care & Food Store

A professional full-stack web application for managing animal health care products and food items with MongoDB integration.

## Features

- **Professional Frontend**: Responsive design with Bootstrap 5
- **Product Management**: CRUD operations for products
- **Shopping Cart**: Add/remove items with local storage
- **User Authentication**: Registration and login system
- **Order Management**: Complete order processing
- **MongoDB Integration**: Full database support
- **Image Upload**: Product image management
- **Search & Filter**: Advanced product filtering

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT tokens
- **File Upload**: Multer

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `animal-health-store`

3. **Environment Variables**
   The `.env` file is already created with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/animal-health-store
   JWT_SECRET=your-secret-key-here
   ```

4. **Start the Application**
   ```bash
   npm start
   ```

5. **Access the Application**
   Open your browser and navigate to: http://localhost:5000

## Project Structure

```
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── models/
│   ├── User.js           # User model
│   ├── Product.js        # Product model
│   └── Order.js          # Order model
├── routes/
│   ├── products.js       # Product routes
│   ├── auth.js           # Authentication routes
│   └── orders.js         # Order routes
├── public/
│   ├── index.html        # Main HTML file
│   ├── css/
│   │   └── style.css     # Custom styles
│   ├── js/
│   │   └── app.js        # Frontend JavaScript
│   └── images/           # Product images
└── uploads/              # Uploaded images
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PATCH /api/orders/:id/status` - Update order status

## Usage

1. **Browse Products**: Navigate through categories and filter products
2. **Shopping Cart**: Add products to cart and manage quantities
3. **User Registration**: Create an account to place orders
4. **Order Management**: View and track your orders

## Testing

The application is ready for testing. All components have been created and the server can be started immediately after running `npm install`.
