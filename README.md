# E-Commerce API

This project is a backend for an e-commerce application. It provides functionalities such as user authentication, product management, cart operations, order processing, wishlist management, and coupon management. The backend is built using Node.js, Express.js, and MongoDB.

## Features

- **User Management**: Register, login, logout, and manage user profiles.
- **Product Management**: Add, update, delete, and retrieve products.
- **Cart Operations**: Add items to the cart, remove items, and retrieve cart details.
- **Order Processing**: Create orders, retrieve user-specific orders, and view all orders.
- **Wishlist Management**: Add items to the wishlist and retrieve the wishlist for users.
- **Coupon Management**: Add, update, delete, and retrieve coupons.

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- npm or yarn
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>

User APIs
Register - POST
[http://localhost:5000/api/user/register]
Description: Registers a new user.

Login - POST
[http://localhost:5000/api/user/login]
Description: Logs in a user and returns a token.

Logout - POST
[http://localhost:5000/api/user/logout]
Description: Logs out the current user.

Check Login Status - GET
[http://localhost:5000/api/user/isLoggedIn]
Description: Checks if a user is logged in.

Add to Wishlist - POST
[http://localhost:5000/api/user/wishlist]
Description: Adds a product to the user's wishlist.

Get Wishlist - GET
[http://localhost:5000/api/user/getUserWishlist]
Description: Retrieves the user's wishlist.

Forgot Password - POST
[http://localhost:5000/api/user/forgotPassword]
Description: Sends a password reset link to the user's email.

Reset Password - POST
[http://localhost:5000/api/user/resetPassword/:id/:token]
Description: Resets the user's password.

