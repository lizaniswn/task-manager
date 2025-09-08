// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth, Hub } from "aws-amplify"; // v5: Auth & Hub here
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = signed out

  const loadUser = async (bypass = false) => {
    try {
      // bypassCache ensures we pick up the fresh session right after redirect
      const u = await Auth.currentAuthenticatedUser({ bypassCache: bypass });
      setUser(u);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    // 1) On first mount, check with bypassCache to capture fresh OAuth session
    loadUser(true);

    // 2) Listen to auth events (signIn, signOut, etc.)
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      const { event } = payload;
      // Useful events: 'signIn', 'signOut', 'cognitoHostedUI', 'oAuthSignIn'
      if (event === "signIn" || event === "cognitoHostedUI" || event === "oAuthSignIn") {
        loadUser(true);
      }
      if (event === "signOut") {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    // Opens Hosted UI (uses oauth config from aws-exports.js)
    Auth.federatedSignIn();
  };

  const handleLogout = async () => {
    await Auth.signOut();
    setUser(null);
    window.location.assign("/");
  };

  if (user === undefined) {
    return <div style={{ padding: 20 }}>Loading…</div>;
  }

  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        {!user ? (
          <>
            <h2>Task Manager</h2>
            <button onClick={handleLogin}>Login with Cognito</button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 12 }}>
              <span>Signed in as: <b>{user.attributes?.email}</b></span>
              <button style={{ marginLeft: 12 }} onClick={handleLogout}>
                Logout
              </button>
            </div>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
