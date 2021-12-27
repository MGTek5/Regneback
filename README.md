# RegneBack

the backend for [Regnessem](https://github.com/MGTek5/Regnessem)

## Stack

- Docker Compose
- MongoDB
- NestJS

## Running the App

### In Production

Simply run `docker compose up -d` and the app should be available on port 5000

### In Development

To create a database, you can run `docker compose up -d mongo`

To run the API, first run `npm install` then `sh run.sh`