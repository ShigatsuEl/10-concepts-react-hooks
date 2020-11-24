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
        <tr>
          <td>02</td>
          <td>
            <Link to="/second-concept">useInput</Link>
          </td>
        </tr>
        <tr>
          <td>03</td>
          <td>
            <Link to="/third-concept">useTabs</Link>
          </td>
        </tr>
        <tr>
          <td>04</td>
          <td>
            <Link to="/fourth-concept">useEffect</Link>
          </td>
        </tr>
        <tr>
          <td>05</td>
          <td>
            <Link to="/fifth-concept">useTitle</Link>
          </td>
        </tr>
        <tr>
          <td>06</td>
          <td>
            <Link to="/sixth-concept">useClick</Link>
          </td>
        </tr>
        <tr>
          <td>07</td>
          <td>
            <Link to="/seventh-concept">useConfirm & usePreventLeave</Link>
          </td>
        </tr>
        <tr>
          <td>08</td>
          <td>
            <Link to="/eighth-concept">useBeforeLeave</Link>
          </td>
        </tr>
        <tr>
          <td>09</td>
          <td>
            <Link to="/nineth-concept">useFadeIn & useNetwork</Link>
          </td>
        </tr>
        <tr>
          <td>10</td>
          <td>
            <Link to="/tenth-concept">useScroll & useFullscreen</Link>
          </td>
        </tr>
        <tr>
          <td>11</td>
          <td>
            <Link to="/eleventh-concept">useNotification</Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Navigation;
