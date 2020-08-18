export const join = (request, response) => 
    response.render("join", { pageTitle: "Join" });
export const login = (request, response) => 
    response.render("login", { pageTitle: "Login" });
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
