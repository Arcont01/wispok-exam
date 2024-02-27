# Welcome to Wispok Users CRUD!

Users CRUD with import users excel

## Setup project in local environment
If you want to setup the project in your local environment you need MySQL 8.2 and Node.js 20 LTS and copy de file `.env.example` and create `.env` and change the credentials of database in `.env` after you can run the command `npm run dev`

## Setup project in docker environment
If you want to setup the project in docker environment copy de file `.env.example` and create `.env` and change the credentials of database in `.env` if is necessary because in `.env.example` are the credentials of database in the docker container after if you work in a UNIX environment you can run `make build` command after you can run the command `make start` if you don't work in UNIX environment you can run `docker-compose up -d --build --no-start` if you don't want to start the container after build it and after `docker-compose start` or just run `docker-compose up -d --build` for build and start

## Insomnia endpoints
In the project exist a insomnia backup to use the API easier

## Import users
Endpoint to import users by xlsx file(file example in usuarios-examen.xlsx) with first column with title, this you have to use a multipart form

file example:
| nombre | email | password |
|--|--|--|
| prueba | prueba@prueba.com | prueba1 |

Method: `POST`
URL: `http://localhost:3000/api/v1/users/import`
Headers: 

 - `Content-Type: multipart/form-data`

Payload: `{
	"file": "usuarios-examen.xlsx",
}`

## Login
Endpoint to login in API
Method: `PÒST`
URL: `http://localhost:3000/api/v1/auth/login`
Headers: 

 - `Content-Type: application/json`

Payload: `{
	"email": "usuario1@prueba.com",
	"password": "Prueba1"
}`

## Create User (auth)
Endpoint to create user at this endpoint is necessary authenticate with token
Method: `POST`
URL: `http://localhost:3000/api/v1/users/`
Headers: 

 - `Content-Type: application/json`
 - `auth-token: TOKEN`

Payload: `{
	"name": "Prueba",
	"email": "prueba5@prueba.com",
	"password": "Prueba"
}`

## Get User (auth)
Endpoint to get user at this endpoint is necessary authenticate with token
Method: `GET`
URL: `http://localhost:3000/api/v1/users/{USER_ID}`
Headers: 

 - `Content-Type: application/json`
 - `auth-token: TOKEN`
 
## List Users (auth)
Endpoint to list users at this endpoint is necessary authenticate with token
Method: `GET`
URL: `http://localhost:3000/api/v1/users?page=<PAGE>&pageSize=<page_size>`
Query Parameters:

 - `PAGE(integer) : number of page`
 - `PAGE_SIZE(integer) : number of users`

Headers: 

 - `Content-Type: application/json`
 - `auth-token: TOKEN`

## Update Users (auth)
Endpoint to update users at this endpoint is necessary authenticate with token
Method: `PUT`
URL: `http://localhost:3000/api/v1/users`
Headers: 

 - `Content-Type: application/json`
 - `auth-token: TOKEN`

Payload: `{
	"name": "Prueba",
	"email": "prueba5@prueba.com",
	"password": "Prueba"
}`

## Delete Users (auth)
Endpoint to delete users at this endpoint is necessary authenticate with token
Method: `DELETE`
URL: `http://localhost:3000/api/v1/users/<USER_ID>`
Headers: 

 - `Content-Type: application/json`
 - `auth-token: TOKEN`
