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
        
        db.Movie.findByPk(id,{
            include:['genre','actors']
        })  
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

                //movie.release_date= movie.release_date.toISOString().split('T')[0];

                return res.render('moviesEdit', {
                    allGenres:genres,
                    Movie:movie
                })
            })
            .catch(error => console.log(error))


    },

    update: function (req,res) {
        const {title, release_date, awards, rating, length, genre_id} =req.body
        db.Movie.update({
            title: title.trim(),
            release_date,
            awards,
            rating,
            length,
            genre_id
        },{
            where: {id:req.params.id}
        })
        .then(()=>{
            res.redirect('/movies/detail/'+ req.params.id)
        })
        .catch(error => console.log(error))

    },

    delete: function (req, res) {
        const {id} =req.params;
        
        db.Movie.findByPk(id)  
            .then((movie)=>{
                return res.render('moviesDelete',{
                    movie
                })
            })
            .catch(error=> console.log(error))
    },

    destroy:(req, res)=> {
        
        db.Actor_Movie.destroy({
            where:{movie_id:req.params.id}
        })
        .then(()=>{
            db.Actor.update({
                favorite_movie_id : null
            },{
                where:{favorite_movie_id:req.params.id}
            })
            .then(()=>{
                db.Movie.destroy({
                    where:{id:req.params.id}
                })
                .then(()=>{
                    return res.redirect('/movies')
                })
            })
            
            
        })
        .catch(error=> console.log(error))
    }
        
};


    




