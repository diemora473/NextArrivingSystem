import React, { useState } from "react";

function MoreModal({ orders }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-dots-vertical"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#9e9e9e"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="19" r="1" />
        <circle cx="12" cy="5" r="1" />
      </svg>
      {/* {orders.map((e) => (
        <div>{e.name}</div>
      ))} */}
    </div>
  );
}

export default MoreModal;
