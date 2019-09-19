"use strict";
const { transaction } = require("objection");
const User = require("../db/models/User");
const bcrypt = require("bcryptjs");
const RestrictedMiddleware = require("../auth/restricted-middleware");

module.exports = router => {
	router.get("/users", RestrictedMiddleware, (req, res) => {
		const getusers = async () => {
			const users = await transaction(User.knex(), trx => {
				return User.query(trx);
			});
			res.send(users);
		};
		return getusers();
	});
};

function createStatusCodeError(statusCode) {
	return Object.assign(new Error(), {
		statusCode
	});
}
