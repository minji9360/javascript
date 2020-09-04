import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatar/" });

export const localsMiddleware = (request, response, next) => {
	response.locals.siteName = "WeTube";
	response.locals.routes = routes;
	response.locals.loggedUser = request.user || null;
	next();
};

export const onlyPublic = (request, response, next) => {
	if (request.user) {
		response.redirect(routes.home);
	} else {
		next();
	}
};

export const onlyPrivate = (request, response, next) => {
	if (request.user) {
		next();
	} else {
		response.redirect(routes.home);
	}
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
