# Dynamic-Blog

Welcome to the project of building a dynamic website where users can generate content in a simple and easy way. By this, we mean the creation and edition of blog posts. Users will also be able to create accounts to create their own blogs. This project includes both frontend and backend development, so anyone interested can view the code and understand how it works.

With this tool, users can easily create and edit their own blogs, as well as create new accounts for others to create their own blogs. The project is available in this repository so that anyone interested can explore the code and understand its functionality. We hope you enjoy this project and find it useful for your online blogging needs.

This project was created using:
* Next.js
* Tailwindcss
* Docker
* Nest.js
* TypeORM
* Passport.js
* JWT
* MySql

## Backend

Once the repository is downloaded you first need to make sure you have node.js and docker installed, once you are in the backend folder do the following, before executing the backend or the frontend you must execute the command to install all the necessary dependencies.

```
npm install
```

```
docker-compose up -d phpmyadmin
```
This is necessary as it will generate the containers needed to manipulate and use the mysql database, it's also important to create an .env file to create our environment variables.

```
TYPEORM_CONNECTION=mysql
DATABASE_USER=root
DATABASE_PASSWORD=123456
DATABASE_NAME=my_db
DATABASE_PORT=3306
DATABASE_HOST=localhost
TYPEORM_SYNCHRONIZE=true
TYPEORM_MIGRATION=dist/db/migrations/*.js
SECRET=hSpg3Pn0xUmR5wleBIjCyQ1uXcLfd8Va
```
Now run the command to run our backend.

```
npm run start:dev
```

## Frontend

Just run the necessary commands to turn on the interface.
```
npm run dev
```
or
```
npm run build
npm run start
```
