import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
// Home
export const home = async (request, response) => {
	try {
		const videos = await Video.find({}).sort({ _id: -1 });
		response.render("home", { pageTitle: "Home", videos });
	} catch (error) {
		console.log(error);
		response.render("home", { pageTitle: "Home", videos: [] });
	}
};

// Search
export const search = async (request, response) => {
	const {
		query: { term: searchingBy },
	} = request;
	let videos = [];
	try {
		videos = await Video.find({
			title: { $regex: searchingBy, $options: "i" },
		});
	} catch (error) {
		console.log(error);
	}
	response.render("search", { pageTitle: "Search", searchingBy, videos });
};

// Upload
export const getUpload = async (request, response) =>
	response.render("upload", { pageTitle: "Upload" });

export const postUpload = async (request, response) => {
	const {
		body: { title, description },
		file: { location },
	} = request;
	console.log(request.file);
	const newVideo = await Video.create({
		fileUrl: location,
		title,
		description,
		creator: request.user.id,
	});
	request.user.videos.push(newVideo.id);
	request.user.save();
	response.redirect(routes.videoDetail(newVideo.id));
};

// Detail
export const videoDetail = async (request, response) => {
	const {
		params: { id },
	} = request;
	try {
		const video = await Video.findById(id)
			.populate("creator")
			.populate("comments");
		response.render("videoDetail", { pageTitle: video.title, video });
	} catch (error) {
		console.log(error);
		response.redirect(routes.home);
	}
};

// Edit Video
export const getEditVideo = async (request, response) => {
	const {
		params: { id },
	} = request;
	try {
		const video = await Video.findById(id);
		if (String(video.creator) !== request.user.id) {
			throw Error();
		} else {
			response.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
		}
	} catch (error) {
		response.redirect(routes.home);
	}
};

export const postEditVideo = async (request, response) => {
	const {
		params: { id },
		body: { title, description },
	} = request;
	try {
		await Video.findOneAndUpdate({ _id: id }, { title, description });
		response.redirect(routes.videoDetail(id));
	} catch (error) {
		response.redirect(routes.home);
	}
};

// Delete Video
export const deleteVideo = async (request, response) => {
	const {
		params: { id },
	} = request;
	try {
		await Video.findOneAndRemove({ _id: id });
	} catch (error) {
		console.log(error);
	}
	response.redirect(routes.home);
};

// Register Video View
export const postRegisterView = async (request, response) => {
	const {
		params: { id },
	} = request;
	try {
		const video = await Video.findById(id);
		video.views += 1;
		video.save();
		response.status(200);
	} catch (error) {
		response.status(400);
	} finally {
		response.end();
	}
};

// Add Comment
export const postAddComment = async (request, response) => {
	const {
		params: { id },
		body: { comment },
		user,
	} = request;
	try {
		const video = await Video.findById(id);
		const newComment = await Comment.create({
			text: comment,
			creator: user.id,
		});
		video.comments.push(newComment.id);
		video.save();
	} catch (error) {
		response.status(400);
	} finally {
		response.end();
	}
};
