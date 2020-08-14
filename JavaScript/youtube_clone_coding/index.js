const express = require('express');
const app = express();
const PORT = 8080;

function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
}

function handleHome(request, response) {
    console.log(request);
    response.send("Hello from home");
}

function handleProfile(request, response) {
    response.send("You are on my profile");
}

app.get("/", handleHome);
app.get("/profile", handleProfile);
app.listen(PORT, handleListening);