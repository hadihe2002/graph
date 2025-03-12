import {
  graphql,
  GraphQLSchema,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";
import { BookType } from "./book";
import { authors, books } from "./data";
import { AuthorType } from "./author";
import { createServer } from "node:http";

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

const server = createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/graphql") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      const { query, variables } = JSON.parse(body);

      const response = await graphql({
        schema,
        source: query,
        variableValues: variables,
      });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    });
  }
});

server.listen(4000, () =>
  console.log("🚀 Server running at http://localhost:4000/graphql")
);
