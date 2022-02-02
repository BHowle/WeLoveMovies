const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { is_showing } = req.query;
  const response =
    is_showing === "true" ? await service.listShowing() : await service.list();

  res.json({ data: response });
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

async function listReviews(req, res) {
  const movieId = res.locals.movie.movie_id;
  const reviews = await service.listReviews(movieId);
  const allReviews = [];
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const critic = await service.getCritics(review.critic_id);
    review.critic = critic[0];
    allReviews.push(review);
  }
  res.status(200).json({ data: allReviews });
}

async function listTheaters(req, res) {
  const movieId = res.locals.movie.movie_id;
  const result = await service.listTheaters(movieId);
  res.status(200).json({ data: result });
}

//verification functions
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  listReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviews),
  ],
  listTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheaters),
  ],
};
