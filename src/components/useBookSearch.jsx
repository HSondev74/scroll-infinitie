import { useEffect, useState } from "react";
import axios from "axios";

export default function useBookSearch(pageNumber) {
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(false);
     const [books, setBooks] = useState([]);
     const [hasMore, setHasMore] = useState(false);

     useEffect(() => {
          setLoading(true);
          setError(false);
          let cancel;
          axios({
               method: "GET",
               url: `https://dummyjson.com/products?limit=10&skip=${
                    pageNumber * 10
               }&select=title,price`,
               params: { page: pageNumber },
               cancelToken: new axios.CancelToken((c) => (cancel = c)),
          })
               .then((res) => {
                    setBooks((prevBooks) => {
                         return [...prevBooks, ...res.data.products];
                    });
                    setHasMore(res.data.products.length > 0);
                    setLoading(false);
               })
               .catch((e) => {
                    if (axios.isCancel(e)) return;
                    setError(true);
               });
          return () => cancel();
     }, [pageNumber]);

     return { loading, error, books, hasMore };
}
