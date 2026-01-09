import useStore from "./store/store";
import MyModal from "./UI/Modal";
function App() {
  const { openModal } = useStore();

  return (
    <>
      <MyModal Tittle="Modal Title">
        
      </MyModal>
      <h1>Hello</h1>
      <button onClick={openModal}>Open Modal</button>
    </>
  );
}

export default App;
