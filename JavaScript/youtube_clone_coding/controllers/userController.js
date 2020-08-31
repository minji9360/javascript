import routes from "../routes";
import User from "../models/User";

export const getJoin = (request, response) =>
	response.render("join", { pageTitle: "Join" });

export const postJoin = async (request, response) => {
	const {
		body: { name, email, password, password2 },
	} = request;
	if (password !== password2) {
		response.status(400);
		response.render("join", { pageTitle: "Join" });
	} else {
		try {
			const user = await User({
				name,
				email,
			});
			await User.register(user, password);
		} catch (error) {
			console.log(error);
		}
		// To Do: Log user in
		response.redirect(routes.home);
	}
};

export const getLogin = (request, response) =>
	response.render("login", { pageTitle: "Login" });

export const postLogin = (request, response) => response.redirect(routes.home);

export const logout = (request, response) =>
	// To Do: Process Log Out
	response.redirect(routes.home);

export const users = (request, response) =>
	response.render("users", { pageTitle: "Users" });
export const userDetail = (request, response) =>
	response.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (request, response) =>
	response.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (request, response) =>
	response.render("changePassword", { pageTitle: "Chnage Password" });
