import routes from "./routes";

export const localsMiddleware = (request, response, next) => {
    response.locals.siteName = "WeTube";
    response.locals.routes = routes;
    response.locals.user = {
        isAuthenticated: true,
        id: 1
    }
    next();
}
