// src/Sessionbar.js
import React from "react";
import LSidebar from "./components/lsidebar";

const Stroagebar = ({ stroages }) => {
  return (
    <LSidebar width={280}>
      {stroages.length === 0 ? (
        <p>No conversations available</p>
      ) : (
        <ul>
          {stroages.map((session, index) => (
            <li key={index}>{session.title}</li>
          ))}
        </ul>
      )}
    </LSidebar>
  );
};

export default Stroagebar;