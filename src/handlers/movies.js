const fs = require("fs")
const path = require("path")
const formidable = require("formidable")
const { Sequelize } = require("sequelize")
const { postMoviesSchema } = require("../schemas/movies")
const { Movie } = require("../models/movies")
const convertText = require("../utils/textToObjectsArray")
const setMoviesResponse = require("../utils/setMoviesResponse")

const moviesPostRequestHandler = async (req, res) => {
  try {
    const { error } = postMoviesSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.message })
    }

    const { title, year, format, actors } = req.body

    const existingMovie = await Movie.findOne({
      where: { title: title.trim() },
    })

    if (!existingMovie) {
      const movie = await Movie.create({
        title: title.trim(),
        year,
        format,
        actors: actors.toString(),
      })

      res.status(201).json({
        status: "Success",
        data: movie,
      })
    } else {
      res.status(400).json({ message: `Movie: "${title}" already exists` })
    }
  } catch (error) {
    console.log(error)
  }
}

const moviesDeleteRequestHandler = async (req, res) => {
  const { id } = req.params

  try {
    const movie = await Movie.destroy({ where: { id } })
    if (!movie) {
      return res.status(400).json({
        message: "Cannot find movie with such ID",
      })
    } else {
      return res.status(200).json({
        status: "Success",
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const moviesPatchRequestHandler = async (req, res) => {
  try {
    const { error } = postMoviesSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.message })
    }

    const { title, year, format, actors } = req.body
    const { id } = req.params

    const movie = await Movie.findOne({ where: { id } })
    if (!movie) {
      return res.status(400).json({
        message: "Cannot find movie with such ID",
      })
    } else {
      movie.set({
        title,
        year,
        format,
        actors: actors.toString(),
      })

      const updatedMovie = await movie.save()

      return res.status(200).json({
        status: "Success",
        data: updatedMovie,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const moviesGetRequestHandler = async (req, res) => {
  try {
    const { id } = req.params

    const movie = await Movie.findOne({ where: { id } })
    if (!movie) {
      return res.status(400).json({
        message: "Cannot find movie with such ID",
      })
    } else {
      res.status(201).json({
        status: "Success",
        data: movie,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const moviesGetListRequestHandler = async (req, res) => {
  try {
    const {
      actor,
      title,
      search,
      sort = "id",
      order = "ASC",
      limit = "20",
      offset = "0",
    } = req.query

    let moviesResponse
    const movies = await Movie.findAll({
      order: [[Sequelize.fn("lower", Sequelize.col(sort)), order]],
      limit: Number(limit),
      offset: Number(offset),
    })

    if (actor) {
      moviesResponse = movies.filter((movie) => movie.actors.includes(actor))

      return setMoviesResponse(moviesResponse, res)
    } else if (title) {
      moviesResponse = movies.filter((movie) => movie.title.includes(title))

      return setMoviesResponse(moviesResponse, res)
    } else if (search) {
      moviesResponse = movies.filter(
        (movie) => movie.title.includes(search) || movie.actors.includes(search)
      )

      return setMoviesResponse(moviesResponse, res)
    } else {
      return setMoviesResponse(movies, res)
    }
  } catch (error) {
    console.log(error)
  }
}

const moviesImportFormRequestHandler = async (req, res) => {
  res.send(`
    <h2>Import your movie list</h2>
    <form action="/api/v1/movies/import" enctype="multipart/form-data" method="post">
    <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
    <input type="submit" value="Upload" />
    </form>
  `)
}

const moviesImportRequestHandler = async (req, res) => {
  try {
    const form = formidable()

    form.parse(req, (error, fields, files) => {
      if (error) {
        console.log(error)
        return res.status(500).json({
          message: "Something went wrong",
        })
      }
      if (files?.someExpressFiles?.mimetype !== "text/plain") {
        return res.send(`<h2>File must be .txt format</h2>`)
      }
      const tempFilePath = files?.someExpressFiles?.filepath
      const projectFilePath = path.join(
        __dirname,
        "/../../uploaded-files/",
        files?.someExpressFiles?.originalFilename
      )
      fs.copyFile(tempFilePath, projectFilePath, (error) => {
        if (error) {
          console.log(error)
        }
        fs.readFile(projectFilePath, "utf8", (error, data) => {
          if (error) {
            console.log(error)
          }
          const movies = convertText(data)
          movies.forEach(async (movie) => {
            await Movie.create({
              title: movie.title,
              year: movie.year,
              format: movie.format,
              actors: movie.actors.toString(),
            })
          })

          res.status(200).json({
            status: "Success",
            data: movies,
            meta: {
              imported: movies.length,
            },
          })
        })
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  moviesPostRequestHandler,
  moviesDeleteRequestHandler,
  moviesPatchRequestHandler,
  moviesGetRequestHandler,
  moviesGetListRequestHandler,
  moviesImportRequestHandler,
  moviesImportFormRequestHandler,
}
