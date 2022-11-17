import React from "react";
import Nav from "../Nav/Nav";
import AllOrders from "../Orders/AllOrders";
import Registers from "../Registers/Registers";
import { Link } from "react-router-dom";
import PanelLeft from "../PanelLeft/PanelLeft";

const Admin = ({ user }) => {
  return (
    <div>
      <div>
        <div class="flex flex-row">
          <PanelLeft />
          <div className="w-full">
            <Nav />
            <AllOrders Admin />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;
