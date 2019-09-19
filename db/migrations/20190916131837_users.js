exports.up = knex => {
	return knex.schema.createTable("users", table => {
		table.increments("id").primary();
		table.string("username");
		table.string("password");
		table.string("department");
	});
};

exports.down = knex => {
	return knex.schema.dropTableIfExists("users");
};
