import Hapi from "@hapi/hapi";
// import { getComments } from "./queries.js";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api-test",
  password: "admin",
  port: 5432,
});

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/api/comments",
    handler: async (request, h) => {
      await pool.query("SELECT * FROM comment", (error, results) => {
        if (error) {
          throw error;
        }
        console.log(h.response(results.rows));
      });
    },
  });

  // server.route({
  //   method: "GET",
  //   path: "/api/comments/{id}",
  //   handler: getComments,
  // });

  // server.route({
  //   method: "POST",
  //   path: "/api/comments",
  //   handler: getComments,
  // });

  // server.route({
  //   method: "PUT",
  //   path: "/api/comments/{id}",
  //   handler: getComments,
  // });

  // server.route({
  //   method: "DELETE",
  //   path: "/api/comments/{id}",
  //   handler: getComments,
  // });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
