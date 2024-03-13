import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

//Add Books {POST}
router.post("/", async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: "All Fields Required",
            })
        }
        const newBook = {
            title: title,
            author: author,
            publishYear: publishYear
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})
//Get all books {GET}
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
})
//Get one book {GET}
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
})
//Update a book {PUT}
router.put("/:id", async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: "All Fields Required",
            })
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).send({ message: "Book not found" })
        }
        return res.status(200).send({ message: "Book updated Successfully" })


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})
//Delete a book {DELETE}
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: "Book not found" })
        }
        return res.status(200).send({ message: "Book Deleted Successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

export default router;