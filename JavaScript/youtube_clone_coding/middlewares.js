import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (request, response, next) => {
	response.locals.siteName = "WeTube";
	response.locals.routes = routes;
	response.locals.user = request.user || null;
	console.log(request.user);
	next();
};

export const uploadVideo = multerVideo.single("videoFile");
