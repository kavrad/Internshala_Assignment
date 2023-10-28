//require sequelize object
const sequelize = require("../config/database");

//require the dictionary model
const Dictionary = require("../models/Dictionary");

exports.deleteBook=async (req,res)=>{
    const t=await sequelize.transaction();
    try {
        //extract id and book name from request params
        const {id}=req.params;

        //if id is absent return response
        if(!id){
            await t.rollback();
            return res.status(400).json({
                success:false,
                message:"Please provide the book id"
            })
        }
        //find wheather the given id exists in db or not
        const book=await Dictionary.findByPk(id);

        //if absent return a response
        if(!book){
            await t.rollback();
            return res.status(404).json({
                success:false,
                message:"The bookid is invalid"
            })
        }

        //Otherwise delete the entry which matched this id
        const deletedBook=await Dictionary.destroy({
            where:{
                id:id
            }
        },{transaction:t})
        
        //commit transaction after successful deletion in db
        await t.commit();

        res.status(200).json({
            success:true,
            message:"Sucessfully deleted the book"
        })
    } catch (error) {
        console.log("Error in deleteing the books information:",error);
        await t.rollback();

        res.status(500).json({
            success:false,
            message:error.message
        })
    }
    }
