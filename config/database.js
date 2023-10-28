//require constructor method of sequelize
const {Sequelize}=require("sequelize");

//require dotenv 
require("dotenv").config();

//define the sequelize object
const sequelize=new Sequelize('bookdictionary',process.env.DB_USER,process.env.DB_PASSWORD,{
    dialect:"mysql",
    host:process.env.DB_HOST
})

module.exports=sequelize;
