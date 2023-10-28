//require sequelize object
const sequelize = require("../config/database");

//require the dictionary model
const Dictionary = require("../models/Dictionary")

//controller to get all books
exports.getAllBooks=async (req,res)=>{
    const t=await sequelize.transaction();

    try {

        //fetch all the books from the db
        const allBooks=await Dictionary.findAll({});

        //if no books found return a response
        if(!allBooks){
            await t.rollback();
            return res.status(400).json({
                success:false,
                message:"No books available right now!!"
            })
        }

        //commit the transaction after sucessfully fetching all the books from db
        await t.commit();

        res.status(200).json({
            success:true,
            allBooks:allBooks,
            message:"Sucessfully fetched all the books"
        })

    } catch (error) {
        console.log("Error in fetching the books:",error);
        await t.rollback();

        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//controller to get information of a particular book
exports.getBook=async (req,res)=>{
    const t=await sequelize.transaction();

    try {
        //extract id and book name from request params
        const {id}=req.params;
        
        //if id is absent return response
        if(!id){
            await t.rollback();
            return res.status(400).json({
                success:false,
                message:"Please provide a book id"
            })
        }

        //find wheather id provided is valid or not
        const book=await Dictionary.findByPk(id);
        
        //if id is invalid return a response
        if(!book){
            await t.rollback();
            return res.status(404).json({
                success:false,
                message:"The id you provided is invalid!"
            })
        }
        
        //commit transaction after sucessfully fetching the information of book
        await t.commit();

        res.status(200).json({
            success:true,
            bookInfo:book,
            message:"Sucessfully fetched the book information"
        })

    } catch (error) {

        console.log("Error in fetching the books information:",error);
        await t.rollback();

        res.status(500).json({
            success:false,
            message:error.message
        })
    }
    }
