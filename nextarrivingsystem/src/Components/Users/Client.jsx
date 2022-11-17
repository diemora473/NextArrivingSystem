import React from "react";
import { Link } from "react-router-dom";
import AllOrders from "../Orders/AllOrders";

const Clients = () => {
  return (
    <div>
      soy Clients
      <AllOrders />
      <div>
        <Link to="/Create">
          <button className="btn rounded-full bg-indigo-500 text-white">
            Crear
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Clients;
