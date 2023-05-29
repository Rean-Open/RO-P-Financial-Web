import React, { useState, useEffect, useRef } from "react";
import { CREATE_CURRENCY_URL, LIST_CURRENCY_URL } from "../../api/urls";
import API from "../../utils/request";
import MessageModalMain from "../../containers/modal/messageModalMain";

const Currency = () => {
  const [data, setDataForm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState(1);
  const messageModalRef = useRef("rememberMe");

  const getListCurrency = () => {
    setLoading(true);
    API.get(LIST_CURRENCY_URL)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setDataForm(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post(CREATE_CURRENCY_URL, {
      currency_id: currency,
      user_id: 1,
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
        //   setCurrency(res.data);
          messageModalRef.current.showSuccess("You have successfully");
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getListCurrency();
  }, []);
  return (
    <div className="" style={{ marginTop: "140px", marginBottom: "80px" }}>
      <div className="col-12 mt-5 carborderd auth_body bg-white">
        <div className="">
          <div className="col-12 text-center mt-3 mb-3">
            <p className="size20700">Set up Currency</p>
          </div>
          <div className="col-12">
            <label className="mb-3 labelTextLogin">Choose Currency </label>
            <select
              className="form-select form-select-lg mb-3 size18400"
              aria-label=".form-select-lg example"
              onChange={(e) => setCurrency(e.target.value)}
            >
              {data &&
                data.map((item, index) => (
                  <option value={item.id} >{item.name}</option>
                ))}
            </select>
          </div>
          <small>
            Note: Setting up currency is use for show currency type.
          </small>
          <button
            className="button_auth button_body mb-5"
            style={{ marginTop: "32px" }}
            onClick={(e) => {
                handleSubmit(e)
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
        </div>
      </div>
      <MessageModalMain textCentered ref={messageModalRef} />
    </div>
  );
};

export default Currency;
