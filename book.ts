import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import { AuthorType } from "./author";
import { authors } from "./data";

export interface IBook {
  id: string;
  title: string;
  authorId: string;
}

export const BookType = new GraphQLObjectType<IBook, null>({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (book) => authors.find((author) => author.id === book.authorId),
    },
  }),
});
