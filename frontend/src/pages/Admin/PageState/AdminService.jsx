import delbutton from "../../../assets/icons/delete.svg";
import edit from "../../../assets/icons/edit.svg";
import PrimaryButton from "../../../UI/Buttons/PrimaryButton.jsx";
import TextInput from "../../../UI/Inputs/TextInput.jsx";
import MyModal from "../../../UI/Modal.jsx";
import TableUI from "../../../UI/Sheets.jsx";
import useStore from "../../../store/store.js";
import { useState } from "react";

export default function AdminService() {
    const [modalPage, setModalPage] = useState("")
    const {openModal} = useStore()


    const editModalPage = () => {
      setModalPage("EditModal");
      openModal();
    };

    const createModalPage = () => {
      setModalPage("CreateModal");
      openModal();
    };
  return (
    <div className="service-admin">
      <MyModal
        Tittle={
          modalPage === "EditModal" ? "Редактировать услугу" : "Создать услугу"
        }
      >
        <TextInput placeholder="Имя услуги" />
        <TextInput placeholder="Цена услуги" />
        <TextInput placeholder="Длительность услуги" />

        <PrimaryButton>
          {modalPage === "EditModal" ? "Редактировать" : "Создать"}
        </PrimaryButton>
      </MyModal>

      <div className="admin-tittle">
        <h3>Управление услугами</h3>
        <PrimaryButton onClick={createModalPage}>СОЗДАТЬ УСЛУГУ</PrimaryButton>
      </div>
      <TableUI>
        <div>
          <div>НАЗВАНИЕ</div>
          <div>ЦЕНА</div>
          <div>ВРЕМЯ</div>
          <div>ДЕЙСТВИЯ</div>
        </div>
        <div className="table-data">
          <div className="service-name">Классическая стрижка</div>
          <div className="service-price">3000 </div>
          <div className="service-time">45 мин</div>
          <div className="service-buttons">
            <button onClick={editModalPage}>
              <img src={edit} alt="" />
            </button>

            <button>
              <img src={delbutton} alt="" />
            </button>
          </div>
        </div>
      </TableUI>
    </div>
  );
}
