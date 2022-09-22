const express = require("express")
const {
  moviesPostRequestHandler,
  moviesDeleteRequestHandler,
  moviesPatchRequestHandler,
  moviesGetRequestHandler,
  moviesGetListRequestHandler,
  moviesImportRequestHandler,
  moviesImportFormRequestHandler,
} = require("../handlers/movies")
const auth = require("../middlewares/auth")
const queryValidator = require("../middlewares/queryValidator")
const { moviesQueryParamsSchema } = require("../schemas/moviesQueryParams")

const router = express.Router()

router.get("/import", auth, moviesImportFormRequestHandler)
router.post("/", auth, moviesPostRequestHandler)
router.delete("/:id", auth, moviesDeleteRequestHandler)
router.patch("/:id", auth, moviesPatchRequestHandler)
router.get("/:id", auth, moviesGetRequestHandler)
router.get(
  "/",
  auth,
  queryValidator(moviesQueryParamsSchema),
  moviesGetListRequestHandler
)
router.post("/import", auth, moviesImportRequestHandler)

module.exports = router
