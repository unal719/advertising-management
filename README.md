# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Clone Project

Firstly you need to clone project from

"git clone https://github.com/unal719/advertising-management.git"

## Npm Install

Make sure run "npm install" for dependencies

## Available Scripts

You may find client project and backend rest api server

You have to run client project and server at the same time .

## Run Client Project

Run project with "npm run start" and make sure "port:3000" is not using anywhere because project is running in "http://localhost:3000" as a default.

if you dont want to run project on "3000" . You need to change "start" command from package.json file.

Use "start": "set PORT=3006 && react-scripts start" (project running in 3006 port) instead of "start": "react-scripts start" in package.json

## Run Server

For rest api server run "node server/server.js" and make sure "port:5000" is not using anywhere because server is running in "http://localhost:5000/api".
