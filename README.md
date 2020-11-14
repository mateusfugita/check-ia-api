<h1 align='center'>Check-IA API</h1>
<p align="center">Back-end of the Check-IA project :airplane:</p>
<p align="center">
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&logo=node.js&logoColor=white" alt="Node.js" />
  </a>
   <a href="https://www.mongodb.com/">
    <img src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&logo=mongodb&logoColor=white" alt="MongoDB" />
  </a>
  <img src="https://heroku-badge.herokuapp.com/?app=check-ia-api" />
</p>

## ⚒️ Technologies
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [MongoDB](https://www.mongodb.com/)

## :gear: Configuring the application
1. Before you begin, you need to install the [Node.js](https://nodejs.org/en/) on your machine and create a database on [MongoDB](https://www.mongodb.com/). In addition, run the [ML API](https://github.com/mateusfugita/check-ia-ml) on your machine before continuing.
2. Generate an API Key from Unsplash by creating a developer account [here](https://unsplash.com/join).
3. In the application folder, copy the .env.example file and create a file called .env

   ```
   cp .env.example .env
   ```

4. Open the .env file and add the Unsplash API Key that you generated previously.

   ```
   UNSPLASH_APIKEY=
   ```

5. Still in the .env file, add the connection URL from MongoDB (`MONGO_URL`) and a secret key to work with JWT authentication (`SECRET`). The `ML_API_URL` is not necessary if you are running the ML API locally.

## :computer: Running locally
1. Install the dependencies

   ```
   npm install
   ```

2. Run the application
    - To run in development mode
    
       ```
       npm run dev
       ```
    
    - To run in production mode
    
       ```
       npm start
       ```
    
3. The application will be running in `localhost:3333`.
