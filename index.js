//require express
const express=require("express");

//require dotenv to load the environment variables
require("dotenv").config();

//require sequelize ORM
const sequelize=require("./config/database");

//import book routes 
const bookRoutes=require("./routes/Book");

//define port
const port=process.env.PORT || 6000;

//initialize the server using express
const app=express();

//middleware to parse the request body
app.use(express.json());

app.use("/api/v1/book",bookRoutes);

//synchronize the database models using sequelize
sequelize.sync().then(()=>{
    app.listen(port,(err)=>{
        try {
            if(err){
                throw err;
            }
           console.log(`Server running sucessfully on port ${port}`) 
        } catch (error) {
            console.log(`Error in running the server on port ${port}`);
            process.exit(1);
        }
    })
    console.log("Sucessfully connected to db");
}).catch((err)=>{
    console.log("Error ocuured while connecting to db",err);
    process.exit(1);
})
