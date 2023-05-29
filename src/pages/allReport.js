import React, { useState, useEffect, useRef } from "react";
import "../styles/allReport.css";
import "../styles/tables.css";
import {
  ALL_REPORT_URL,
} from "../api/urls";
import API from "../utils/request";
import Pagination from "react-responsive-pagination";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { filterSummaryType } from "../constants/fixedData";

const AllReport = () => {
  const [active, setActive] = useState(1);
  const [keywordSearch, setKeywordSearch] = React.useState("");
  const [item, setItem] = React.useState("");
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const messageModalRef = useRef("rememberMe");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("_id");
  const [sort, setSort] = useState("desc");
  const tableRef = useRef(null);
  const [sortFields, setSortFields] = useState([
    {
      name: "No",
      sort: "",
      sortField: "",
    },

    {
      name: "Date",
      sort: "asc",
      sortField: "date",
    },
    {
      name: "Category",
      sort: "asc",
      sortField: "category",
    },
    {
      name: "Description",
      sort: "asc",
      sortField: "description",
    },
    {
      name: "Payment Method",
      sort: "asc",
      sortField: "paymentMethod",
    },
    {
      name: "Amount",
      sort: "asc",
      sortField: "amount",
    },
  ]);

  const [sortFieldExpense, setSortFieldExpense] = useState([
    {
      name: "No",
      sort: "",
      sortField: "",
    },

    {
      name: "Date",
      sort: "asc",
      sortField: "date",
    },
    {
      name: "Category",
      sort: "asc",
      sortField: "category",
    },
    {
      name: "Description",
      sort: "asc",
      sortField: "description",
    },
    {
      name: "Payment Method",
      sort: "asc",
      sortField: "paymentMethod",
    },
    {
      name: "Amount",
      sort: "asc",
      sortField: "amount",
    },
  ]);
  const [data1, setDataForm] = useState([]);
  const [total, setTotal] = useState(0);
  const [summaryType, setsummaryType] = useState("Daily");

  const dataFilter = (event) => {
    setLoading(true);
    API.get(
      `${ALL_REPORT_URL}?summaryType=${summaryType}&userId=1&activityTypeId=${active}`
    )
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setDataForm(res.data);
          let total = 0;

          res.data.forEach((it) => {
            if (it.amount) {
              total = total + it.amount;
            }
          });
          setTotal(total);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    dataFilter();
  }, [page, active, sortField, sort, summaryType]);

  // Sort by ascending & descending for stakeholder
  const handleSort = (item, index) => {
    setSort(item.sort);
    if (item.sort === "asc") {
      sortFields[index].sort = "desc";
    } else {
      sortFields[index].sort = "asc";
    }
    setSortField(item.sortField);
    setSortFields([...sortFields]);
  };

  // Sort by ascending & descending for admin
  const handleSortAdmin = (item, index) => {
    setSort(item.sort);
    if (item.sort === "asc") {
      sortFieldExpense[index].sort = "desc";
    } else {
      sortFieldExpense[index].sort = "asc";
    }
    setSortField(item.sortField);
    setSortFieldExpense([...sortFieldExpense]);
  };

  function handlePageChange(page) {
    setPage(page);
    setCurrentPage(page);
  }

  return (
    <div>
      <div
        className="container"
        style={{
          marginLeft: "10px",
          paddingRight: "40px",
          marginTop: "120px",
          marginBottom: "40px",
        }}
      >
        <h1 className="size20700 mt-5">All Reports</h1>
        <div className="">
          <div className="row mt-3">
            <div className="col-12">
              <div className="d-flex flex-row">
                <div
                  onClick={() => {
                    setActive(1);
                    setKeywordSearch("");
                    setCurrentPage("");
                    setPage("");
                  }}
                  className={`d-flex flex-column align-items-center ${
                    active === 1 ? "underline" : "noneActive"
                  }`}
                >
                  <p className="bold_desc" style={{ marginBottom: "12px" }}>
                    Income Reports
                  </p>
                </div>
                <div
                  onClick={() => {
                    setActive(2);
                    setKeywordSearch("");
                    setCurrentPage("");
                    setPage("");
                  }}
                  className={`d-flex flex-column align-items-center ${
                    active === 2 ? "underline" : "noneActive"
                  }`}
                >
                  <p className="bold_desc" style={{ marginBottom: "12px" }}>
                    Expense Reports
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#E2DFDA",
                }}
              />
            </div>
            <div className="col-12" style={{ marginTop: "24px" }}>
              <div style={{ width: "300px" }}></div>
            </div>

            {(() => {
              switch (active) {
                // tab income
                case 1:
                  return (
                    <div className="">
                      <div className="row d-flex">
                        <div className="col-12 col-md-12 col-sm-12 mt-md-0 mt-3">
                          <div className="text-center addNew1 ms-2">
                            <DownloadTableExcel
                              filename="income reports"
                              sheet="2023-03-12"
                              currentTableRef={tableRef.current}
                            >
                              <div className="col-12 col-md-12 mt-3 col-sm-12 ">
                                <p
                                  style={{ fontSize: "16px", fontWeight: 500 }}
                                >
                                  Export
                                </p>
                              </div>
                            </DownloadTableExcel>
                          </div>
                          {filterSummaryType.map((item, index) => (
                            <div
                              className={`text-center addNew1 ms-2 ${
                                summaryType === item.summaryType
                                  ? "bg-danger text-white"
                                  : ""
                              }`}
                              onClick={(event) => {
                                setsummaryType(item.summaryType);
                              }}
                            >
                              <div className="col-12 col-md-12 mt-3 col-sm-12 ">
                                <p
                                  style={{ fontSize: "16px", fontWeight: 500 }}
                                >
                                  {item.summaryType}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Table */}
                      <div className="col-12 col-md-12 col-sm-12 mt-5">
                        <div className="row">
                          <div className="col-12 col-md-12 col-sm-12">
                            <div
                              className="table-responsive"
                              style={{ minHeight: "200px" }}
                            >
                              <table className="table" ref={tableRef}>
                                <thead className="thead-primary">
                                  <tr>
                                    {sortFields.map((field, i) => {
                                      return (
                                        <th
                                          key={i}
                                          onClick={() => handleSort(field, i)}
                                        >
                                          {field.name}
                                        </th>
                                      );
                                    })}
                                  </tr>
                                </thead>
                                {data1.length > 0 ? (
                                  <tbody>
                                    {data1.map((inc, index) => (
                                      <tr key={index}>
                                        <td
                                          className="td_radiusLeft"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.no}
                                        >
                                          {index + 1}
                                        </td>
                                        <td
                                          className="text-capitalize"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                        >
                                          {inc.created_date}
                                        </td>
                                        <td
                                          className="text-capitalize"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.categoryName}
                                        >
                                          {inc.categoryName}
                                        </td>
                                        <td
                                          className="text-capitalize"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.description}
                                        >
                                          {inc.description}
                                        </td>
                                        <td
                                          className="text-capitalize"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.paymentMethodName}
                                        >
                                          {inc.paymentMethodName}
                                        </td>
                                        <td
                                          className="text-capitalize"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.amount}
                                        >
                                          {inc.amount}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                ) : (
                                  ""
                                )}
                              </table>
                              {
                                data1.length > 0 ? <div className="">
                                <label
                                  htmlFor="basic-url"
                                  className="infoLabel mt-3"
                                  style={{
                                    marginLeft: "65%",
                                    fontSize: "16px",
                                  }}
                                >
                                  Total:
                                </label>
                                <div
                                  style={{
                                    borderRadius: "10px",
                                    float: "right",
                                    padding: "15px",
                                  }}
                                >
                                  <td
                                    className="text-capitalize"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: 700,
                                      paddingRight:"60px"
                                    }}
                                  >
                                    {total}
                                  </td>
                                </div>
                              </div> : ""
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Pagination */}
                      {itemCount > 1 ? (
                        <div
                          className="col-12 col-md-12 col-sm-12"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Pagination
                            total={itemCount}
                            current={currentPage}
                            onPageChange={(page) => handlePageChange(page)}
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                // tab admin
                case 2:
                  return (
                    <div className="">
                      <div className="row d-flex">
                        <div className="col-12 col-md-12 col-sm-12 mt-md-0 mt-3">
                          <div className="text-center addNew1 ms-2">
                            <DownloadTableExcel
                              filename="exports reports"
                              sheet="2023-03-12"
                              currentTableRef={tableRef.current}
                            >
                              <div className="col-12 col-md-12 mt-3 col-sm-12 ">
                                <p
                                  style={{ fontSize: "16px", fontWeight: 500 }}
                                >
                                  Export
                                </p>
                              </div>
                            </DownloadTableExcel>
                          </div>
                          {filterSummaryType.map((item, index) => (
                            <div
                              className={`text-center addNew1 ms-2 ${
                                summaryType === item.summaryType
                                  ? "bg-danger text-white"
                                  : ""
                              }`}
                              onClick={(event) => {
                                setsummaryType(item.summaryType);
                              }}
                            >
                              <div className="col-12 col-md-12 mt-3 col-sm-12 ">
                                <p
                                  style={{ fontSize: "16px", fontWeight: 500 }}
                                >
                                  {item.summaryType}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Table */}
                      <div className="col-12 mt-5">
                        <div className="row">
                          <div className="col-md-12">
                            <div
                              className="table-responsive"
                              style={{ minHeight: "200px" }}
                            >
                              <table className="table" ref={tableRef}>
                                <thead className="thead-primary">
                                  <tr>
                                    {data1.map((field, i) => {
                                      return (
                                        <th
                                          key={i}
                                          onClick={() =>
                                            handleSortAdmin(field, i)
                                          }
                                        >
                                          {field.name}
                                        </th>
                                      );
                                    })}
                                  </tr>
                                </thead>
                                {data1.length > 0 ? (
                                  <tbody>
                                    {data1.map((inc, index) => (
                                      <tr key={index}>
                                        <td
                                          className="td_radiusLeft"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.no}
                                        >
                                          {index + 1}
                                        </td>
                                        <td
                                          className="text-capitalize"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                        >
                                          {inc.created_date}
                                        </td>
                                        <td
                                          className="text-capitalize"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.categoryName}
                                        >
                                          {inc.categoryName}
                                        </td>
                                        <td
                                          className="text-capitalize"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.description}
                                        >
                                          {inc.description}
                                        </td>
                                        <td
                                          className="text-capitalize"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.paymentMethodName}
                                        >
                                          {inc.paymentMethodName}
                                        </td>
                                        <td
                                          className="text-capitalize"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.amount}
                                        >
                                          {inc.amount}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                ) : (
                                  ""
                                )}
                              </table>
                              {
                                data1.length > 0 ? <div className="">
                                <label
                                  htmlFor="basic-url"
                                  className="infoLabel mt-3"
                                  style={{
                                    marginLeft: "65%",
                                    fontSize: "16px",
                                  }}
                                >
                                  Total:
                                </label>
                                <div
                                  style={{
                                    borderRadius: "10px",
                                    float: "right",
                                    padding: "15px",
                                  }}
                                >
                                  <td
                                    className="text-capitalize"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: 700,
                                      paddingRight:"60px"
                                    }}
                                  >
                                    {total}
                                  </td>
                                </div>
                              </div> : ""
                              }
                              </div>
                          </div>
                        </div>
                      </div>
                      {itemCount > 1 ? (
                        <div
                          className="col-12 col-md-12 col-sm-12"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Pagination
                            total={itemCount}
                            current={currentPage}
                            onPageChange={(page) => handlePageChange(page)}
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        </div>
        {/* search */}
      </div>
      {/* {loading ? <LoadingOverlay /> : null} */}
    </div>
  );
};

export default AllReport;
