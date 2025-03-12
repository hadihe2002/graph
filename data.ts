import { IAuthor } from "./author";
import { IBook } from "./book";

export const authors: IAuthor[] = [
  { id: "1", name: "J.K. Rowling" },
  { id: "2", name: "J.R.R. Tolkien" },
];

export const books: IBook[] = [
  { id: "101", title: "Harry Potter and the Sorcerer's Stone", authorId: "1" },
  {
    id: "102",
    title: "Harry Potter and the Chamber of Secrets",
    authorId: "1",
  },
  { id: "201", title: "The Hobbit", authorId: "2" },
  { id: "202", title: "The Lord of the Rings", authorId: "2" },
];
