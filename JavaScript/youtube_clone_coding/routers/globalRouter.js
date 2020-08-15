import express from "express";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, (request, response) => response.send("Home"));
globalRouter.get(routes.join, (request, response) => response.send("Join"));
globalRouter.get(routes.login, (request, response) => response.send("Login"));
globalRouter.get(routes.logout, (request, response) => response.send("Logout"));
globalRouter.get(routes.search, (request, response) => response.send("Search"));

export default globalRouter;
