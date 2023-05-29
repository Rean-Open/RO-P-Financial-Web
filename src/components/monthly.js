import React from "react";
import API from "../utils/request";
import { REPORT_MONTHLY_URL } from "../api/urls";
import { useState } from "react";
import { useEffect } from "react";
const Monthly = (props) => {
  const { user } = props;
  const [loading, setLoading] = useState(false);
  const [data, setDataForm] = useState([]);
  const dashboardList = () => {
    setLoading(true);
    API.get(`${REPORT_MONTHLY_URL}?summaryType=Monthly&userId=${user.id}`)
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

  useEffect(() => {
    dashboardList();
  }, []);
  return (
    <div className="">
      <div className="card mt-2">
        <div className="card-body">
          {data.map((item, i) => (
            <div className="row text-center">
              <div className="col">
                <p className="size18400">Monthly</p>
                <p className="size18700" style={{ color: "#ff5e24" }}>
                  {item.income}
                </p>
              </div>
              <div className="col">
                <p className="size18400">Monthly</p>
                <p className="size18700" style={{ color: "#06cfe7" }}>
                  {item.expense}
                </p>
              </div>
              <div className="col">
                <p className="text-primary size18700">Activity</p>
                <p className="size18700" style={{ color: "#1b284f" }}>
                  {item.balance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Monthly;
