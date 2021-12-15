import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api-test",
  password: "admin",
  port: 5432,
});

export const getComments = (request, h) => {
  return pool
    .query("SELECT * FROM comment")
    .then((results) => h.response(results.rows));
};

export const getCommentById = (request, h) => {
  const id = parseInt(request.params.id);

  return pool
    .query("SELECT * FROM comment WHERE id = $1", [id])
    .then((results) => h.response(results.rows));
};

export const createComment = (request, h) => {
  const { content } = request.payload;

  return pool
    .query("INSERT INTO comment (content) VALUES ($1)", [content])
    .then((results) => h.response(results));
};

export const updateComment = (request, h) => {
  const id = parseInt(request.params.id);
  const { content } = request.payload;

  return pool
    .query("UPDATE comment SET content = $1 WHERE id = $2", [content, id])
    .then((results) => h.response(results));
};

export const deleteComment = (request, h) => {
  const id = parseInt(request.params.id);

  return pool
    .query("DELETE FROM comment WHERE id = $1", [id])
    .then((results) => h.response(results));
};
