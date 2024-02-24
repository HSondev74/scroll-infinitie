import React, { useState, useRef, useCallback } from "react";
import { Skeleton } from "antd";
import useBookSearch from "./components/useBookSearch";

export default function App() {
     const [query, setQuery] = useState("");
     const [pageNumber, setPageNumber] = useState(1);

     const { books, hasMore, loading, error } = useBookSearch(pageNumber);

     const observer = useRef();
     const lastBookElementRef = useCallback(
          (node) => {
               if (loading) return;
               if (observer.current) observer.current.disconnect();
               observer.current = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting && hasMore) {
                         setPageNumber((prevPageNumber) => prevPageNumber + 1);
                    }
               });
               if (node) observer.current.observe(node);
          },
          [loading, hasMore]
     );

     return (
          <>
               {books.map((book, index) => {
                    if (books.length === index + 1) {
                         return (
                              <div ref={lastBookElementRef} key={book.id}>
                                   {book.title}
                              </div>
                         );
                    } else {
                         return <div key={book.id}>{book.title}</div>;
                    }
               })}
               <div>
                    {loading &&
                         [...Array(6)].map((_, index) => (
                              <Skeleton key={index} />
                         ))}
               </div>
               <div>{error && "Error"}</div>
          </>
     );
}
