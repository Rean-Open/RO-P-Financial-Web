import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { ALL_SUMMARY_TOTAL_REPORT } from "../api/urls";
import API from "../utils/request";
import { useEffect } from "react";
import { DashboardType, filterSummaryType } from "../constants/fixedData";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDashboard = (props) => {
  const {user} = props
  const [data1, setDataForm] = useState("Daily");
  const [loading, setLoading] = useState(false);

  const dataFilter = (event) => {
    setLoading(true);
    API.get(`${ALL_SUMMARY_TOTAL_REPORT}?summaryType=${event}&userId=${user.id}`)
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
    dataFilter();
  }, []);
  const data = {
    labels: ["Income", "Expense", "Balance"],

    datasets: [
        
      {
        data: [data1[0] ? data1[0].income : 0, data1[0] ?data1[0].expense :0, data1[0] ? data1[0].balance :""],
        backgroundColor: [
          "rgba(255, 94, 36, 1)",
          "rgba(6, 207, 231, 1)",
          "rgba(27, 40, 79, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="card mt-5">
      <div className="card-body col-4 m-auto mb-5">
        <div className="row g-3 align-items-center mb-3 mt-3">
          <div className="col-8">
            <select
              className="form-select form-select-lg mb-3 size18400"
              aria-label=".form-select-lg example"
              onChange={(event) => dataFilter(event.target.value)}
            >
                {
                    DashboardType.map((item, index) =>(
                        <option 
                        value={item.summaryType}
                        selected={item.value}
                        >{item.summaryType}</option>
                    ))
                }
            </select>
          </div>
        </div>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default ChartDashboard;
