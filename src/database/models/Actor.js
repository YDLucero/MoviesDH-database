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
            allowNull : false,
        },
       
    }
    const config = {
        tableName : "actors",
        timestamps : true,
        underscored : true
    }

    const Actor = sequelize.define(alias, cols, config)

    return Actor
}