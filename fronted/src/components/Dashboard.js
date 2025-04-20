// frontend/src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ instructors: 0, courses: 0, lectures: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2>📊 Admin Dashboard</h2>
      <ul>
        <li>🧑‍🏫 Total Instructors: {stats.instructors}</li>
        <li>📘 Total Courses: {stats.courses}</li>
        <li>📅 Total Lectures: {stats.lectures}</li>
      </ul>
    </div>
  );
};

export default Dashboard;