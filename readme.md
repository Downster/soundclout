# SoundClout

SoundClout is a pixel perfect Soundcloud clone that integrates AWS S3, Howler.js, and wavesurfer.js to give users that signature [Soundcloud](https://www.soundcloud.com/) feel.

View and test out SoundClout on [Heroku](https://soundclout-app.herokuapp.com/)

# Index

|
[MVP Feature List](https://github.com/Downster/soundclout/wiki/Feature-List) |
[Database Schema](https://github.com/Downster/soundclout/wiki/Db-Schema) |
[API Documentation](https://github.com/Downster/doggy-done/wiki/API-Documentation) |
[Frontend Routes](https://github.com/Downster/doggy-done/wiki/Frontend-Routes) |

# Technologies Used
Soundclout is built on a React / Redux frontend, an Express backend, and uses a PostgreSQL database.

It uses AWS S3 for image and song uploads, Howler.js to handle and load songs, and wavesurfer.js to create waveforms for each song on its detail page.

<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height=50/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"  height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" height=40 />

# Getting started

1. Clone this repository

   `git clone git@github.com:Downster/doggy-done.git`

2. Install dependencies
   From root: `cd frontend`
   `npm install`
   
   Also from root: 
   `cd backend`
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
Users can upload, like, comment on and listen to songs. All files are stored externally with AWS. The splash page displays the top 8 most liked songs and the discover page displays all songs of certain genres. Users can view a waveform of the song and leave comments at certain times with a reaction. Users can see all of their liked songs by navigating to their library.

# Page Views

### Splash page
This is where a list of the 8 most liked songs appear. Users and non-users alike can listen to songs displayed on this page.
<img src='https://i.imgur.com/GdsyBZj.png'/>

### Song Detail Page


### Sign-up


### Main page view


### Main page detail view







