import React, { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import CardDasboard from "../../components/cardDashboard";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { MdAccountBalance } from "react-icons/md";
import Weekly from "../../components/weekly";
import ChartDashboard from "../../components/chartDashboard";
import { DASHBOARD_TOAL_URL } from "../../api/urls";
import API from "../../utils/request";
import Yearly from "../../components/Yearly";
import Monthly from "../../components/monthly";
import Daily from "../../components/daily";

const Dashboard = (props) => {
  const { user } = props;
  const [loading, setLoading] = useState(false);
  const [data, setDataForm] = useState([]);
  const dashboardList = () => {
    setLoading(true);
    API.get(`${DASHBOARD_TOAL_URL}?userId=${user.id}`)
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
    <div
      className="container"
      style={{
        marginLeft: "10px",
        paddingRight: "40px",
        marginTop: "80px",
        marginBottom: "80px",
      }}
    >
      <div className="row">
        {data ? (
          <>
            <CardDasboard
              bgColor="#ff5e24"
              amount={data.income}
              title="Total Income"
              icons={<BsArrowUp fontSize="60px" style={{ float: "right" }} />}
            />
            <CardDasboard
              bgColor="#06CFE7"
              amount={data.expense}
              title="Total Expense"
              icons={<BsArrowDown fontSize="60px" style={{ float: "right" }} />}
            />
            <CardDasboard
              bgColor="#1B284F"
              amount={data.balance}
              title="Total Balance"
              icons={
                <MdAccountBalance fontSize="60px" style={{ float: "right" }} />
              }
            />
          </>
        ) : (
          ""
        )}
      </div>
      <div className="">
        <div className="row text-center">
          <div className="col">
            <p className="titleDashboard18500">Income</p>
          </div>
          <div className="col">
            <p className="titleDashboard18500">Expense</p>
          </div>
          <div className="col">
            <p className="titleDashboard18500">Balance</p>
          </div>
        </div>
        <Daily user={user} />
        <Weekly user={user} />
        <Monthly user={user} />
        <Yearly user={user} />

        <ChartDashboard user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
