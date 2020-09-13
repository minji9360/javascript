import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const multerVideo = multer({
	storage: multerS3({
		s3,
		acl: "public-read",
		bucket: "wetube.clone-code/video",
		region: "ap-northeast-2",
	}),
});
const multerAvatar = multer({
	storage: multerS3({
		s3,
		acl: "public-read",
		bucket: "wetube.clone-code/avatar",
	}),
});

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
