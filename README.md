# Back-End
## Schema
#### Users
| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| email    | string  | _required_ and _unique_            |
| password | string  | _required_                         |
| username | string  | _required_                         |
| role     | integer  | _required_                         |
#### Role
| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _foreign key_ and _autoincrements_ |
| name     | string  | _required_ and _unique_            |
#### Borrowing
| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| borrower_id    | integer | _foreign key_   ID from the user table                           |
| p_id    | integer    | ID from the products table                              |
#### Product
| Field     | Type    | Notes                                                                      |
| --------- | ------- | -----------------------------------------------------------------------    |
| prod_id        | integer | _primary key_ and _autoincrements_                                         |
| name      | string  | _required_; name of the item                                               |
| image_URL | string  | product image                                                              |
| price     | text    | price                                                                 |
| content   | text    | _required_; review of the tech stuff                                       |
| owner     | integer | _foreign key_ ID of the author of the listing                                                       |
                                                       
## API
BASE URL: https://usemy-techstuff.herokuapp.com/
test account:
```json
{
  "username": "testing",
  "password": "qwerty",
  "email": "someemail@somehting.com"
}
```
#### Table of Contents
| Type   | Path                        | Notes                                                                                                 | Example                            |
| ------ | ------------------------    | ----------------------------------------------------------------------------------------------------- | ---------------------------------- |
| POST   | `/api/auth/register`        | register a new user                                                                                   | [link](#post-apiauthregister)      |
| POST   | `/api/auth/login`           | login an user                                                                                         | [link](#post-apiauthlogin)         |
| &nbsp; |                                                                                                  
| GET    | `/api/users/`        | get all users info; requires authorization                                                                 | |
| GET    | `/api/users/:user_id`        | get user info; requires authorization                                                                 | [link](#get-apiusersuser_id)       |
| PUT    | `/api/users/:user_id/username`        | update user username; requires authorization                                                              | [link](#put-apiusersuser_idusername)       |
| PUT    | `/api/users/:user_id/email`        | update user email; requires authorization                                                              | [link](#put-apiusersuser_idemail)       |
| PUT    | `/api/users/:user_id/password`        | update user password; requires authorization                                                              | [link](#put-apiusersuser_idpassword)       |
| &nbsp; |                                                                                              
| GET    | `/api/product`             | get products                                                                                          | [link](#get-apiproduct)            |
| GET    | `/api/product/:id` | get a product                                                                                         | [link](#get-apiproduct)    |
| GET    | `/api/product/find/available`             | get products that are not borrowed by anyone                                                                                         | [link](#get-apiproductfindavailable)            |
| GET    | `/api/product/by-owner/:user_id`             | get all products owned by a specific user                                                                                         | [link](#get-apiproductby-owneruser_id)            |
| GET    | `/api/product/borrowing/:user_id`             | get products a user is currently borrowing                                                                                          | [link](#get-apiproductborrowinguser_id)            |
| POST   | `/api/product`             | create a new product post; requires `name` and `content`                                              | [link](#post-apiproduct)           |
| POST    | `/api/product/:id/borrow-item` | posts to the borrowers table to they are borrowing the project;   | [link](#post-apiproductidborrow-item)    |
| PUT    | `/api/product/:id` | update a product;  requires authorization;   | [link](#put-apiproductproduct_id)    |
| DELETE | `/api/product/:id`  | delete a product; requires authorization;                                                            | [link](#delete-apiproductproduct_id) |
| DELETE | `/api/product/:id/return-item`  | returns an item by deleting the borrowing record; requires authorization;                                                            | [link](#delete-apiproductidreturn-item) 
## Examples
#### POST /api/auth/register
request data:
```json
{
  "email": "username@email.com",
  "password": "password",
  "username": "Name"
}
```
response data:
```json
{
  "user": {
    "id": 1,
    "email": "username@email.com",
    "username": "Name"
  },
  "authorization": "really.long.token"
}
```
#### POST /api/auth/login
request data:
```json
{
  "username": "test123",
  "password": "test"
}
```
response data:
```json
{
  "user": {
    "id": 1,
    "email": "username@email.com",
    "username": "Name"
  },
  "authorization": "really.long.token"
}
```
#### GET /api/users/:user_id
response data
```json
{
  "id": 1,
  "email": "username@email.com",
  "username": "Name"
}
```
#### PUT /api/users/:user_id/username
request data
```json
{
  "username": "Name",
}
```
response data
```json
{
  "id": 1,
  "email": "username@email.com",
  "username": "Name"
}
```
#### PUT /api/users/:user_id/email
request data
```json
{
  "email": "username@email.com"
}
```
response data
```json
{
  "id": 1,
  "email": "username@email.com",
  "username": "Name"
}
```
#### PUT /api/users/:user_id/password
request data
```json
{
  "password": "new password"
}
```
response data
```json
{
  "id": 1,
  "email": "username@email.com",
  "username": "Name"
}
```
#### DELETE /api/users/:user_id
response data
```
no content
```
#### GET /api/product/:product_id
response data
```json
{
  "prod_id": 1,
  "name": "Name",
  "price": "Price here",
  "image_URL": "image.com",
  "content": "About the product text",
  "ownerName": "owners name",
  "owner": "owners id",
  "borrowerName": "borrowers name", //null if no borrower
  "borrower_ID": "borrowers id" //null if no borrower

}
```
#### PUT /api/product/:product_id
request data
```json
{
  "name": "Name",
  "price": "Price here",
  "image_URL": "image.com",
  "content": "About the product text",

}
```
response data
```json
{
  "id": 1,
  "name": "Name",
  "price": "Price here",
  "image_URL": "image.com",
  "content": "About the product text",

}
```
#### DELETE /api/product/:product_id
response data
```
no content
```
#### DELETE /api/product/:id/return-item
response data
```
no content
```
#### GET /api/product
response data
```json
[
  {
    "prod_id": 1,
    "name": "Name",
    "price": "Price here",
    "image_URL": "image.com",
    "content": "About the product text",
    "ownerName": "owners name",
    "owner": "owners id",
    "borrowerName": "borrowers name", //null if no borrower
    "borrower_ID": "borrowers id" //null if no borrower
  },
  {
    "prod_id": 2,
    "name": "Name",
    "price": "Price here",
    "image_URL": "image.com",
    "content": "About the product text",
    "ownerName": "owners name",
    "owner": "owners id",
    "borrowerName": "borrowers name", //null if no borrower
    "borrower_ID": "borrowers id" //null if no borrower
  }
]
```
#### GET /api/product/find/available
response data
```json
[
  {
    "prod_id": 1,
    "name": "Name",
    "price": "Price here",
    "image_URL": "image.com",
    "content": "About the product text",
    "ownerName": "owners name",
    "owner": "owners id",
    "borrowerName": null,
    "borrower_ID": null
  },
  {
    "prod_id": 2,
    "name": "Name",
    "price": "Price here",
    "image_URL": "image.com",
    "content": "About the product text",
    "ownerName": "owners name",
    "owner": "owners id",
    "borrowerName": null,
    "borrower_ID": null
  }
]
```
#### GET /api/product/by-owner/:user_id
response data
```json
[
  {
    "prod_id": 1,
    "name": "Name",
    "price": "Price here",
    "image_URL": "image.com",
    "content": "About the product text",
    "ownerName": "owners name",
    "owner": "owners id",
    "borrowerName": null,
    "borrower_ID": null
  }
]
```
#### GET /api/product/borrowing/:user_id
response data
```json
[
  {
    "prod_id": 1,
    "name": "Name",
    "price": "Price here",
    "image_URL": "image.com",
    "content": "About the product text",
    "ownerName": "owners name",
    "owner": "owners id",
    "borrowerName": "name of borrower",
    "borrower_ID": "borrowers id"
  }
]
```
#### POST /api/product
request data
```json
{
  "name": "Name",
  "price": "Price here",
  "image_URL": "image.com",
  "content": "About the product text",
  "owner": "id of the user making the post"
}
```
response data
```json
{
  "id": 1,
  "name": "Name",
  "price": "Price here",
  "image_URL": "image.com",
  "content": "About the product text",
  "owner": "id of the user making the post"
}
```
#### POST /api/product/:id/borrow-item
request data
```json
{
  "p_id": "id of the product",
  "borrower_id": "id of the borrower"
}
```
response data
```json
{
  "p_id": "id of the product",
  "borrower_id": "id of the borrower"
}
```