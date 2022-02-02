const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const knex = require("../db/connection");

async function destroy(req, res) {
  await service.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

async function update(req, res) {
  const time = new Date().toISOString();
  const reviewId = res.locals.review.review_id;
  const updatedReview = {
    ...req.body.data,
    review_id: reviewId,
  };
  await service.update(updatedReview);
  const updatedResponse = await service.updateCritic(reviewId);
  const data = { ...updatedResponse[0], created_at: time, updated_at: time };
  res.json({ data });
}

//verification functions
async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
