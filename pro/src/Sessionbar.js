// src/Sessionbar.js
import React from "react";
import RSidebar from "./components/rsidebar";

const Sessionbar = ({ sessions }) => {
  return (
    <RSidebar width={280}>
      {sessions.length === 0 ? (
        <p>No conversations available</p>
      ) : (
        <ul>
          {sessions.map((session, index) => (
            <li key={index}>{session.title}</li>
          ))}
        </ul>
      )}
    </RSidebar>
  );
};

export default Sessionbar;