/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/Users";
import UserDetailsPage from "./pages/UserDetailsPage";
import AddUser from "./components/AddUser";

const App = () => {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddUser/>
              <UserList />
            </>
          }
        />
        <Route path="/user/:userId" element={<UserDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
