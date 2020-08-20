import routes from "../routes";

export const getJoin = (request, response) => 
    response.render("join", { pageTitle: "Join" });

export const postJoin = (request, response) => {
    const {
        body: { name, email, password, password2 }
    } = request;
    if (password !== password2) {
        response.status(400);
    } else {
        // To Do: Register User
        // To Do: Log user in
        response.redirect(routes.home);
    }
    response.render("join", { pageTitle: "Join" });
}

export const getLogin = (request, response) => 
    response.render("login", { pageTitle: "Login" });

export const postLogin = (request, response) =>
    response.redirect(routes.home);

export const logout = (request, response) => 
    response.render("logout", { pageTitle: "Logout" });
export const users = (request, response) => 
    response.render("users", { pageTitle: "Users" });
export const userDetail = (request, response) => 
    response.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (request, response) => 
    response.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (request, response) => 
    response.render("changePassword", { pageTitle: "Chnage Password" });
