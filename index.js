import Hapi from "@hapi/hapi";
import {
  getComments,
  getCommentById,
  createComment,
  deleteComment,
  updateComment,
} from "./queries.js";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/api/comments",
    handler: getComments,
  });

  server.route({
    method: "GET",
    path: "/api/comments/{id}",
    handler: getCommentById,
  });

  server.route({
    method: "POST",
    path: "/api/comments",
    handler: createComment,
  });

  server.route({
    method: "PUT",
    path: "/api/comments/{id}",
    handler: updateComment,
  });

  server.route({
    method: "DELETE",
    path: "/api/comments/{id}",
    handler: deleteComment,
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
