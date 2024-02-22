const db = require('../database/models');



const actorsController = {
    'list': (req, res) => {
        db.Actor.findAll({
            order:[['first_name']]
        })
            .then(actors => {
                res.render('actorsList', {actors})
            })
    },
    'detail': (req, res) => {
        db.Actor.findByPk(req.params.id,{
            include:['movies','favorite']
        })
            .then(actor => {
                res.render('actorsDetail', {actor});
            });
    }

}

module.exports = actorsController;