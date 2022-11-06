# hathway Back-end challenge

Worked on this project over the weekend

- Used Nodejs, express to implement the api
- Used Supertest and Jest to write test for the API's

In order to run the server just run `yarn start` command
In order to run the API tests run `yarn test` command

- Server.js if the main server file, some of the config stuff like BASE_URL, PORT which will not change through out the project are stored in the config file
  - Implemented concurrent API calls using promises in the /api/posts endpoint
- Route folder houses all the different api routes that a user can asses
- Utils/helper.js file house all the helper function which were harnessed in creating API's to respond to the client
  - Helper functions include functions to check validity of the params passed by the user and function to sort and order the post responses according the clients choice
