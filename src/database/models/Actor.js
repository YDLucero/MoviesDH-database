module.exports = (sequelize,  dataTypes) => {
    const alias = "Actor";
    const cols = {
        id : {
            type : dataTypes.BIGINT(10).UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        first_name : {
            type : dataTypes.STRING(100),
            allowNull : false,
            
        },
        last_name : {
            type : dataTypes.STRING(100),
            allowNull : false,
            
        },
        rating : {
            type : dataTypes.DECIMAL(3,1),
            allowNull : true
        },
        favorite_movie_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : true,
        },
       
    }
    const config = {
        tableName : "actors",
        timestamps : true,
        underscored : true
    }

    const Actor = sequelize.define(alias, cols, config)

    //relaciones entre tablas
    Actor.associate = function (models) {
        Actor.belongsToMany(models.Movie, {
            as : 'movies',
            foreignKey : 'actor_id',
            otherKey : 'movie_id',
            through : 'actor_movie'
        }),
        Actor.belongsTo(models.Movie, {
            as : 'favorite',
            foreignKey : 'favorite_movie_id'
        })
    }

    return Actor
}