# CookBook

> API for managing recipes of different meals.


## 1. Setup the project from the repo locally:
- First clone this repository
```shell
git clone https://github.com/Piotr-Grzybowski/CookBook.git
```
- Get in the folder with the project
```shell
cd CookBook
```
- Install all dependencies with command npm run install
``` shell
npm run install
```
- App requires mongoDb to work. You can either install it locally or use Atlas servers. In main directory open file .env.example. Then assign to the env variables JWT_SECRET which is for authorization using JWT, MONGODB_URL_DEV which is an url of db for development purpose and MONGODB_TEST which is url of db for testing purpose. After that rename file to '.env'.
``` shell 
.env.example => .env
```
- Run project with npm start
```shell
npm start
```

## 2. How it works
In api we have three kinds of resources

### Auth
```
 POST http://localhost:3000/auth/login
```
```
 POST http://localhost:3000/auth/refresh-token
```
### Recipes
```
 GET http://localhost:3000/recipes
```
```
 POST http://localhost:3000/recipes
```
```
 PUT http://localhost:3000/recipes/:recipeId
```
```
 GET http://localhost:3000/recipes/:recipeId
```
```
 DELETE http://localhost:3000/recipes/:recipeId
```
### Users
```
 POST http://localhost:3000/users/register
```

## 3. Permissions
There are three kinds of permissions in this app.
### User not logged in
 - can see list of recipes
 - can get single recipe
 - can register new account
 - can login
### User logged in 
 - can see list of recipes
 - can get single recipe
 - can add new recipe
 - can edit recipe of his ownership
 - can delete recipe of his ownership
 - can refresh access token
### Admin
 - can do everything what logged in user
 - can edit any recipe
 - can delete any recipe

## 4. Testing

- To run test just use npm test
```shell
npm test
```
- To check coverage report use npm run test:coverage
```shell
npm run test:coverage
```

