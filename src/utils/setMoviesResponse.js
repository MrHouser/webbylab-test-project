const setMoviesResponse = (moviesArr, response) => {
  if (moviesArr.length === 0) {
    return response.status(404).json({
      status: "Not found",
      message: "Nothing was found for your request",
    })
  } else {
    return response.status(200).json({
      status: "Success",
      data: moviesArr,
      meta: { total: moviesArr.length },
    })
  }
}

module.exports = setMoviesResponse
