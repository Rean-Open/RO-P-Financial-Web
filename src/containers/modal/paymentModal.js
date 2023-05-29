import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import MessageModalMain from "./messageModalMain";
import LoadingOverlay from "../loading/loadingOverlay";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CREATE_PAYMENT_UR, UPDATE_PAYMENT } from "../../api/urls";
import API from "../../utils/request";
import { useEffect } from "react";

const PaymentModal = (props) => {
  const { showModal, setIncomeCategoryModal, getPaymentMethodList, datObjects, user } = props;
  const { datObject, setdatObject} = datObjects;
  const [income, setIncome] = useState("");
  const [data, setData] = useState("");
  const [incomeInvalid, setIncomeInvalid] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const messageModalRef = useRef("rememberMe");
  const [id, setId] = useState("")

  useEffect( () => {
    if(datObject.id){
      setId(datObject.id)
      setIncome(datObject.name)
      setDescription(datObject.description)
    }
  }, [datObject])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!income) {
      setIncomeInvalid("Please enter an name!");
      return false;
    }

    API.post(CREATE_PAYMENT_UR, {
      name: income,
      description: description,
      user_id: user.id,
    })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setData(res.data);
          messageModalRef.current.showSuccess("You have successfully");
          setIncome("");
          setDescription("");
          setIncomeCategoryModal(false);
          getPaymentMethodList();
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const updatePayment = (e) => {
    e.preventDefault();
    if (!income) {
      setIncomeInvalid("Please enter an name!");
      return false;
    }

    setLoading(true);
    API.put(UPDATE_PAYMENT, {
      id: id,
      name: income,
      description: description,
      user_id: user.id,
    })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setData(res.data);
          messageModalRef.current.showSuccess("You have successfully");
          setIncome("");
          setDescription("");
          setIncomeCategoryModal(false);
          getPaymentMethodList();
        } 
      })
      .catch((err) => {
        messageModalRef.current.showWarning(err.data.error);
        setLoading(false);
      });
  };
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          setIncome("");
          setDescription("");
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
              setIncomeCategoryModal(false);
              setIncome("");
              setDescription("");
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
                Create Payment Methods
              </h1>
            </div>
            <div className="">
              <form onSubmit={id ? updatePayment : handleSubmit}>
                <div className="row">
                  <div className="col-12 col-md-12 col-sm-12">
                    <label className="labelTextLogin">
                      Name <span className="text-danger">*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        className={`form-control ${
                          incomeInvalid && !income ? "is-invalid" : ""
                        }`}
                        style={{
                          height: "50px",
                          paddingLeft: "15px",
                        }}
                        value={income}
                        onChange={(e) => {
                          setIncome(e.target.value);
                        }}
                      />
                      <div className="invalid-feedback">
                        {incomeInvalid && !income ? incomeInvalid : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-12 col-sm-12">
                    <label className="labelTextLogin">Description</label>
                    <div style={{ position: "relative" }}>
                      <textarea
                        type="textarea"
                        className="form-control"
                        style={{
                          height: "100px",
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
                </div>
                <button
                  className="button_auth button_body"
                  style={{ marginTop: "32px" }}
                  onClick={(e) => {
                    id ? updatePayment(e) : handleSubmit(e)
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

export default PaymentModal;
