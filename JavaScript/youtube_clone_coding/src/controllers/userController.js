import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (request, response) =>
	response.render("join", { pageTitle: "Join" });

export const postJoin = async (request, response, next) => {
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
			next();
		} catch (error) {
			console.log(error);
			response.redirect(routes.home);
		}
	}
};

export const getLogin = (request, response) =>
	response.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
	failureRedirect: routes.login,
	successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
	const {
		_json: { id, avatar_url: avatarUrl, name, email },
	} = profile;
	try {
		const user = await User.findOne({ email });
		if (user) {
			user.githubId = id;
			user.save();
			return cb(null, user);
		}
		const newUser = await User.create({
			email,
			name,
			githubId: id,
			avatarUrl,
		});
		return cb(null, newUser);
	} catch (error) {
		return cb(error);
	}
};

export const postGithubLogIn = (request, response) => {
	response.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (_, __, profile, cb) => {
	const {
		_json: { id, name, email },
	} = profile;
	try {
		const user = await User.findOne({ email });
		if (user) {
			user.facebookId = id;
			user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
			user.save();
			return cb(null, user);
		}
		const newUser = await User.create({
			email,
			name,
			facebookId: id,
			avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
		});
		return cb(null, newUser);
	} catch (error) {
		return cb(error);
	}
};

export const postFacebookLogin = (request, response) => {
	response.redirect(routes.home);
};

export const logout = (request, response) => {
	request.logout();
	response.redirect(routes.home);
};

export const getMe = (request, response) => {
	response.render("userDetail", {
		pageTitle: "User Detail",
		user: request.user,
	});
};

export const userDetail = async (request, response) => {
	const {
		params: { id },
	} = request;
	try {
		const user = await User.findById(id).populate("videos");
		response.render("userDetail", { pageTitle: "User Detail", user });
	} catch (error) {
		response.redirect(routes.home);
	}
};

export const getEditProfile = (request, response) =>
	response.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (request, response) => {
	const {
		body: { name, email },
		file,
	} = request;
	try {
		await User.findByIdAndUpdate(request.user.id, {
			name,
			email,
			avatarUrl: file ? file.location : request.user.avatarUrl,
		});
		response.redirect(routes.me);
	} catch (error) {
		response.redirect(routes.editProfile);
	}
};

export const getChangePassword = (request, response) =>
	response.render("changePassword", { pageTitle: "Chnage Password" });

export const postChangePassword = async (request, response) => {
	const {
		body: { oldPassword, newPassword, newPassword1 },
	} = request;
	try {
		if (newPassword !== newPassword1) {
			response.status(400);
			response.redirect(`/users/${routes.changePassword}`);
			return;
		}
		await request.user.changePassword(oldPassword, newPassword);
		response.redirect(routes.me);
	} catch (error) {
		response.status(400);
		response.redirect(`/users/${routes.changePassword}`);
	}
};
