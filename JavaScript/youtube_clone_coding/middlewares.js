import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "videos/" });

export const localsMiddleware = (request, response, next) => {
    response.locals.siteName = "WeTube";
    response.locals.routes = routes;
    response.locals.user = {
        isAuthenticated: true,
        id: 1
    }
    next();
}

export const uploadVideo = multerVideo.single("videoFile");
