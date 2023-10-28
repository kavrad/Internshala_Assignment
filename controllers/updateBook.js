//require sequelize object
const sequelize = require("../config/database");

//require the dictionary model
const Dictionary = require("../models/Dictionary");

//controller to update the book information
exports.updateBook=async (req,res)=>{
    const t=await sequelize.transaction();
    try {
        //extract id and book name from request body
        const {id,bookName}=req.body;

        //if any of the feilds is absent return response
        if(!id || !bookName){
            await t.rollback();
            return res.status(400).json({
                success:false,
                message:"Please provide all the fields"
            })
        }

        //check weather the id provided is valid or not
        const bookId=await Dictionary.findByPk(id);

        //if no book found return a response
        if(!bookId){
            await t.rollback();
            return res.status(404).json({
                success:false,
                message:"Please provide a valid bookid"
            })
        }

        //otherwise update the book information
        const updatedBook=await Dictionary.update({book:bookName},{
            where:{
                id:id
            }
        },{transaction:t})
        
        //fetch the book info to display updated details
        const bookDetails=await Dictionary.findByPk(id)
       
        //commit the transaction after sucessfully updating the book information in the db
        await t.commit();

        res.status(200).json({
            success:true,
            bookInfo:bookDetails,
            message:"Sucessfully updated the book info"
        })
    } catch (error) {
        console.log("Error in updating the book details",error);
        await t.rollback();

        res.status(500).json({
            success:false,
            message:"Unable to create a book"
        })
    }
    }
