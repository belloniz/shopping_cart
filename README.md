# Shopping Cart
This app is the simulation of an e-commerce API that has a checkout endpoint by which is sent a payload with a product and it returns a response with the purchase resume. It includes the following features:

- Get a list of all available products;
- Create a cart by adding an product to it;
- Add products to an existing cart by a given token;
- Get all information from a existent cart;
- Delete products from an existent cart by giving the product code and cart token.

## Technologies 
This app was developed using:
- Node version 16.15.0
- MongoDB version 4.0.21

## How to run this application 
You need to have [Docker](https://docs.docker.com/engine/install/) installed.

1. Clone this app by running in your terminal:</br>
<pre>git clone git@github.com:belloniz/shopping_cart.git</pre>
2. Access the app folder:
<pre>cd shopping_cart</pre>
3. Run the following command to create a container with the mongo image that we will use in the application.
<pre>docker compose up -d</pre>
4. After the previous command finishes, run the command below to check if the conainter is up.
<pre>docker container ls</pre>

You should see something like this:
<pre>CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                      NAMES
000000000000   mongo:4.0.21   "docker-entrypoint.s…"   .....   .....   0.0.0.0:27017->27017/tcp   shopping_cart-mongo-1</pre>

5. Now you can run the following command to start the application:
<pre>npm start</pre>

Your terminal will show the following message:
<pre>
> shopping_cart@1.0.0 start
> node src/index.js

2022-08-22 00:45:14:4514 info: application started, listening on port 3000
2022-08-22 00:45:14:4514 info: products not found, adding products to the database...
</pre>

## How to use the API
Since the application is running locally, we will use http://localhost:3000 as the base url. Using an API client like Postman, Insomnia, etc, you can use the following route as an example:

### POST /cart/
This is an example of the parameters to be sent in the request's body:
```
{
    "code": "minimal-top",
    "quantity": 1
}
```
If the request is sucessfull, it will return a status code of `200` and the shopping cart resume.
![image](https://user-images.githubusercontent.com/26546830/185829440-9999dc28-7eff-4855-a004-f192743d6430.png)

This is an example of a request that is sent with a product that is not listed in the products database:
![image](https://user-images.githubusercontent.com/26546830/185829911-af6c6ca6-16ac-44eb-916e-5246ed1a5813.png)

------------------------
