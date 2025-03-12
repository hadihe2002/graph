import { graphql, GraphQLSchema, GraphQLID } from "graphql";
import express from "express";
import { GraphQLObjectType } from "graphql";
import { GraphQLList } from "graphql";
import { BookType } from "./book";
import { authors, books } from "./data";
import { AuthorType } from "./author";
import { json } from "body-parser";

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      resolve: () => books,
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => books.find((book) => book.id === id) || null,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => authors,
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) =>
        authors.find((author) => author.id === id) || null,
    },
    authorBooks: {
      type: new GraphQLList(BookType),
      args: { authorId: { type: GraphQLID } },
      resolve: (_, { authorId }) => {
        return books.filter((book) => book.authorId == authorId);
      },
    },
  }),
});

const schema = new GraphQLSchema({ query: QueryType });

const app = express();
app.use(json());

app.post("/graphql", async (req, res) => {
  try {
    const response = await graphql({
      schema,
      source: req.body.query,
      variableValues: req.body.variables,
    });
    res.json(response.data);
  } catch (err) {
    throw err;
  }
});

app.listen(4000, () =>
  console.log("🚀 server running at http://localhost:4000/graphql")
);
