import React, { useState, useEffect } from "react";
import {
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  useDisclosure,
  Button,
  Divider,
} from "@chakra-ui/react";
import Prueba from "../Prueba/Prueba";
import Create from "./Create";
import MoreModal from "../MoreModal/MoreModal";
const auth = getAuth();
const MySwal = withReactContent(Swal);

function AllOrders({ Admin }) {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(orders);

  const q = Admin
    ? query(collection(db, "products"))
    : query(
        collection(db, "products"),
        where("createdBy", "==", auth.currentUser.uid)
      );

  const getOrders = async () => {
    const data = await getDocs(q);
    setOrders(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
    setSearch(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };
  const deleteOrder = async (id) => {
    const orderDoc = doc(db, "products", id);
    await deleteDoc(orderDoc);
    getOrders();
  };
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Estas seguro de borrar?",
      text: "No podras deshacer esta accion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  useEffect(() => {
    getOrders();
  }, []);
  const handleChange = (e) => {
    setSearchText(e.target.value);
    filtrar(e.target.value);
  };
  const filtrar = (terminoBusqueda) => {
    let resultadoBusqueda = search.filter((e) => {
      if (
        e.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return e;
      }
    });
    setOrders(resultadoBusqueda);
  };

  return (
    <div className="">
      <div className="flex justify-center space-x-96">
        <div className="w-1/6 flex justify-center ">
          <input
            className="border rounded-full "
            text="text"
            placeholder="  type"
            value={searchText}
            onChange={handleChange}
          />
        </div>

        <div className="relative ">
          <Button onClick={onOpen}>
            <Create />
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center pt-20 ">
        <TableContainer className="w-1/2  border border rounded-xl bg-white ">
          <Table variant="simple ">
            <TableCaption>NextArriving system</TableCaption>
            <Thead className="bg-gray-500 text-white  ">
              <Tr>
                <Th>Cliente</Th>
                <Th>Telefono</Th>
                <Th>Direccion</Th>
                <Th>Localidad</Th>
                <Th></Th>
              </Tr>
            </Thead>
            {orders.map((order) => (
              <Tbody className="">
                <Tr className="  lex justify-center">
                  <Td className="fl items-center  ">{order.name}</Td>
                  <Td className="">{order.phone}</Td>
                  <Td>{order.direction}</Td>
                  <Td>{order.location}</Td>
                  <div className="flex justify-center items-center">
                    <Link to={`edit/${order.id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-edit"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#454545"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1="16" y1="5" x2="19" y2="8" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => {
                        confirmDelete(order.id);
                      }}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-trash"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#454545"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="4" y1="7" x2="20" y2="7" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </button>
                    <div className="flex items-center justify-center">
                      <MoreModal orders={orders} />
                    </div>
                  </div>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AllOrders;
