# SoundClout

SoundClout is a pixel perfect Soundcloud clone that integrates AWS S3, Howler.js, and wavesurfer.js to give users that signature Soundcloud feel.[Soundcloud](https://www.soundcloud.com/).

View and test out SoundClout on [Heroku](https://soundclout-app.herokuapp.com/)

# Index

|
[MVP Feature List](https://github.com/Downster/doggy-done/wiki/Feature-List) |
[Database Schema](https://github.com/Downster/doggy-done/wiki/Database-Schema) |
[API Documentation](https://github.com/Downster/doggy-done/wiki/API-Documentation) |
[Frontend Routes](https://github.com/Downster/doggy-done/wiki/Frontend-Routes) |
[User Stories](https://github.com/Downster/doggy-done/wiki/User-Stories) |

# Technologies Used

<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height=50/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"  height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" height=40 />

# Getting started

1. Clone this repository

   `git clone git@github.com:Downster/doggy-done.git`

2. Install dependencies

   `npm install`

3. Create a .env file based on the .env.example given

4. Setup your username and database based on what you setup in your .env

5. Migrate and Seed models

   `npx dotenv sequelize db:migrate` &&
   `npx dotenv sequelize db:seed:all`

6. Start the app using:

   `npm start`

7. You can use the Demo user or create an account

# Live

### Features

Doggy Done allows logged-in users to add/edit/delete/get features from the home page without ever redirecting from the base page.

Logged in users can:

- Add/Edit/Delete Lists
- Add/Edit/Delete Tasks
- Add/Edit/Delete Dogs
- View Tasks by Category: All, Due Today, Due Tomorrow, Completed, Overdue and User-Created List Categories
- View Tasks assigned to a certain dog
- Search for Tasks
- View Task details

# Page Views

### Splash page
<img src='https://i.imgur.com/j9XZqVy.png'/>

### Login 
<img src='https://imgur.com/nUFcF4R.png'/>

### Sign-up
<img src='https://imgur.com/nUFcF4R.png' />

### Main page view
<img src='https://imgur.com/paEhovp.png' />

### Main page detail view
<img src='https://imgur.com/inFqfV1.png' />






