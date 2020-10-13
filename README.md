# Check-IA API

## Configuring the application
1. Generate an API Key from Unsplash by creating a developer account [here](https://unsplash.com/join).
2. In the application folder, copy the .env.example file and create a file called .env

   ```
   cp .env.example .env
   ```

3. Open the .env file and add the Unsplash API Key that you generated previously.

   ```
   UNSPLASH_APIKEY=
   ```

4. If you want to use the country prediction route, clone and run [this repository](https://github.com/mateusfugita/check-ia-ml) before continuing the next steps.

## Run locally
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
    
3. The application will be running in `localhost:3000`.
