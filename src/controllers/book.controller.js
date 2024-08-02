import BookModel from "../models/Book.model.js";

export const createBook = async (req, res) => {
  try {
    const { name, editorial, author, genre, yearOfEdition, price } = req.body;
    if (!name || !editorial || !author || !genre || !yearOfEdition || !price)
      return res.json({ message: "required fields" });

    const createBook = new BookModel({
      name: name,
      editorial: editorial,
      author: author,
      genre: genre,
      yearOfEdition: yearOfEdition,
      price: price,
      user: req.user.id,
    });

    const bookSave = await createBook.save();

    res.json({ message: "Successfully created book", book: bookSave });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating the book. Try again later." });
  }
};

export const findBooks = async (req, res) => {
  try {
    const books = await BookModel.find({
      user: req.user.id,
    }).populate("user");

    if (!books) return res.status(404).json({ message: "Books not found" });

    res.json(books);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json("The books could not be found, please try again later.");
  }
};

export const findBook = async (req, res) => {
  try {
    const { id } = req.params;
    const findBook = await BookModel.findById(id);
    if (!findBook) return res.status(404).json({ message: "Book not found" });
    res.json(findBook);
  } catch (error) {
    console.log(error);
    res.status(500).json("Could not find the book, please try again later.");
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, editorial, author, genre, yearOfEdition, price } = req.body;

    if (!name || !editorial || !author || !genre || !yearOfEdition || !price)
      return res.json({ message: "required fields" });
    const editBook = await BookModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!editBook) return req.status(404).json({ message: "error updating" });

    res.json({ message: "successfully updated", book: editBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating the book. Try again later." });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await BookModel.findByIdAndUpdate(
      id,
      { status: "inactive" },
      { new: true }
    );
    if (!deleteBook) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book status updated to inactive", book: deleteBook });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Could not delete the book, please try again later." });
  }
};
