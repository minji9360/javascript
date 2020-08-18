import routes from "../routes";

export const localsMiddleware = (request, response, next) => {
    response.locals.siteName = "WeTube";
    response.locals.routes = routes;
    next();
}
