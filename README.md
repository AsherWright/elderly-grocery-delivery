# elderly-grocery-delivery
A web app that connects elderly to people who will go grocery shopping for them. Starting in Montreal.

## Stack
Hoping to use RoR backend, React frontend, MySQL

## Resources
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend

## Running Application inside Docker for Development
Set up the Envirnoment vairables in the `.env` file by running:
-   `cp .env.dist .env`
and set the variables in the `.env` file accordingly.

From the project directory first build the container:
-   `docker-compose build`
Then launch the web, wepacker, and db services to launch the app by running:
-   `docker-compose up`
The app is the running on localhost:3000.