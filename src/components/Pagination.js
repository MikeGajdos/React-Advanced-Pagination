import React, { useState, useEffect } from "react";

const Pagination = ({ data, RenderComponent, title, pageLimit, dataLimit }) => {
  const [pages] = useState(Math.ceil(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

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
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };
  const getPaginationButtonsGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, index) => start + index + 1);
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
          className={` prev ${currentPage === 1 ? "disables" : ""}`}
        >
          previous
        </button>
        {/* show paginated button group */}
        {getPaginationButtonsGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
