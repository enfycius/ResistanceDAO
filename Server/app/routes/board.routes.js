const { authJwt } = require("../middleware");
const controller = require("../controllers/board.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/get/boards",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.getBoards
  );

  app.post(
    "/api/post/board",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.postBoard
  );
};
