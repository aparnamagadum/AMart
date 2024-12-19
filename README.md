# E-Commerce API

This project is a backend for an e-commerce application. It provides functionalities such as user authentication, product management, cart operations, order processing, wishlist management, and coupon management. The backend is built using Node.js, Express.js, and MongoDB.

## Features

- **User Management**: Register, login, logout, and manage user profiles.
- **Product Management**: Add, update, delete, and retrieve products.
- **Cart Operations**: Add items to the cart, remove items, and retrieve cart details.
- **Order Processing**: Create orders, retrieve user-specific orders, and view all orders.
- **Wishlist Management**: Add items to the wishlist and retrieve the wishlist for users.
- **Coupon Management**: Add, update, delete, and retrieve coupons.

1. Clone the repository:
   ```bash
   git clone https://github.com/aparnamagadum/AMart

### User APIs:
1. **signup** - `POST` [https://amart.onrender.com/api/user/register]
2. **signin** - `POST` [https://amart.onrender.com/api/user/login]
3. **logout** - `POST` [https://amart.onrender.com/api/user/logout]
4. **IsLoggedIn** - `GET` [https://amart.onrender.com/api/user/isLoggedIn]
5. **wishlist** - `POST` [https://amart.onrender.com/api/user/wishlist]
6. **getUserWishlist** - `GET` [https://amart.onrender.com/api/user/getUserWishlist]
7. **forgotPassword** - `POST` [https://amart.onrender.com/api/user//forgotPassword]
8. **resetPassword**- `POST` [https://instaclone-lf72.onrender.com/api/user/resetPassword/:id/:token]

### Product APIs:
1. **addProduct** - `POST` [https://amart.onrender.com/api/admin/product/addProduct]
2. **getAllProduct** - `GET` [https://amart.onrender.com/api/admin/product/getAllProduct]
3. **getSingleProduct** - `GET` [https://amart.onrender.com/api/admin/product/getSingleProduct/:id]
4. **updateProduct** - `PATCH` [https://amart.onrender.com/api/admin/product/updateProduct/:id]
5. **deleteProduct** - `DELETE` [https://amart.onrender.com/api/admin/product/deleteProduct/:id]
6. **rating** - `POST` [https://amart.onrender.com/api/admin/product/rating]

### Cart APIs:
1. **addToCart** - `POST` [https://amart.onrender.com/api/user/cart/add]
2. **removeCart** - `DELETE` [https://amart.onrender.com/api/user/cart/remove/:id]
3. **getUserCart** - `GET` [https://amart.onrender.com/api/user/cart/getUserCart]

### Order APIs:
1. **createOrder** - `POST` [https://amart.onrender.com/api/user/order/createOrder]
2. **getUserOrder** - `GET` [https://amart.onrender.com/api/user/order/getUserOrder]
3. **getAllOrder** - `GET` [https://amart.onrender.com/api/user/order/getAllOrder]

### Coupon APIs:
1. **addCoupon** - `POST` [https://amart.onrender.com/api/admin/coupon/addcoupon]
2. **getAllCoupon** - `GET` [https://amart.onrender.com/api/admin/coupon/getAllcoupon]
3. **getSingleCoupon** - `GET` [https://amart.onrender.com/api/admin/coupon/getSinglecoupon/:id]
4. **updateCoupon** - `PATCH` [https://amart.onrender.com/api/admin/coupon/updatecoupon/:id]
5. **deleteCoupon** - `DELETE` [https://amart.onrender.com/api/admin/coupon/deletecoupon/:id]


