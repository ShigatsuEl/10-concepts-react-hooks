import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <table className="nav__container" bordercolor="white" align="center">
      <th>Number</th>
      <th width="auto">Concept</th>
      <tr>
        <td>01</td>
        <td>
          <Link to="/first-concept">useState</Link>
        </td>
      </tr>
    </table>
  );
}

export default Navigation;
