import React from "react";
import Nav from "../Nav/Nav";
import AllOrders from "../Orders/AllOrders";
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
function Prueba({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");

  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  const sizes = ["lg", "xl"];

  return (
    <>
      {sizes.map((size) => (
        <Button
          onClick={() => handleSizeClick(size)}
          key={size}
          m={4}
        >{`Open ${size} Modal`}</Button>
      ))}

      <Modal onClose={onClose} size={size} isOpen={isOpen} className="w-full">
        <ModalOverlay />

        <div className="grid grid-cols-4 gap-4">
          <form>
            <ModalOverlay />
            <ModalContent className="grid grid-cols-4 gap-4">
              <ModalHeader>Añadi tu pedido!</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6} className="grid grid-cols-4 gap-4">
                <FormControl>
                  <FormLabel>Nombre del cliente</FormLabel>
                  <Input type="text" w={2} />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Celular</FormLabel>
                  <Input type="number" w={2} />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Direccion</FormLabel>
                  <Input type="text" />
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
    </>
  );
}

export default Prueba;
