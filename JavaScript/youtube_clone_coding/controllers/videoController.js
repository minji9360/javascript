import routes from "../routes";
import Video from "../models/Video";

export const home = async (request, response) => {
    try {
        const videos = await Video.find({});
        response.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        response.render("home", { pageTitle: "Home", videos: [] });
    }
};

export const search = (request, response) => {
    const {
        query: { term: searchingBy }
    } = request;
    response.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (request, response) => 
    response.render("upload", { pageTitle: "Upload" });

export const postUpload = (request, response) => {
    const {
        body: { file, title, description }
    } = request;
    // To Do: Upload and save video
    response.redirect(routes.videoDetail(324393));
};

export const videoDetail = (request, response) => 
    response.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (request, response) => 
    response.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (request, response) => 
    response.render("deleteVideo", { pageTitle: "Delete Video" });
