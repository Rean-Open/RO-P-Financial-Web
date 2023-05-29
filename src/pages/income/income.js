import React, { useState, useEffect, useRef } from "react";
import "../../styles/allReport.css";
import API from "../../utils/request";
import Pagination from "react-responsive-pagination";
import iconEdit from "../../assets/images/edit.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import LoadingOverlay from "../../containers/loading/loadingOverlay";
import { DownloadTableExcel } from "react-export-table-to-excel";
import {
  ACTIVITY_LIST_INCOME,
  EXPENSE_DELETE_URL,
  LIST_PAYMENT_URL,
} from "../../api/urls";
import { CgExport } from "react-icons/cg";
import iconDelete from "../../assets/images/delete.svg";
import InComeModal from "../../containers/modal/incomeModal";
import moment from "moment";
import iconWarning from "../../assets/images/warning-icon.jpg";
import MessageModal from "../../containers/modal/messageModal";
import MessageModalMain from "../../containers/modal/messageModalMain";

const Income = (props) => {
  const { user } = props;
  const [sortField, setSortField] = useState("_id");
  const [sort, setSort] = useState("desc");
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [incomeModal, setIncomeModal] = useState(false);
  const [incomeFetch, setIncomeFetch] = useState("");
  const [payment, setPayment] = useState([]);
  const [paymentCoy, setPaymentCoy] = useState([]);
  const [keywordSearch, setKeywordSearch] = React.useState("");
  const [datObject, setdatObject] = useState([]);
  const [data, setDataForm] = useState([]);
  const [indexDelete, setIndexDelete] = useState(null);
  const [messageFetch, setMessageFetch] = useState("");
  const [item, setItem] = React.useState("");
  const [id, setId] = React.useState("");
  const [messageModal, setMessageModal] = useState(false);
  const tableRef = useRef(null);
  const messageModalRef = useRef("rememberMe");

  const [incomeCoy, setIncomeCoy] = useState([]);
  const [sortFields, setSortFields] = useState([
    {
      name: "No",
      sort: "asc",
      sortField: "_id",
    },
    {
      name: "Create Date",
      sort: "asc",
      sortField: "userName",
    },

    {
      name: "Category",
      sort: "asc",
      sortField: "firstName",
    },
    {
      name: "Amount",
      sort: "asc",
      sortField: "lastName",
    },
    {
      name: "Description",
      sort: "asc",
      sortField: "primaryEmail",
    },
    {
      name: "Payment Method",
      sort: "asc",
      sortField: "department",
    },
    {
      name: "Reference",
      sort: "asc",
      sortField: "primaryEmail",
    },
    {
      name: "Remark",
      sort: "asc",
      sortField: "department",
    },
    {
      name: "Tag",
      sort: "asc",
      sortField: "department",
    },
  ]);

  const openIncome = (item) => {
    if(item){
      setdatObject(item)
    } else {
      setdatObject([])
    }
    setIncomeFetch("Open");
    setIncomeModal(true);
  };
  const openIncomeModal = (e) => {
    e.preventDefault();
    setIncomeFetch("Open");
    setIncomeModal(true);
  };
  function handlePageChange(page) {
    setPage(page);
    setCurrentPage(page);
  }
  const fetchUserFormList = () => {
    setLoading(true);
    API.get(`${ACTIVITY_LIST_INCOME}?userId=${user.id}&activityTypeId=1`)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setDataForm(res.data);
          setIncomeCoy(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const deleteUser = (e) => {
    API.delete(`${EXPENSE_DELETE_URL}?id=${id}`)
      .then((res) => {
        messageModalRef.current.showSuccess(
          "income has been successfully deleted."
        );
        setMessageModal(false);
        fetchUserFormList();
        return false;
      })
      .catch((err) => {
        messageModalRef.current.showWarning(err.data.error);
        setLoading(false);
      });
  };
  const deleteIncome = (item, index) => {
    setIndexDelete(index);
    setMessageFetch("Open");
    setItem(item);
    setMessageModal(true);
    setId(item.id);
  };

  const searchPaymentMethodList = () => {
    if (keywordSearch) {
      let searchData = (str) =>
        incomeCoy.filter(({ categoryName }) => categoryName.includes(keywordSearch));
        setDataForm(searchData);
    } else {
      setDataForm(incomeCoy);
    }
  };

  useEffect(() => {
    fetchUserFormList();
  }, []);
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
      <h1 className="size20700 mt-5">All Income</h1>
      <div className="mt-3">
        <div className="row" style={{ paddingRight: "12px" }}>
          <div className="col-12 col-md-8 col-sm-12 mt-md-0 mt-3">
            <input
              style={{ height: "50px" }}
              className="form-control text-dark infoInput"
              placeholder="Search name"
              type="text"
              value={keywordSearch}
              onChange={(e) => {
                setKeywordSearch(e.target.value);
              }}
            />
            <BiSearch
              onClick={() => searchPaymentMethodList()}
              size={20}
              style={{
                float: "right",
                marginTop: "-33px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            />
          </div>
          <div
            className="col-12 col-md-2 col-sm-12 mt-md-0 mt-3"
            onClick={(e) => openIncome(e)}
          >
            <div className="row text-center addNew">
              <div className="col-12 col-md-2 mt-3 col-sm-12">
                <AiOutlinePlus size={20} />
              </div>
              <div className="col-12 col-md-10 mt-3 col-sm-12">
                <p style={{ fontSize: "16px", fontWeight: 700 }}>Add New</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-2 col-sm-12 mt-md-0 mt-3">
            <DownloadTableExcel
              filename="income"
              sheet="2023-03-12"
              currentTableRef={tableRef.current}
            >
              <div className="row text-center addNew">
                <div className="col-12 col-md-2 mt-3 col-sm-12">
                  <CgExport size={20} />
                </div>
                <div className="col-12 col-md-10 mt-3 col-sm-12">
                  <p style={{ fontSize: "16px", fontWeight: 700 }}>Export</p>
                </div>
              </div>
            </DownloadTableExcel>
          </div>
        </div>
        {/* Table */}
        <div className="col-12 col-md-12 col-sm-12 mt-5">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12">
              <div className="table-responsive" style={{ minHeight: "200px" }}>
                <table className="table" ref={tableRef}>
                  <thead className="thead-primary">
                    <tr>
                      {sortFields.map((field, i) => {
                        return (
                          <th
                            key={i}
                            onClick={
                              () => console.log(22)
                              // handleSort(field, i)
                            }
                          >
                            {field.name}
                            {/* //{changeIcon(field.sort)} */}
                          </th>
                        );
                      })}
                      <th>Action</th>
                    </tr>
                  </thead>
                  {
                    // income.length > 0 ?
                    <tbody>
                      {data &&
                        data.map((item, index) => (
                          <tr key={index}>
                            <td
                              className="td_radiusLeft"
                              data-toggle="tooltip"
                              data-placement="top"
                              title={item.no}
                            >
                              {index + 1}
                            </td>
                            <td
                              className="text-capitalize"
                              data-toggle="tooltip"
                              data-placement="top"
                              title={item.created_date}
                            >
                              {moment(item.created_date).format("MM-DD-YYYY")}
                            </td>
                            <td
                              className="text-capitalize"
                              data-toggle="tooltip"
                              data-placement="top"
                              title={item.categoryName}
                            >
                              {item.categoryName}
                            </td>
                            <td
                              data-toggle="tooltip"
                              data-placement="top"
                              title={item.amount}
                            >
                              {item.amount}
                            </td>
                            <td
                              className="text-capitalize"
                              data-toggle="tooltip"
                              data-placement="top"
                              title={item.description}
                            >
                              {item.description && item.description.length > 15
                                ? item.description.slice(0, 15) + "..."
                                : item.description}
                            </td>
                            <td
                              data-toggle="tooltip"
                              data-placement="top"
                              title={item.paymentMethodName}
                            >
                              {item.paymentMethodName}
                            </td>

                            <td
                              className="text-capitalize"
                              data-toggle="tooltip"
                              data-placement="top"
                              title={item.reference}
                            >
                              {item.reference}
                            </td>
                            <td
                              className="text-capitalize"
                              data-toggle="tooltip"
                              data-placement="top"
                              title={item.remark}
                            >
                              {item.remark && item.remark.length > 15
                                ? item.remark.slice(0, 15) + "..."
                                : item.remark}
                            </td>
                            <td
                              className="text-capitalize"
                              data-toggle="tooltip"
                              data-placement="top"
                              title={item.tag}
                            >
                              {item.tag}
                            </td>
                            <td className="td_radiusRight">
                              <div className="d-flex">
                                <img
                                  src={iconEdit}
                                  alt=""
                                  onClick={() => openIncome(item)}
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    cursor: "pointer",
                                  }}
                                />
                                <img
                                  src={iconDelete}
                                  alt=""
                                  onClick={() => deleteIncome(item, index)}
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                  }}
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
        {/* Pagination */}
        {itemCount > 1 ? (
          <div
            className="col-12 col-md-12 col-sm-12"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Pagination
              total={itemCount}
              current={currentPage}
              onPageChange={(page) => handlePageChange(page)}
            />
          </div>
        ) : null}
      </div>
      <InComeModal
        showModal={incomeModal}
        setIncomeModal={setIncomeModal}
        setIncomeFetch={setIncomeFetch}
        fetchUserFormList={fetchUserFormList}
        datObjects={{ datObject, setdatObject }}
        user={user}
      />
      <MessageModal
        item={item}
        icon={iconWarning}
        title="Warning"
        description="Are you sure you want to delete this user?"
        showModal={messageModal}
        setMessageModal={setMessageModal}
        setMessageFetch={setMessageFetch}
        indexDelete={indexDelete}
        deleteUser={deleteUser}
      />
      <MessageModalMain textCentered ref={messageModalRef} />
    </div>
  );
};

export default Income;
