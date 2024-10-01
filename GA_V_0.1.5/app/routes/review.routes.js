const { getReviews, addReview, updateReview, deleteReview } = require("../controllers/review.controller");
module.exports = (app) => {
  app.get("/api/games/:game_id/reviews", getReviews);
  app.post("/api/users/:user_id/games/:game_id/reviews", addReview);
  app.put("/api/users/:user_id/games/:game_id/reviews/:review_id", updateReview);
  app.delete("/api/users/:user_id/games/:game_id/reviews/:review_id", deleteReview);
};
