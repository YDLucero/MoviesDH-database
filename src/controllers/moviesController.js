const db = require('../database/models')
const { Op } = require("sequelize");

module.exports = {
    list:(req,res)=>{
        db.Movie.findAll(
            {order:[['title']]}
        )
        
            .then((movies)=>{
                return res.render('moviesList',{
                    movies
                })
            })
            .catch(error=> console.log(error))
    },

    new:(req,res)=>{
        db.Movie.findAll({
            order :[
                ['release_date', 'DESC']
            ], limit : 5
        })
            .then(movies=>{
                return res.render('newestMovies',{
                    movies
                })
            })
            .catch(error=> console.log(error))
    },

    recommended: (req, res) => {
        db.Movie.findAll({
            where: {
                rating: { [Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ], limit: 10
        })
            .then(movies => {
                return res.render('recommendedMovies', {
                    movies
                })
            })
            .catch(error => console.log(error))
    },

    detail:(req,res)=>{
        const {id} =req.params;
        
        db.Movie.findByPk(id)  
            .then((movie)=>{
                return res.render('moviesDetail',{
                    movie
                })
            })
            .catch(error=> console.log(error))
    },
    
    add:(req, res)=> {
        db.Genre.findAll({
            order:[['name']]
        })
          .then(genres=>{
            return res.render('moviesAdd',{
                genres
            })
          })
          .catch(error=> console.log(error))
    },

    create:(req, res)=> {
        const {title, release_date, awards, rating, length, genre_id} =req.body

        if ([title, release_date, awards, rating, length, genre_id].includes("")) {
            db.Genre.findAll({
                order: [['name']]
            })
                .then(genres => {
                    return res.render('moviesAdd', {
                        errMessage: "es basura", genres
                    })
                })
                .catch(error => console.log(error))

        } else {
            db.Movie.create({
                title: title.trim(),
                release_date,
                awards: +awards,
                rating: +rating,
                length: +length,
                genre_id
            })
                .then(newMovie => {
                    console.log(newMovie)
                    return res.redirect('/movies/detail/' + newMovie.id)
                })
                .catch(error => console.log(error))
        }

        
    },

    edit:(req,res)=>{
        const genres = db.Genre.findAll({
            order: [['name']]
        })
        const movie = db.Movie.findByPk(req.params.id)

        Promise.all([genres, movie])
            .then(([genres, movie]) => {
                return res.render('moviesEdit', {
                    genres,
                    movie
                })
            })
            .catch(error => console.log(error))


    },

    update: function (req,res) {
        // TODO
    },
    delete: function (req, res) {
        // TODO
    },
    destroy: function (req, res) {
        // TODO
    }
    

}


