import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FirebaseApp, { db } from "../../Firebase/Firebase";

function Search({ orders }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  console.log(orders);
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div>
        {/* {orders.map((e) => (
          <div key={orders.id}>
            <div>{orders.name}</div>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default Search;
