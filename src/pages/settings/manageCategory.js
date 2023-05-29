import React, { useState, useEffect, useRef } from "react";
import "../../styles/allReport.css";
import { LIST_CATEGORY_EXPENSE_URL, LIST_CATEGORY_INCOME_URL } from "../../api/urls";
import API from "../../utils/request";
import Pagination from "react-responsive-pagination";
import iconEdit from "../../assets/images/edit.svg";
import { AiOutlinePlus } from "react-icons/ai";
import IncomeCategoryModal from "../../containers/modal/incomeCategoryModal";
import ExpenseCategoryModal from "../../containers/modal/expenseCategoryModal";
import LoadingOverlay from "../../containers/loading/loadingOverlay";
import { BiSearch } from "react-icons/bi";

const ManageCategory = (props) => {
  const {user} = props;
  const [active, setActive] = useState("income");
  const [expense, setExpense] = React.useState([]);
  const [income, setIncome] = React.useState([]);
  const [keywordSearch, setKeywordSearch] = React.useState("");
  const [keywordSearch1, setKeywordSearch1] = React.useState("");
  const [item, setItem] = React.useState("");
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("_id");
  const [sort, setSort] = useState("desc");
  const [incomeCategoryModal, setIncomeCategoryModal] = useState(false);
  const [incomeCategoryFetch, setIncomeCategoryFetch] = useState("");
  const [expenseCategoryModal, setExpenseCategoryModal] = useState(false);
  const [expenseCategoryFetch, setExpenseCategoryFetch] = useState("");
  const [incomeCoy, setIncomeCoy] = useState([]);
  const [expenseCoy, setExpenseCoy] = useState([]);
  const [datObject, setdatObject] = useState([])
  const [datObject1, setdatObject1] = useState([])
  const [sortFields, setSortFields] = useState([
    {
      name: "No",
      sort: "",
      sortField: "",
    },
    {
      name: "name",
      sort: "asc",
      sortField: "name",
    },
    {
      name: "Description",
      sort: "asc",
      sortField: "description",
    },
  ]);

  const [sortFieldExpense, setSortFieldExpense] = useState([
    {
      name: "No",
      sort: "",
      sortField: "",
    },
    {
      name: "name",
      sort: "asc",
      sortField: "name",
    },
    {
      name: "Description",
      sort: "asc",
      sortField: "description",
    },
  ]);
  // list show income
  const getIncome = (type) => {
    setLoading(true);
    API.get(`${LIST_CATEGORY_INCOME_URL}?userId=${user.id}&isIncome=true&isExpense=false`)
      .then((res) => {
        setLoading(false);
        setIncome(res.data);
        setIncomeCoy(res.data);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const getExpense = () => {
    setLoading(true);
    API.get(`${LIST_CATEGORY_EXPENSE_URL}?userId=${user.id}&isIncome=false&isExpense=true`)
      .then((res) => {
        setLoading(false);
        setExpense(res.data);
        setExpenseCoy(res.data);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };
    
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

  const openIncomeCategory = (item) => {
    if(item){
      setdatObject(item)
    } else {
      setdatObject([])
    }
    setIncomeCategoryFetch("Open");
    setIncomeCategoryModal(true);
  };

  const openExpenseCategory = (item) => {
    if(item){
      setdatObject1(item)
    } else {
      setdatObject1([])
    }
    setExpenseCategoryFetch("Open");
    setExpenseCategoryModal(true);
  };

  useEffect(() => {
    getIncome(active);
    getExpense(active)
  }, [page, active, sortField, sort]);

  function handlePageChange(page) {
    setPage(page);
    setCurrentPage(page);
  }

  const searchPaymentMethodList = () => {
    if(keywordSearch) {
      let searchData = str => incomeCoy.filter(({name}) => name.includes(keywordSearch))
      setIncome(searchData);
    } else {
      setIncome(incomeCoy);
    }

  };
  const searchPaymentMethodList1 = () => {
    if(keywordSearch1) {
      let searchData = str => expenseCoy.filter(({name}) => name.includes(keywordSearch1))
      setExpense(searchData);
    } else {
      setExpense(expenseCoy);
    }

  };

  return (
    <div
      className="container"
      style={{
        marginLeft: "10px",
        paddingRight: "40px",
        marginTop: "120px",
        marginBottom: "40px",
      }}
    >
      <div className="container mb-5">
        <h1 className="size20700 mt-5">All Category</h1>
        <div className="">
          <div className="row mt-3">
            <div className="col-12">
              <div className="d-flex flex-row">
                <div
                  onClick={() => {
                    setActive("income");
                    setKeywordSearch("");
                    setCurrentPage("");
                    setPage("");
                  }}
                  className={`d-flex flex-column align-items-center ${
                    active === "income" ? "underline" : "noneActive"
                  }`}
                >
                  <p className="bold_desc" style={{ marginBottom: "12px" }}>
                    Income
                  </p>
                </div>
                <div
                  onClick={() => {
                    setActive("expense");
                    setKeywordSearch("");
                    setCurrentPage("");
                    setPage("");
                  }}
                  className={`d-flex flex-column align-items-center ${
                    active === "expense" ? "underline" : "noneActive"
                  }`}
                >
                  <p className="bold_desc" style={{ marginBottom: "12px" }}>
                    Expense
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
                case "income":
                  return (
                    <div className="">
                      <div className="row" style={{ paddingRight: "12px" }}>
                        <div className="col-7 col-md-7 col-sm-7 mt-md-0 mt-3">
                          <input
                            style={{ height: "50px" }}
                            className="form-control text-dark infoInput"
                            placeholder="Search Category"
                            type="text"
                            value={keywordSearch}
                            onChange={(e) => {
                                setKeywordSearch(e.target.value)
                            }}
                          />
                           <BiSearch onClick={() => searchPaymentMethodList()} size={20} style={{ float: 'right', marginTop: '-33px', marginRight: '10px', cursor: 'pointer' }} />
                        </div>
                        <div
                          className="col-5 col-md-5 col-sm-5 mt-md-0  mt-3"
                          onClick={(e) => openIncomeCategory(e)}
                        >
                          <div className="row text-center addNew">
                            <div className="col-12 col-md-2 mt-3 col-sm-12">
                              <AiOutlinePlus size={20} />
                            </div>
                            <div className="col-12 col-md-10 mt-3 col-sm-12">
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 700,
                                }}
                              >
                                Add New
                              </p>
                            </div>
                          </div>
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
                              <table className="table">
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
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                {
                                  // dataExpense.length > 0 ?
                                  <tbody>
                                    {income.map(
                                      (inc, index) => (
                                        (
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
                                              title={inc.category}
                                            >
                                              {inc.name}
                                            </td>
                                            <td
                                              className="text-capitalize"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title={inc.description}
                                            >
                                              {inc.description}
                                            </td>
                                            <td className="td_radiusRight">
                                              <div className="d-flex">
                                                {/* <FaLock
                                                  style={{
                                                    width: "18px",
                                                    height: "18px",
                                                    cursor: "pointer",
                                                    color: "#1b284f",
                                                  }}
                                                /> */}
                                                <img
                                                  src={iconEdit}
                                                  alt=""
                                                  style={{
                                                    width: "18px",
                                                    height: "18px",
                                                    cursor: "pointer",
                                                    marginLeft: "10px",
                                                  }}
                                                  state={item}
                                                  onClick={() => openIncomeCategory(inc)}
                                                />
                                              </div>
                                            </td>
                                          </tr>
                                        )
                                      )
                                    )}
                                  </tbody>
                                }
                              </table>
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
                case "expense":
                  return (
                    <div className="">
                      <div className="row" style={{ paddingRight: "12px" }}>
                      <div className="col-7 col-md-7 col-sm-7 mt-md-0 mt-3">
                          <input
                            style={{ height: "50px" }}
                            className="form-control text-dark infoInput"
                            placeholder="Search Category"
                            type="text"
                            value={keywordSearch1}
                            onChange={(e) => {
                                setKeywordSearch1(e.target.value)
                            }}
                          />
                           <BiSearch onClick={() => searchPaymentMethodList1()} size={20} style={{ float: 'right', marginTop: '-33px', marginRight: '10px', cursor: 'pointer' }} />
                        </div>
                        <div
                          className="col-5 col-md-5 col-sm-5 mt-md-0 mt-3"
                          onClick={(e) => openExpenseCategory(e)}
                        >
                          <div className="row text-center addNew">
                            <div className="col-12 col-md-2 mt-3 col-sm-12">
                              <AiOutlinePlus size={20} />
                            </div>
                            <div className="col-12 col-md-10 mt-3 col-sm-12">
                              <p style={{ fontSize: "16px", fontWeight: 700 }}>
                                Add New
                              </p>
                            </div>
                          </div>
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
                              <table className="table">
                                <thead className="thead-primary">
                                  <tr>
                                    {sortFieldExpense.map((field, i) => {
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
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                {
                                  // dataExpense.length > 0 ?
                                  <tbody>
                                    {expense.map((inc, index) => (
                                      <tr key={index}>
                                        <td
                                          className="td_radiusLeft"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.no}
                                        >
                                          {index +1}
                                        </td>
                                        <td
                                          className="text-capitalize"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.category}
                                        >
                                          {inc.name}
                                        </td>
                                        <td
                                          className="text-capitalize"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={inc.description}
                                        >
                                          {inc.description}
                                        </td>
                                        <td className="td_radiusRight">
                                          <div className="d-flex">
                                            {/* <FaLock
                                              style={{
                                                width: "18px",
                                                height: "18px",
                                                cursor: "pointer",
                                                color: "#1b284f",
                                              }}
                                            /> */}
                                            <img
                                              src={iconEdit}
                                              alt=""
                                              style={{
                                                width: "18px",
                                                height: "18px",
                                                cursor: "pointer",
                                                marginLeft: "10px",
                                              }}
                                              onClick={() =>
                                                openExpenseCategory(inc)
                                              }
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                }
                              </table>
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
      <IncomeCategoryModal
        showModal={incomeCategoryModal}
        user={user}
        setIncomeCategoryModal={setIncomeCategoryModal}
        setIncomeCategoryFetch={setIncomeCategoryFetch}
        datObjects={{datObject, setdatObject}}
        getIncome= {getIncome}
      />
      <ExpenseCategoryModal
        showModal={expenseCategoryModal}
        setExpenseCategoryModal={setExpenseCategoryModal}
        setExpenseCategoryFetch={setExpenseCategoryFetch}
        getExpense={getExpense}
        datObjects1={{datObject1, setdatObject1}}
        user={user}
      />
      {loading ? <LoadingOverlay /> : null}
    </div>
  );
};

export default ManageCategory;
