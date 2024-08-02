import z from "zod";
import { minLengthString } from "../libs/validationsZod.js";

export const bookSchema = z.object({
  name: minLengthString(5, "name"),
  editorial: minLengthString(2, "editorial"),
  author: minLengthString(2, "author"),
  genre: minLengthString(3, "genre"),
  yearOfEdition: minLengthString(10, "year of edition"),
  price: z
    .number({
      required_error: "Price is required",
    })
    .positive({
      message: "Price must be a positive number",
    }),
});
