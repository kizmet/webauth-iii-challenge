const Knex = require("knex");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const knexConfig = require("./knexfile");
const promiseRouter = require("express-promise-router");
//router APIs
const UsersRoutes = require("./api/users-routes");
const AuthenticationRoutes = require("./api/auth-routes");
//middleware
const Restricted = require("./auth/restricted-middleware");
const { Model } = require("objection");

const knex = Knex(knexConfig.development);
const knexDb = Knex(knexConfig.development);
Model.knex(knex); //objection

const router = promiseRouter();
const restrictedRouter = promiseRouter();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      callback(null, true);
    }
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.set("json spaces", 2);
app.use(helmet());

app.use("/api", router);
app.use("/api/restricted", restrictedRouter);

app.use((err, req, res, next) => {
  if (err) {
    res
      .status(err.statusCode || err.status || 500)
      .send(err.data || err.message || {});
  } else {
    next();
  }
});
AuthenticationRoutes(router);
UsersRoutes(restrictedRouter);

const server = app.listen(8641, () => {
  console.log("Example app listening at port %s", server.address().port);
});
