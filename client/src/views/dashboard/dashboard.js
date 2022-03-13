import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import axios from 'axios';
import PORTNUMBER from '../api/api';

const Dashboard = () => {

  // const token = localStorage.getItem("authtoken")
  // const PORT = PORTNUMBER.PORTNUMBER
  // const [totalUsers, setTotalUsers] = useState();
  // const [customerData, setCustomerData] = useState({});
  // const [recordData, setRecordData] = useState({});
  // const [childData, setChildData] = useState({});


  // const [userData, setUsersData] = useState([{ count: 0, createdAt: 0 }]);
  // const data = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //   datasets: [
  //     {
  //       label: 'Users',
  //       lineTension: 0,
  //       backgroundColor: '#27717a',
  //       borderColor: '#27717a',
  //       borderWidth: 0,
  //       data: userData.map((a) => a.count),
  //     },
  //   ],
  // };

  // var options = {
  //   scales: {
  //     yAxes: [{
  //       ticks: {
  //         precision: 0,
  //       }
  //     }]
  //   }
  // };

  // const userGraph = () => {
  //   // monthly Customers graph 
  //   let dataMonth = [];
  //   let dataValue = [];
  //   axios.get(`${PORT}/userGraph`, { headers: { authtoken: `${token}` } })
  //     .then((res) => {
  //       if (res.data.data && res.data.data.length) {
  //         for (const dataObj of res.data.data) {
  //           dataMonth.push(dataObj['month'])
  //           dataValue.push(parseInt(dataObj['value']))
  //         }
  //       }
  //       setCustomerData({
  //         labels: dataMonth,
  //         datasets: [
  //           {
  //             label: "Users",
  //             data: dataValue,
  //             // fill: true,
  //             backgroundColor: "rgba(75,192,192,0.2)",
  //             borderColor: "rgba(75,192,192,1)",
  //             borderWidth: 1,
  //           }
  //         ]
  //       })
  //     })
  // }

  // const recordGraph = () => {
  //   // monthly Device graph 
  //   let dataMonth = [];
  //   let dataValue = [];
  //   axios.get(`${PORT}/recordGraph`, { headers: { authtoken: `${token}` } })
  //     .then((res) => {
  //       if (res.data.data && res.data.data.length) {
  //         for (const dataObj of res.data.data) {
  //           dataMonth.push(dataObj['month'])
  //           dataValue.push(parseInt(dataObj['value']))
  //         }
  //       }
  //       setRecordData({
  //         labels: dataMonth,
  //         datasets: [
  //           {
  //             label: "Records",
  //             data: dataValue,
  //             // fill: true,
  //             backgroundColor: "rgba(75,192,192,0.2)",
  //             borderColor: "rgba(75,192,192,1)",
  //             borderWidth: 1,
  //           }
  //         ]
  //       })
  //     })

  // }


  // const childGraph = () => {
  //   // monthly plant graph 
  //   let dataMonth = [];
  //   let dataValue = [];
  //   axios.get(`${PORT}/childGraph`, { headers: { authtoken: `${token}` } })
  //     .then((res) => {
  //       if (res.data.data && res.data.data.length) {
  //         for (const dataObj of res.data.data) {
  //           dataMonth.push(dataObj['month'])
  //           dataValue.push(parseInt(dataObj['value']))
  //         }
  //       }
  //       setChildData({
  //         labels: dataMonth,
  //         datasets: [
  //           {
  //             label: "Childs",
  //             data: dataValue,
  //             // fill: true,
  //             backgroundColor: "rgba(75,192,192,0.2)",
  //             borderColor: "rgba(75,192,192,1)",
  //             borderWidth: 1,
  //           }
  //         ]
  //       })
  //     })

  // }


  // useEffect(() => {
  //   userGraph();
  //   recordGraph();
  //   childGraph();


  //   axios.post(`${PORT}/dashboard`, {}, { headers: { authtoken: token } })
  //     .then((res) => {
  //       setTotalUsers(res.data.data.result)
  //     })

  // }, [])

  return (
    <React.Fragment>
      <section className="analyst-sec">
        <div className="container-fluid">
          <div className="col-12">
            <div className="main-head">
              <h4>Dashboard</h4>
            </div>
          </div>

        </div>
      </section>

    </React.Fragment>
  )
}
export default Dashboard;