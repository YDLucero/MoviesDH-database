const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {
        db.Genre.findAll({
            order:[['name']],
            include:['movies']
        })
            .then(genres => {
                res.render('genresList', {genres})
            })
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id,{include:['movies']})
            .then(genre => {
                
                res.render('genresDetail', {genre});
            });
    }

}

module.exports = genresController;