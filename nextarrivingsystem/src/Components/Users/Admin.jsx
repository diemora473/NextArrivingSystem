import React from "react";
import AllOrders from "../Orders/AllOrders";
import Registers from "../Registers/Registers";

const Admin = () => {
    return(
        <div>
            <div>
                <div>
                    soy Admin
                </div>
                <Registers/>
                <div>
                    
                </div>
            </div>
            <div>
                <AllOrders/>
            </div>
            <a href="/Create">
                <button className="btn rounded-full bg-indigo-500 text-white">Crear</button>
            </a>
        </div>
    )
}
export default Admin;