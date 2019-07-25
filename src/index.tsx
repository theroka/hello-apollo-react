import React from "react";
import { render } from "react-dom";
// @see: https://github.com/apollographql/react-apollo/blob/master/examples/typescript/src/index.tsx
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: "http://localhost:4000" })
});

interface IBookProps {
  book: IBook;
}

const Book = (props: IBookProps) => {
  let { title, author } = props.book;
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{author}</p>
    </div>
  );
};

interface IBook {
  title: string;
  author: string;
}

interface IData {
  getBooks: Array<IBook>;
}

const Books = () => (
  <Query<IData>
    query={gql`
      {
        getBooks {
          title
          author
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error!</div>;
      return !data
        ? null
        : data.getBooks.map((book: IBook, i: number) => (
            <Book key={i} book={book} />
          ));
    }}
  </Query>
);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Books />
    </ApolloProvider>
  );
};

const root = document.getElementById("root");
render(<App />, root);
