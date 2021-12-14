import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api-test",
  password: "admin",
  port: 5432,
});

export const getComments = (request, response) => {
  pool.query("SELECT * FROM comment", (error, results) => {
    if (error) {
      throw error;
    }
    return response.status(200).json(results.rows);
  });
};

export const getCommentById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM comment WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const createComment = (request, response) => {
  const { content } = request.body;

  pool.query(
    "INSERT INTO comment (content) VALUES ($1)",
    [content],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Comment added with ID: ${result.insertId}`);
    }
  );
};

export const updateComment = (request, response) => {
  const id = parseInt(request.params.id);
  const { content } = request.body;

  pool.query(
    "UPDATE comment SET content = $1 WHERE id = $2",
    [content, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Comment modified with ID: ${id}`);
    }
  );
};

export const deleteComment = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM comment WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Comment deleted with ID: ${id}`);
  });
};
