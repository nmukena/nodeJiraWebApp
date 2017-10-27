# nodeJiraWebApp

This is an Application which will help provide Project Management Analytics based on information from Jira. 
It was built using ReactJS, Redux and NodeJS. Webpack is used as an Application bundler.

DESCRIPTION:

request.js: Server implemented using NodeJS and ExpressJS. It will serve as the entry point to the application (http://localhost:3000) and it will be making API calls to Jira using provided credentials.

src/js/actions: Contains the Redux actions that are supposed to make API calls to the request.js server.

src/js/reducers: Contains the Redux reducers that both initialize the state of the Application, and update it after an action has been performed. They store the json object that is fetched from Jira, or they keep the error message.

src/js/store.js: Creates the state of the Application that will be initialized and modified by the reducers.

src/js/layout.js: Performs 2 tasks:
    - Holds the main React Component called Layout that is loaded on the HTML page by index.js
    - Connects the state of the Application to the Layout Component, so that the Component changes with the state.

dist/bundle.js: Compiled version of the application that is run on index.html

index.html: Main page that serves as the entry point of the application


INSTALLATION:

1) Install Node.js
>   sudo apt-get install nodejs 
2) NPM
>   sudo apt-get install npm
3) Rename NodeJs to Node
>   sudo ln -s /usr/bin/nodejs /usr/bin/node

4) Install all the dependencies in package.json in your local node-modules folder
>   sudo npm install

5) Provide the Jira Account URL and credentials in request.js

        var URL = "WRITE URL HERE"


        var options = {rejectUnauthorized: this.strictSSL, 
            uri: "", 
            method: 'GET',
            auth: {'user': 'WRITE USERNAME HERE', 
            'pass': 'WRITE PASSWORD HERE'}
        };


6) Run webpack to compile the React-Redux Application.
> npm start
7) Run request.js to start the Node Express server.
> node request.js


