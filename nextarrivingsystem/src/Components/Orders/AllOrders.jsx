import React, {useState, useEffect} from 'react'
import {collection, getDoc, getDocs, deleteDoc, doc} from 'firebase/firestore';
import {db} from '../../Firebase/Firebase'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function AllOrders() {
    const [orders, setOrders] = useState([]);
    const ordersCollections = collection(db, "products");

    const getOrders = async () => {
const data = await getDocs(ordersCollections)
setOrders(
    data.docs.map((doc) => ({
        ...doc.data(), id:doc.id
    }))
)
console.log(orders)

}
const deleteOrder = async (id) => {
const orderDoc = doc(db, "products", id)
await deleteDoc(orderDoc)
getOrders()
}
const confirmDelete = (id) => {
    Swal.fire({
      title: 'Estas seguro de borrar?',
      text: "No podras deshacer esta accion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
    useEffect(() => {
        getOrders()
    },[])
  return (
<div>
{orders.map((order) => (
<div key={order.id}>
<div class="flex justify-center pt-10 flex-row flex-col-2">
  <div class="flex flex-col-2 md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
    {/* <img class=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg" alt="" /> */}
    <div class="p-6 flex flex-col-2 justify-start">
      <h5 class="text-gray-900 text-xl pr-10 font-medium mb-2">{order.name}</h5>
      <p class="text-gray-700 pr-10 text-base mb-4">
        Direccion: {order.location}
      </p>
      <p class="text-gray-700 text-base pr-10 mb-4">
        Celular: {order.phone}
      </p>
     <a href={`edit/${order.id}`}>
        <button className='btn rounded-full bg-green-600 text-white'>
Editar
        </button>
     </a>
      <button className='btn rounded-full text-white bg-red-600' onClick={() => {confirmDelete(order.id)}}> borrar</button>
    </div>
  </div>
</div>
</div>
        ))}
</div>
  )
}

export default AllOrders