# To-do List Challenge
![Heroku](https://pyheroku-badge.herokuapp.com/?app=ensolvers-challenge&style=flat)

This app allows you to add, edit and delete your to-do's, so you can manage your time a little better. You can also store your tasks in folders, in order to keep them well organized.

Project made for [Ensolvers](https://www.ensolvers.com/) coding challenge. 


## Live demo


Heroku app: https://ensolvers-challenge.herokuapp.com/


## Usage
In the root folder, type **npm install** in order to install all the dependencies necessary.
Once the app is installed, navigate to http://localhost:3000 in order to use the app.

## 🛠️ Built-in 
### 💅 Front-end
* ReactJS 17.0.2
* Mantine 3.6.4

### 🧠 Back-end
* Node.JS 14.17.3
* Express 4.17.2
* Heroku Postgres (PostgreSQL database as a service)
* Prisma 3.9.2

## Notes
* For development purposes, the folder's name is a unique field in the database, across all users. Because of this, if we create a folder with the same name as an existing one, the server will throw an error.  

## Future improvements
* Custom error management, in both front and back-end. This will handle server errors and notify the user of them.
* Testing. Jest for Unit Testing and Cypress for end-to-end testing.

## ✍️ Author 

**Santiago Cammarano** - [SantiCamm](https://github.com/SantiCamm)