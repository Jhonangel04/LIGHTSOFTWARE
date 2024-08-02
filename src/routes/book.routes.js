import { Router } from "express";
import * as bookCtrl from '../controllers/book.controller.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import {bookSchema} from '../schemas/book.schema.js'
import { authRequired } from "../middlewares/verifyToken.middleware.js";

const router = new Router();

router.get('/book', authRequired, bookCtrl.findBooks)

router.post('/book', authRequired ,validateSchema(bookSchema) ,bookCtrl.createBook)
router.get('/book/:id', authRequired, bookCtrl.findBook)
router.put('/book/:id', authRequired, validateSchema(bookSchema), bookCtrl.updateBook)
router.patch('/book/delete/:id', authRequired, bookCtrl.deleteBook)

export default router;