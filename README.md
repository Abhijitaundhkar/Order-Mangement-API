# Order Mangement API

User Module
=> User Schema:

  -> userId (auto-generated UUID or ObjectId)

  -> name (string, required)

  -> email (string, required, unique, validate email format)

  -> password (hashed, required)

  -> role (enum: ['customer', 'admin'], default: 'customer')

  -> createdAt (timestamp, auto-generated)

  -> updatedAt (timestamp, auto-generated)    => Functionalities:

  -> Register User (POST /users/register)

  -> Login User (POST /users/login)

  -> Use JWT for authentication.

  -> Get Profile (GET /users/profile)

  -> Return user details (secured, accessible only to logged-in users).      2. Product Module =>Product Schema:

  -> productId (auto-generated UUID or ObjectId)

  -> name (string, required)

  -> description (string)

  -> price (number, required)

  -> stock (number, required)

  -> createdAt (timestamp, auto-generated)

  -> updatedAt (timestamp, auto-generated)    =>Functionalities:

  -> Create Product (POST /products)

  -> Only accessible by admin users.

  -> Update Product (PUT /products/:id)

  -> Only accessible by admin users.

  -> List Products (GET /products)

  -> Get Product by ID (GET /products/:id)    3. Order Module => Order Schema:

  -> orderId (auto-generated UUID or ObjectId)

  -> userId (reference to User)

  -> products (array of objects with productId and quantity)

  -> totalAmount (calculated field: sum of product prices × quantities)

  -> status (enum: ['pending', 'confirmed', 'cancelled'], default: 'pending')

  -> createdAt (timestamp, auto-generated)

  -> updatedAt (timestamp, auto-generated)

=> Functionalities:

  -> Create Order (POST /orders)

    -> Customers can place orders.

    -> Validate product stock before creating an order.

    -> Decrease product stock after placing the order.

  -> Update Order Status (PUT /orders/:id/status)

    -> Only admin can update order status to confirmed or cancelled.

  -> Get Orders (GET /orders)

    -> Customers can view only their own orders.

    -> Admin can view all orders.      => Authentication:   -> Use JWT for user authentication.

    -> Protect endpoints based on roles (admin vs customer).

=> Database:

-> Use MongoDB with Mongoose or Typegoose for schemas and queries.

  -> Validation & Error Handling:

-> Validate all input data using class-validator.

  -> Properly handle errors with meaningful messages and HTTP status codes.

=> Project Structure:

  -> Follow a modular and clean folder structure for scalability.
