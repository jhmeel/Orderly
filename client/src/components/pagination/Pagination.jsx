import React from "react";
import {
  IconArrowLeftfunction,
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
} from "../../assets/icons";
import "./style.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages) return

  function numberRange(start, end) {
    return new Array(end - start).fill().map((d, i) => i + start);
  }

  let middlePagination;

  if (totalPages <= 5) {
    middlePagination = [...Array(totalPages)].map((__, index) => (
      <button
        key={index + 1}
        onClick={() => onPageChange(index + 1)}
        disabled={currentPage === index + 1}
      >
        {index + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((currentPage - 1) / 5) * 5;

    middlePagination = (
      <>
        {numberRange(startValue, totalPages).map((__, index) => (
          <button
            key={startValue + index + 1}
            onClick={() => onPageChange(startValue + index + 1)}
            disabled={currentPage === startValue + index + 1}
          >
            {startValue + index + 1}
          </button>
        ))}
        <button>...</button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {currentPage}
        </button>
      </>
    );

    if (currentPage > 5) {
      if (totalPages - currentPage >= 5) {
        middlePagination = (
          <>
            <button onClick={() => onPageChange(1)}>1</button>
            <button>...</button>
            <button onClick={() => onPageChange(startValue)}>
              {startValue}
            </button>

            {numberRange(startValue, totalPages).map((__, index) => (
              <button
                key={startValue + index + 1}
                onClick={() => changePage(startValue + index + 1)}
                disabled={currentPage === startValue + index + 1}
              >
                {startValue + index + 1}
              </button>
            ))}
            <button>...</button>
            <button onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </button>
          </>
        );
      } else {
        let amountLeft = totalPages - currentPage + 5;
        middlePagination = (
          <>
            <button onClick={() => onPageChange(1)}>1</button>
            <button>...</button>
            <button onClick={() => onPageChange(startValue)}>
              {startValue}
            </button>
            {numberRange(amountLeft, totalPages).map((__, index) => (
              <button
                key={startValue + index + 1}
                onClick={() => onPageChange(startValue + index + 1)}
                disabled={currentPage === startValue + index + 1}
                style={
                  totalPages < startValue + index + 1
                    ? { display: "none" }
                    : null
                }
              >
                {startValue + index + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }

  return (
    totalPages > 1 && (
      <div className="pagination">
        <button
          className="pagination__prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {currentPage === 1 ? <IconArrowRight/> : <IconChevronLeft />}
        </button>

        {middlePagination}

        <button
          className="pagination__next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {currentPage === totalPages ? (
            <IconArrowLeftfunction />
          ) : (
            <IconChevronRight />
          )}
        </button>
      </div>
    )
  );
};

export default Pagination;
