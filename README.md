# Online Cow Hut Backend 
## Production category project for backend
___________________________________________


Features:
- 
- Error Handling.

- CRUD Operations on Users, Cows and Orders.

- Auth Service with access token and a refresh token using browser cookie.

- Restricting route according to user permission.  

- Hashing sensitive database information for getting more secure. 

- Creating access token using refresh token.


Technologies:
-
- Express
- TypeScript
- Mongoose
- MongoDB
- Node.JS
- Bcrypt
- JSONwebtoken
- Git
- Netlify

##Live Link: https://assignment-4-cow-hut-server.onrender.com

__Application Routes:__


__Auth (User)__
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/auth/login (POST)
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/auth/signup (POST)
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/auth/refresh-token (POST)

__Auth (Admin)__
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/admins/create-admin (POST)
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/admins/login (POST)

__User__
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/users (GET All Users)
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/users/649c2cead3a5bd4bea88babc (Single GET) Include an id that is saved in your database
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/users/649c2cead3a5bd4bea88babc (PATCH) Include an id that is saved in your database
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/users/649c2cead3a5bd4bea88babc (DELETE) Include an id that is saved in your database


__Cows__
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/cows/create-cow (POST)
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/cows (GET All Cows)
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/cows/649c3083467eb3b1844956fb (Single GET) Include an id that is saved in your database
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/cows/649c3083467eb3b1844956fb (PATCH) Include an id that is saved in your database
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/cows/649c3083467eb3b1844956fb (DELETE) Include an id that is saved in your database

__Orders__
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/orders (POST)
* Route: https://assignment-4-cow-hut-server.onrender.com/api/v1/orders (GET)







