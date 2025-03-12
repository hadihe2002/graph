import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from "graphql";
import { books } from "./data";
import { BookType } from "./book";

export interface IAuthor {
  id: string;
  name: string;
}

export const AuthorType = new GraphQLObjectType<IAuthor, null>({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => books.filter((book) => book.authorId === author.id),
    },
  }),
});
