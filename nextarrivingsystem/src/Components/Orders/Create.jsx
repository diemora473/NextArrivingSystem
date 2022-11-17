import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FirebaseApp, { db } from "../../Firebase/Firebase";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
const auth = getAuth(FirebaseApp);
console.log("soy auth", auth);

function Create({ user }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [direction, setDirection] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const navigate = useNavigate();
  const ordersCollections = collection(db, "products");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const add = async (e) => {
    e.preventDefault();
    await addDoc(ordersCollections, {
      name: name,
      phone: phone,
      location: location,
      description: description,
      direction: direction,
      createdBy: auth.currentUser.uid,
    });
    navigate("/");
  };
  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  const sizes = ["xl"];
  return (
    <div className="flex justify-center ">
      {sizes.map((size) => (
        <Button onClick={() => handleSizeClick(size)} key={size} m={4}>
          {"Añadir"}
        </Button>
      ))}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={size}
      >
        <div className="flex grid grid-cols-4">
          <form onSubmit={add}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Añadi tu pedido!</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6} className="grid grid-cols-2 gap-2">
                <FormControl>
                  <FormLabel>Nombre del cliente</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl pb={6}>
                  <FormLabel>Celular</FormLabel>
                  <Input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormControl>
                <FormControl pb={6}>
                  <FormLabel>Direccion</FormLabel>
                  <Input
                    type="text"
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                  />
                </FormControl>
                <FormControl pb={6}>
                  <FormLabel>Localidad</FormLabel>
                  <Input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </FormControl>
                <FormControl pb={6}>
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Añadir
                </Button>
                <Button onClick={onClose}>Cerrar</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Create;
