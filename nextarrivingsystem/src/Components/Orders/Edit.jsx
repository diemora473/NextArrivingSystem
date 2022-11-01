import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getDoc, updateDoc, doc} from 'firebase/firestore';
import {db} from '../../Firebase/Firebase';

function Edit() {
    const[name, setName] = useState('');
    const[phone, setPhone] = useState(0);
    const[location, setLocation] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const updateOrder = async (e) => {
        e.preventDefault();
        const order = doc(db, "products", id)
        const data ={name:name, phone:phone, location:location}
        await updateDoc(order, data)
        navigate('/')
    }
    const getOrdersById = async(id) => {
        const order = await getDoc(doc(db, "products",id))
        if(order.exists()){
            setLocation(order.data().location)
            setName(order.data().name)
            setPhone(order.data().phone)
        }else{
            console.log("la orden no existe");
        }
    }
    useEffect(() => {
        getOrdersById(id)
    },[])
  return (
    <div className='flex justify-center '>
    <div class="  p-6 rounded-lg shadow-lg flex justify-center bg-slate-800 max-w-md">
  <form onSubmit={updateOrder}>
        <label className=' absolute text-white flex jusfity-start'>Name: </label>
        <label className='text-white pl-40'> Numero de telefono:</label>
    <div class="grid grid-cols-2 gap-4">
      <div class="form-group mb-4">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} class="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
          aria-describedby="emailHelp123" placeholder="Nombre del cliente" required/>
      </div>
      <div class="form-group mb-6">
      
        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} class="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
          aria-describedby="emailHelp124" placeholder="Last name"/>
      </div>
    </div>
    <div class="form-group mb-6">
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} class="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
        placeholder="Email address"/>
    </div>
   
    
    <button type="submit" class="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Confirmar Cambio</button>
  </form>
</div>
</div>
  )
}

export default Edit