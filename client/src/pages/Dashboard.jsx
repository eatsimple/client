import React, { useState, useEffect } from 'react';
import DashboardStatsGrid from '../chart/DashboardStatsGrid';
import LineChart from '../chart/LineChart';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  

  return (
    <div>
      <DashboardStatsGrid />
      <LineChart />
    </div>
  );
};

export default Dashboard;
