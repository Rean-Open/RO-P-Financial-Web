import React from "react";

const Pagination = (props) => {
  const { totalCount, pagination, setPagination, limitList } = props;
  const pageCount = [];

  for (let i = 1; i <= Math.ceil(totalCount / limitList); i++) {
    pageCount.push(i);
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end" style={{ gap: "5px" }}>
          <li className={`page-item ${pagination <= 1 ? "disabled" : ""}`}>
            <a
              href 
              className="page-link paginationCustome"
              onClick={() => setPagination(pagination - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pageCount.map((item, index) => (
            <li
              className={`page-item ${pagination === index + 1 ? "active" : ""}`}
              active
            >
              <a
                href
                className="page-link paginationCustome"
                onClick={() => setPagination(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${
              pagination > pageCount.length - 1 ? "disabled" : ""
            }`}
          >
            <a
              href
              className="page-link paginationCustome"
              onClick={() => setPagination(pagination + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
