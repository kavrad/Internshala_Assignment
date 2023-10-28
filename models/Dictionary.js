//require sequelize to define the model
const sequelize=require("../config/database");

//require datatypes from sequelize
const {DataTypes}=require("sequelize");

//define dictionary model using sequelize
const Dictionary=sequelize.define("Dictionary",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    book:{
        type:DataTypes.STRING,
        allowNull:false
    },
    author:{
        type:DataTypes.STRING,
        
    }

})

module.exports=Dictionary;
