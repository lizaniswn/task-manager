import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const run = async () => {
      const session = await Auth.currentSession();
      const token = session.getAccessToken().getJwtToken(); // Cognito access token

      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    };

    run().catch((e) => console.error("Dashboard load failed:", e));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard - My Tasks</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.task}</li>
        ))}
      </ul>
    </div>
  );
}
