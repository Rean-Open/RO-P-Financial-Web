import React, { useState, useEffect } from "react";
import "../../styles/allReport.css";
import API from "../../utils/request";
import Pagination from "react-responsive-pagination";
import iconEdit from "../../assets/images/edit.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch } from 'react-icons/bi'
import LoadingOverlay from "../../containers/loading/loadingOverlay";
import PaymentModal from "../../containers/modal/paymentModal";
import { LIST_PAYMENT_URL,  } from "../../api/urls";

const PaymentMethod = (props) => {
  const {user} = props;
  const [sortField, setSortField] = useState("_id");
  const [sort, setSort] = useState("desc");
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [incomeCategoryModal, setIncomeCategoryModal] = useState(false);
  const [incomeCategoryFetch, setIncomeCategoryFetch] = useState("");
  const [payment, setPayment] = useState([]);
  const [paymentCoy, setPaymentCoy] = useState([]);
  const [keywordSearch, setKeywordSearch] = React.useState("")
  const [datObject, setdatObject] = useState([])
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

  const openIncomeCategory = (item) => {
    if(item){
      setdatObject(item)
    } else {
      setdatObject([])
    }
    setIncomeCategoryFetch("Open");
    setIncomeCategoryModal(true);
  };

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
  function handlePageChange(page) {
    setPage(page);
    setCurrentPage(page);
  }

  const getPaymentMethodList = () => {
    setLoading(true);
    API.get(`${LIST_PAYMENT_URL}?userId=${user.id}`)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setPayment(res.data);
          setPaymentCoy(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const searchPaymentMethodList = () => {
    if(keywordSearch) {
      let searchData = str => paymentCoy.filter(({name}) => name.includes(keywordSearch))
      setPayment(searchData);
    } else {
      setPayment(paymentCoy);
    }

  };

  useEffect(() => {
    getPaymentMethodList();
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
      <h1 className="size20700 mt-5">All Payment Method</h1>
      <div className="mt-3">
        <div className="row" style={{ paddingRight: "12px" }}>
          <div className="col-7 col-md-7 col-sm-7 mt-md-0 mt-3">
            <input
              style={{ height: "50px" }}
              className="form-control text-dark infoInput"
              placeholder="Search name"
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
                <p style={{ fontSize: "16px", fontWeight: 700 }}>Add New</p>
              </div>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="col-12 col-md-12 col-sm-12 mt-5">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12">
              <div className="table-responsive" style={{ minHeight: "200px" }}>
                <table className="table">
                  <thead className="thead-primary">
                    <tr>
                      {sortFields.map((field, i) => {
                        return (
                          <th key={i} onClick={() => handleSort(field, i)}>
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
                      {payment.map((inc, index) => (
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
                            title={inc.name}
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
                                onClick={() => openIncomeCategory(inc)}
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
      <PaymentModal
        user={user}
        showModal={incomeCategoryModal}
        datObjects={{datObject, setdatObject}}
        setIncomeCategoryModal={setIncomeCategoryModal}
        setIncomeCategoryFetch={setIncomeCategoryFetch}
        getPaymentMethodList={getPaymentMethodList}
      />
    </div>
  );
};

export default PaymentMethod;
