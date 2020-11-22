import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <table className="nav__container" bordercolor="white" align="center">
      <thead>
        <tr>
          <th>Number</th>
          <th width="auto">Concept</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>01</td>
          <td>
            <Link to="/first-concept">useState</Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Navigation;
