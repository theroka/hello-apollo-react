import React from "react";
import { render } from "react-dom";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  Provider,
  createClient,
  defaultExchanges,
  subscriptionExchange,
  useQuery,
  useSubscription,
  SubscriptionHandler
} from "urql";
import gql from "graphql-tag";

const subscriptionClient = new SubscriptionClient(
  "ws://localhost:4000/graphql",
  {}
);

const client = createClient({
  url: "http://localhost:4000/",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
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

const query = gql`
  query {
    getBooks {
      title
      author
    }
  }
`;

const subQuery = gql`
  subscription BookSub {
    bookAdded {
      title
      author
    }
  }
`;

const handleSubscription = ( books: IBook[] = [], response: { bookAdded: IBook } ) => {
  return [response.bookAdded, ...books];
};

const Books = () => {
  const [getBooks] = useQuery({ query });
  const [newBooks] = useSubscription({ query: subQuery }, handleSubscription);

  if (getBooks.fetching) return <p>Loading...</p>;
  if (getBooks.error) return <p>Error!</p>;

  let books = getBooks.data.getBooks.concat(newBooks.data ? newBooks.data : []);

  return books.map((book: IBook, i: number) => <Book key={i} book={book} />);
};

const App = () => {
  return (
    <Provider value={client}>
      <Books />
    </Provider>
  );
};

const root = document.getElementById("root");
render(<App />, root);
