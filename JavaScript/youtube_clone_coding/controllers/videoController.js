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

export const getUpload = async(request, response) => 
    response.render("upload", { pageTitle: "Upload" });

export const postUpload = async(request, response) => {
    const { 
        body: { title, description }, 
        file: { path }
    } = request;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    console.log(newVideo);
    // To Do: Upload and save video
    response.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (request, response) => { 
    const {
        params: {id}
    } = request;
    try {
        const video = await Video.findById(id);
        response.render("videoDetail", { pageTitle: "Video Detail", video });
    } catch (error) {
        console.log(error);
        response.redirect(routes.home);
    }
}

export const editVideo = (request, response) => 
    response.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (request, response) => 
    response.render("deleteVideo", { pageTitle: "Delete Video" });
