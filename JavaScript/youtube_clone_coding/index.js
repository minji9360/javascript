import express from "express";
const app = express();
const PORT = 8080;

const handleListening = () => 
    console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (request, response) => response.send("Hello from 223");

const handleProfile = (request, response) => response.send("You are on my profile");

app.get("/", handleHome);
app.get("/profile", handleProfile);
app.listen(PORT, handleListening);