import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import {
  LIST_CATEGORY_INCOME_URL,
  CREATE_INCOME_URL,
  LIST_PAYMENT_URL,
  UPDATE_INCOME_URL,
} from "../../api/urls";
import API from "../../utils/request";
import MessageModalMain from "./messageModalMain";
import LoadingOverlay from "../loading/loadingOverlay";
import { IoIosCloseCircleOutline } from "react-icons/io";

const InComeModal = (props) => {
  const { showModal, setIncomeModal, fetchUserFormList, datObjects, user } =
    props;
  const [amount, setAmount] = useState("");
  const { datObject, setdatObject } = datObjects;
  const [amountInvalid, setAmountInvalid] = useState("");
  const [category, setCategory] = useState("");
  const [categoryInvalid, setCategoryInvalid] = useState("");
  const [payment, setPayment] = useState("");
  const [paymentInvalid, setPaymentInvalid] = useState("");
  const [date, setDate] = useState("");
  const [dateInvalid, setDateInvalid] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [remark, setRemark] = useState("");
  const [income, setIncome] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentLists, setPaymentList] = useState([]);
  const messageModalRef = useRef("rememberMe");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      setAmountInvalid("Please enter an amount!");
      return false;
    }
    if (!category) {
      setCategoryInvalid("Please selete a category!");
      return false;
    }
    if (!payment) {
      setPaymentInvalid("Please selete a payment!");
      return false;
    }

    if (!date) {
      setDateInvalid("Please selete a date!");
      return false;
    }
    setLoading(true);
    API.post(CREATE_INCOME_URL, {
      user_id: user.id,
      activity_type_id: 1,
      amount: amount,
      description: description,
      category_id: category,
      payment_method_id: payment,
      created_date: date,
      reference: reference,
      remark: remark,
      tag: tag,
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          messageModalRef.current.showSuccess("You have successfully");
          setAmount("");
          setCategory("");
          setPayment("");
          setDate("");
          setDescription("");
          setReference("");
          setRemark("");
          setTag("");
          setIncomeModal(false);
          fetchUserFormList();
        }
      })
      .catch((err) => {
        messageModalRef.current.showWarning(err.message);
        setLoading(false);
      });
  };

  const updateIncome = (e) => {
    e.preventDefault();
    if (!amount) {
      setAmountInvalid("Please enter an amount!");
      return false;
    }
    if (!category) {
      setCategoryInvalid("Please selete a category!");
      return false;
    }
    if (!payment) {
      setPaymentInvalid("Please selete a payment!");
      return false;
    }

    if (!date) {
      setDateInvalid("Please selete a date!");
      return false;
    }
    setLoading(true);

    API.put(UPDATE_INCOME_URL, {
      id: id,
      user_id: user.id,
      activity_type_id: 1,
      amount: amount,
      description: description,
      category_id: category,
      payment_method_id: payment,
      created_date: date,
      remark: remark,
      reference: reference,
      tag: tag,
    })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          messageModalRef.current.showSuccess("You have successfully");
          setAmount("");
          setCategory("");
          setPayment("");
          setDate("");
          setDescription("");
          setReference("");
          setRemark("");
          setTag("");
          setIncomeModal(false);
          fetchUserFormList();
        }
      })
      .catch((err) => {
        messageModalRef.current.showWarning(err.data.error);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (datObject.id) {
      setId(datObject.id);
      setAmount(datObject.amount);
      setCategory(datObject.categoryName);
      setDescription(datObject.description);
      setPayment(datObject.paymentMethodName);
      setDate(datObject.created_date);
      setRemark(datObject.remark);
      setReference(datObject.reference);
      setTag(datObject.tag);
    }
  }, [datObject]);

  const getIncome = () => {
    setLoading(true);
    API.get(
      `${LIST_CATEGORY_INCOME_URL}?userId=${user.id}&isIncome=true&isExpense=false`
    )
      .then((res) => {
        setLoading(false);
        setIncome(res.data);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };
  const getPayment = () => {
    setLoading(true);
    API.get(`${LIST_PAYMENT_URL}?userId=${user.id}`)
      .then((res) => {
        setLoading(false);
        setPaymentList(res.data);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  useEffect(() => {
    getIncome();
    getPayment();
  }, []);
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          setAmount("");
          setCategory("");
          setPayment("");
          setDate("");
          setDescription("");
          setReference("");
          setRemark("");
          setTag("");
        }}
        centered
        size="lg"
      >
        <div
          style={{
            backgroundColor: "white",
            borderTop: "5px solid #ff5e24",
            padding: "5px 0px 0px 0px",
            borderRadius: "4px",
          }}
        >
          <IoIosCloseCircleOutline
            onClick={() => {
              setIncomeModal(false);
              setAmount("");
              setCategory("");
              setPayment("");
              setDate("");
              setDescription("");
              setReference("");
              setRemark("");
              setTag("");
            }}
            size={24}
            color="gray"
            style={{
              float: "right",
              marginTop: "10px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          />
          <div className="p-5">
            <div className="text-center mb-3">
              <h1 style={{ fontSize: "24px", fontWeight: 700 }}>
                Record Income
              </h1>
            </div>
            <div className="">
              <form onSubmit={id ? updateIncome : handleSubmit}>
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-12">
                    <label className="labelTextLogin">
                      Amount <span className="text-danger">*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="number"
                        className={`form-control ${
                          amountInvalid && !amount ? "is-invalid" : ""
                        }`}
                        style={{
                          height: "50px",
                          paddingLeft: "15px",
                        }}
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      />
                      <div className="invalid-feedback">
                        {amountInvalid && !amount ? amountInvalid : ""}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-sm-12">
                    <label className="labelTextLogin">
                      Category <span className="text-danger">*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        onChange={(e) => setCategory(e.target.value)}
                        className={`form-select form-select-lg mb-3 size18400 ${
                          categoryInvalid && !category ? "is-invalid" : ""
                        }`}
                        aria-label=".form-select-lg example"
                        style={{
                          height: "50px",
                        }}
                      >
                        <option>Please select a category</option>
                        {income &&
                          income.map((js, index) => (
                            <option key={index} value={js.id} selected={id ? js.id : ""}>
                              {js.name}
                            </option>
                          ))}
                      </select>
                      <div className="invalid-feedback">
                        {categoryInvalid && !category ? categoryInvalid : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-12">
                    <label className="labelTextLogin">
                      Payment Method <span className="text-danger">*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        onChange={(e) => setPayment(e.target.value)}
                        className={`form-select form-select-lg mb-3 size18400 ${
                          paymentInvalid && !payment ? "is-invalid" : ""
                        }`}
                        aria-label=".form-select-lg example"
                        style={{
                          height: "50px",
                        }}
                      >
                        <option>Please select a payment</option>
                        {paymentLists.map((py, index) => (
                          <option value={py.id} selected={id ? py.name : ""}>
                            {py.name}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {paymentInvalid && !payment ? paymentInvalid : ""}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-sm-12">
                    <label className="labelTextLogin">
                      date <span className="text-danger">*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="date"
                        className={`form-control ${
                          dateInvalid && !date ? "is-invalid" : ""
                        }`}
                        style={{
                          height: "50px",
                          paddingLeft: "15px",
                          paddingRight: "15px",
                        }}
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                      <div className="invalid-feedback">
                        {dateInvalid && !date ? dateInvalid : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-12">
                    <label className="labelTextLogin">Description</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          height: "50px",
                          paddingLeft: "15px",
                          paddingRight: "15px",
                        }}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-sm-12">
                    <label className="labelTextLogin">Reference</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          height: "50px",
                          paddingLeft: "15px",
                          paddingRight: "15px",
                        }}
                        value={reference}
                        onChange={(e) => {
                          setReference(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-12">
                    <label className="labelTextLogin">Remark</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          height: "50px",
                          paddingLeft: "15px",
                          paddingRight: "15px",
                        }}
                        value={remark}
                        onChange={(e) => {
                          setRemark(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-sm-12">
                    <label className="labelTextLogin">Tag</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          height: "50px",
                          paddingLeft: "15px",
                          paddingRight: "15px",
                        }}
                        value={tag}
                        onChange={(e) => {
                          setTag(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="button_auth button_body"
                  style={{ marginTop: "32px" }}
                  onClick={(e) => {
                    id ? updateIncome(e) : handleSubmit(e);
                  }}
                >
                  <p
                    style={{
                      fontWeight: "800",
                      fontSize: "16px",
                      marginBottom: "0",
                      color: "white",
                    }}
                  >
                    Save
                  </p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      {loading ? <LoadingOverlay /> : null}
      <MessageModalMain textCentered ref={messageModalRef} />
    </>
  );
};

export default InComeModal;
