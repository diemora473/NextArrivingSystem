import React from "react";
import Login from "../Login/login";
import Registers from "../Registers/Registers";
import firebaseApp from '../../Firebase/Firebase';
import { getAuth, signOut } from "firebase/auth";
import Admin from "../Users/Admin";
import Clients from "../Users/Client";
const auth = getAuth(firebaseApp);


const Home = ({user}) => {
    return (
        <div>
            <div>
                {/* <Registers/> */}
            </div>
{user.rol === "client" ? <Clients/> : <Admin/>}
<div>

            <button className="btn rounded-full hover:bg-red-600" onClick={() => signOut(auth)}>Cerra sesion</button>
</div>
        </div>
    )
}
export default Home;