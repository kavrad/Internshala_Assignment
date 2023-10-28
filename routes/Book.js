//require express
const express=require("express");

//call Router method of express
const router=express.Router();

//import all the controllers
const {createBook}=require("../controllers/createBook");
const {getAllBooks,getBook}=require("../controllers/getBook");
const {updateBook}=require("../controllers/updateBook");
const {deleteBook}=require("../controllers/deleteBook");

//method to create a book
router.post("/create-book",createBook);

//method to get the all books information
router.get("/allBooks",getAllBooks);

//method to get the information of a particular book
router.get("/get-book/:id",getBook)

//method to update the book information of a particular book
router.put("/update-book",updateBook);

//method to delete a particular book information
router.delete("/delete-book/:id",deleteBook)

module.exports=router;