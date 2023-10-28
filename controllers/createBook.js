//require sequelize object
const sequelize = require("../config/database");

//require the dictionary model
const Dictionary = require("../models/Dictionary");


exports.createBook=async (req,res)=>{
    const t=await sequelize.transaction();
    try {
        //extract author and book name from request body
        const {bookName,author}=req.body;
        
        //if any of the field is absent return a response
        if(!bookName || !author){
            await t.rollback();
            return res.status(400).json({
                success:false,
                message:"Please provide the missing feilds!!"
            })
        }
        
        //Otherwise create an entry in the db
        const newBook=await Dictionary.create({
            id:Math.floor(Math.random() * 100) + 1,
            book:bookName,
            author:author
        },{transaction:t})
         
        //commit the transaction after sucessful db entry
        await t.commit();
        
        //return sucessful response
        res.status(200).json({
            success:true,
            newBook:newBook,
            message:"Sucessfully created a book"
        })

    } catch (error) {
        console.log("Error in creating a book",error);
        await t.rollback();

        res.status(500).json({
            success:false,
            message:"Unable to create a book"
        })
    }
}