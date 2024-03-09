import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

export const Pagination = ({ currentPage, pageData, onChange }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChange(event.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={4}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </div>
  );
};
