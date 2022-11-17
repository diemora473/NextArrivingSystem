import React from "react";
import FirebaseApp from "../../Firebase/Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
const auth = getAuth(FirebaseApp);
const Registers = (props) => {
  const firestore = getFirestore(FirebaseApp);
  const [register, setRegister] = useState(false);

  async function RegisterUsers(email, password, rol) {
    const infoUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      rol
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });
    console.log(infoUser.user.uid);
    const docuRef = doc(firestore, `users/${infoUser.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const rol = e.target.rol.value;

    await RegisterUsers(email, password, rol);
    console.log("Funcionaa", email, password, rol);
  };

  return (
    <div>
      <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6  lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <form onSubmit={handleSubmit} class="mt-8 space-y-6">
            <div class="-space-y-px rounded-md shadow-sm">
              {/* <label className=""> Email</label> */}
              <input
                type="email"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="ingresar Email"
                id="email"
                required
              />
              {/* <label>Password</label> */}
              <div className="pt-5">
                <input
                  type="password"
                  class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Ingresar Password"
                  id="password"
                  required
                />
              </div>
              <div className="pt-5">
                <select
                  className=" relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="rol"
                >
                  <option value="admin">Administrador</option>
                  <option value="client">Cliente</option>
                </select>
              </div>
              <button class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Registrar
              </button>
            </div>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default Registers;
