import React, { useState, useEffect } from "react";
import { usePaginationRange, DOTS } from "../hooks/usePaginationRange";

const Pagination = ({
  data,
  RenderComponent,
  title,
  buttonConst,
  contentPerPage,
  siblingCount,
}) => {
  const [totalPageCount] = useState(Math.ceil(data.length / contentPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  const paginationRange = usePaginationRange({
    totalPageCount,
    contentPerPage,
    buttonConst,
    siblingCount,
    currentPage,
  });

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: "0px",
    });
  }, [currentPage]);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function gotToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }
  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * contentPerPage - contentPerPage;
    const endIndex = startIndex + contentPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div>
      <h1>{title}</h1>
      {/* show the post 10 post at a time*/}
      <div className="dataContainer">
        {getPaginatedData().map((dataItem, index) => (
          <RenderComponent key={index} data={dataItem} />
        ))}
      </div>
      {/* show the pagiantion
                it consists of next and previous buttons
                along with page numbers, in our case, 5 page
                numbers at a time */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={gotToPreviousPage}
          className={` prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          previous
        </button>
        {/* show paginated button group */}
        {paginationRange.map((item, index) => {
          if (item === DOTS) {
            return (
              <button key={index} className={`paginationItem`}>
                &#8230;
              </button>
            );
          }
          return (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item ? "active" : null
              }`}
            >
              <span>{item}</span>
            </button>
          );
        })}
        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === totalPageCount ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
