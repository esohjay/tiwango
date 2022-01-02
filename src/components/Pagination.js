import React, { useState, useEffect } from "react";
import { usePostActions } from "../actions/postActions";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useGlobalContext } from "../context/store";

export default function Pagination({ pageInfo }) {
  const { state } = useGlobalContext();
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const { getPosts } = usePostActions();
  useEffect(() => {
    if (state.page > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }, [state.page, maxPageNumberLimit, minPageNumberLimit, pageNumberLimit]);
  useEffect(() => {
    if (state.page - 1 < minPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }, [state.page, maxPageNumberLimit, minPageNumberLimit, pageNumberLimit]);
  const pages = [];
  if (pageInfo.totalPages) {
    for (let i = 1; i <= pageInfo.totalPages; i++) {
      pages.push(i);
    }
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <div key={number}>
          <button
            onClick={() => pageHandler(number)}
            className={`page-btn ${
              number === pageInfo.page ? "active-btn" : null
            }`}
          >
            {number}
          </button>
        </div>
      );
    } else {
      return null;
    }
  });
  /* const pageIncrementBtn = () => {
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
  };

  const pageDecrementBtn = () => {
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  };*/

  const handleNextbtn = () => {
    getPosts({ page: pageInfo.nextPage });
  };
  const handlePrevbtn = () => {
    getPosts({ page: pageInfo.prevPage });
  };

  const pageHandler = (page) => {
    getPosts({ page: page });
  };
  return (
    <>
      {pageInfo.totalPages && pageInfo.totalPages > 1 && (
        <div className="btn-container">
          {pageInfo.hasPrevPage && (
            <button onClick={handlePrevbtn} className="prev-btn">
              <FaChevronLeft />
            </button>
          )}

          {renderPageNumbers}

          {pages.length > maxPageNumberLimit && (
            <button className="page-btn">...</button>
          )}

          {pageInfo.hasNextPage && (
            <button onClick={handleNextbtn} className="next-btn">
              <FaChevronRight />
            </button>
          )}
        </div>
      )}
    </>
  );
}
