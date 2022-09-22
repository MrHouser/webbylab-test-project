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

router.get("/import", moviesImportFormRequestHandler)
router.post("/", moviesPostRequestHandler)
router.delete("/:id", moviesDeleteRequestHandler)
router.patch("/:id", moviesPatchRequestHandler)
router.get("/:id", moviesGetRequestHandler)
router.get(
  "/",
  queryValidator(moviesQueryParamsSchema),
  moviesGetListRequestHandler
)
router.post("/import", moviesImportRequestHandler)

module.exports = router
