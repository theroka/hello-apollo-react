import React from "react";
import { render } from "react-dom";
import { Provider, createClient, Query } from "urql"
import gql from "graphql-tag";

const client = createClient({ url: "http://localhost:4000/" });

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

const query = gql`
  query {
    getBooks {
      title
      author
    }
  }`;

const Books = () => (
  <Query query={query}>
    {({ fetching, error, data }) => {
      if (fetching) return <div>Loading...</div>;
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
    <Provider value={client}>
      <Books />
    </Provider>
  );
};

const root = document.getElementById("root");
render(<App />, root);
