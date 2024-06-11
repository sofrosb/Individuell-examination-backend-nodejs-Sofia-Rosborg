# Airbean - Individuell uppgift, fortsättning Aribean API

### Created by Sofia Rosborg

### The description of the task:

This task is a continuation of the Airbean API where you are the admin of the application. As an admin, you can add products to the menu, update and remove products. You can also add promotional offers. ATTENTION! You do not need to do any frontend, only the backend is your task.

### Follow these steps to run the project:

**1. Clone git-repo**

- Open your terminal/console and run this command git clone <repo-url>

**2. Navigate to project:**

- Run the command: cd <project folder>

**3. Install dependencies:**

- Run the npm install command to install all necessary dependencies needed.

**4. Start server:**

- Use nodemon . command to run the server || npm run dev.

**5. Start your api application and use the urls below to test the project**

### API Endpoints

### Base url:

Starting point for accessing various endpoins within the Airbean API. Other than that, the URL is empty.
http://localhost:8000/api/

### Menu:

Access the Airbean menu. No additional steps or parameters needed. <br>
http://localhost:8000/api/company/menu <br>
Method: GET

### Company info:

Access information about the Airbean company. No additional steps or parameters needed.
http://localhost:8000/api/company/companyInfo  
Method: GET

### Create order:

Initiating an order. <br>
http://localhost:8000/api/order/createOrder  
Method: POST

Add query parameters `Key: userId` and `Value: {userId}` when creating the order as a registered user.

- Go to the "Body" tab (in Postman or Insomnia).
- Select "JSON" as the format.
- Paste your JSON structure into the json field.

Example of JSON structure for creating several orders:

```json
[
  {
    "id": 1,
    "title": "Bryggkaffe",
    "desc": "Bryggd på månadens bönor.",
    "price": 39
  },
  {
    "id": 2,
    "title": "Caffè Doppio",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  }
]
```

Will give the user the response: "Your order id: 000."

### Send order:

Finalize and send an order for processing. To complete your order use sendOrder with your order ID. Order will be sent to `completedOrder.db`. You can then see order history and order status.
http://localhost:8000/api/order/sendOrder/:orderId <br>
Method: POST

### Get cart:

Retrieve the current items in the cart. Note that the orderId received when creating an order is necessary to see the cart contents. <br>
http://localhost:8000/api/order/getCart/:orderId <br>
Method: GET

### Add item cart:

Replacing and/or adding an item/items to the cart. Similar to the 'getCart' operation, append your orderId at the end of the URL. <br>
http://localhost:8000/api/order/addItemCart/:orderId  
Method: PUT

- Go to the "Body" tab (in Postman or Insomnia).
- Select "JSON" as the format.
- Paste your JSON structure into the json field.

It's crucial to choose items listed in the 'menu.js' file to avoid errors.

Example of JSON structure for adding several items to cart:

```json
[
  {
    "id": 1,
    "title": "Bryggkaffe",
    "desc": "Bryggd på månadens bönor.",
    "price": 39
  },
  {
    "id": 2,
    "title": "Caffè Doppio",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  }
]
```

### Delete item:

Remove an item from the order by selecting their specific ID. The orderId is required to specify the order from which to delete an item. <br>
http://localhost:8000/api/order/deleteItem/:orderId?itemId=<ProductId>  
Method: DELETE

- Go to the "Parameters" tab (in Postman or Insomnia).
- Add query parameters `Key: itemId` and `Value: {itemId}` when deleting an item from the order.

### Order confirmation:

Confirm an order after it has been sent. The endpoint provides the user with an estimated delivery time. Must be done after sending the order. Append your orderId at the end of the URL. <br>
http://localhost:8000/api/order/orderConfirmation/:orderId <br>
Method: GET

Will give the user this response:

```json
{
  "message": "Your estimated delivery time is 12:11."
}
```

### Create user:

Register a new user. It is then added to the database `users.db`. The userId obtained during registration is essential for creating orders as a user and accessing your order history. <br>
http://localhost:8000/api/users/signup  
Method: POST

- Go to the "Body" tab (in Postman or Insomnia).
- Select "JSON" as the format.
- Paste your JSON structure into the json field.

Example of JSON structure for creating users:

```json
{
  "username": "user",
  "password": "test123"
}
```

Will give the user this response:

```json
{
  "message": "User created.",
  "user": {
    "id": "randomlyGeneratedNumbersAndLetters987",
    "username": "user"
  }
}
```

\*You will need the ID to create orders as a user and to retrieve your order history.

### Login user:

Log in an existing user. <br>
http://localhost:8000/api/users/login  
Method: POST

- Go to the "Body" tab (in Postman or Insomnia).
- Select "JSON" as the format.
- Paste your JSON structure into the json field.

Example of JSON structure for logging in users:

```json
{
  "username": "user",
  "password": "test123"
}
```

Will give the user this response:

```json
{
  "message": "Login successful. Logged in user: user. Id: “randomlyGeneratedNumbersAndLetters987"
}
```

\*You will need the ID to create orders as a user and to retrieve your order history.

### Logout user:

Log out the current user. <br>
http://localhost:8000/api/users/logout  
Method: POST

### Order history for registered users:

To access the order history for a registered user, simply append the userId to the end of the URL.

http://localhost:8000/api/order/orderHistory/:userId  
Method: GET

Will give the user this response:

```json
{
  "orderHistory": [
    {
      "orderId": "000",
      "estDelivery": "11:28",
      "newOrder": [
        {
          "id": 1,
          "title": "Bryggkaffe",
          "desc": "Bryggd på månadens bönor.",
          "price": 39
        }
      ],
      "userId": "randomlyGeneratedNumbersAndLetters987",
      "_id": "randomlyGeneratedNumber"
    }
  ]
}
```

### Login admin:

All admin endpoints are restricted by an admin login. Log in an admin. <br>
http://localhost:8000/api/admin/login <br>
Method: POST

- Go to the "Body" tab (in Postman or Insomnia).
- Select "JSON" as the format.
- Paste your JSON structure into the json field.

Example of JSON structure for logging in users:

```json
{
  "username": "admin",
  "password": "password"
}
```

Will give the user this response:

```json
{
  "message": "Logged in as admin. Logged in user: admin."
}
```

### Add item to menu:

Admin route to add items to menu. The fields id, title, desc, and price are required to add an item. <br>
http://localhost:8000/api/admin/addItem <br>
Method: POST

- Go to the "Body" tab (in Postman or Insomnia).
- Select "JSON" as the format.
- Paste your JSON structure into the json field.

Example of JSON structure for adding menu items:

```json
[
  {
    "id": 7,
    "title": "Sockerkaka",
    "desc": "Hembakad kaka efter mormors recept.",
    "price": 30
  },
  {
    "id": 8,
    "title": "Prinsesstårta (bit)",
    "desc": "En klassiker.",
    "price": 49
  }
]
```

Will give the user this response:

```json
{
	"message": "Item added to menu.",
	"item": {
		"_id": 7,
		"title": "Sockerkaka",
		"desc": "Hembakad kaka efter mormors recept.",
		"price": 30,
		"createdAt": "2024-06-08 12:47:05"
	},
	{
		"id": 8,
		"title": "Prinsesstårta (bit)",
		"desc": "En klassiker.",
		"price": 49,
        "createdAt": "2024-06-08 12:47:05"
	}
}
```

### Modify item in menu:

Admin route to update an item in the menu by specifying its ID. Append the itemId to the end of the URL. At least one of title, description, or price must be provided.

http://localhost:8000/api/admin/updateItem/:itemId <br>
Method: PUT

Example of JSON structure for updating menu items:

```json
{
  "title": "Sockerkaka",
  "desc": "Hembakad kaka efter mormors recept.",
  "price": 35
}
```

Will give the user this response:

```json
{
  "success": true,
  "message": "Item updated in menu.",
  "item": {
    "_id": 7,
    "title": "Sockerkaka",
    "desc": "Hembakad kaka efter mormors recept.",
    "price": 35,
    "createdAt": "2024-06-08 11:12:31",
    "modifiedAt": "2024-06-08 11:12:33"
  }
}
```

### Delete item in menu:

Admin route to delete an item from the menu by specifying its ID. Append the `itemId` to the end of the URL. <br>
http://localhost:8000/api/admin/deleteItem/:itemId <br>
Method: DELETE

Alternative approach:

- Go to the "Parameters" tab (in Postman or Insomnia).
- Add query parameters `Key: itemId` and `Value: {itemId}` when deleting an item from the order.

### Campaigns:

Admin route to add campaigns to the menu. The admin needs to send the product IDs of the items included in the campaign. The total price is then calculated automatically, and the customer will receive a 10% discount.

http://localhost:8000/api/admin/campaigns

Method: POST

Example of JSON structure for adding campaign:

```json
{
  "productIDs": [3, 7]
}
```

Will give the user this response:

```json
{
  "message": "This campaign has been added.",
  "campaign": {
    "title": "Campaign for Cappuccino and Sockerkaka",
    "totalPrice": 79.2,
    "products": [
      {
        "_id": 3,
        "price": 49
      },
      {
        "_id": 7,
        "price": 39
      }
    ]
  }
}
```
