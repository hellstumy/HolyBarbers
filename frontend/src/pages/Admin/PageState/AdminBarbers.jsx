import testbarber from "../../../assets/testbarber.png";
import barberdel from "../../../assets/icons/delete.svg";
import SecondaryButton from "../../../UI/Buttons/SecondaryButton";
import PrimaryButton from "../../../UI/Buttons/PrimaryButton";
import Checkbox from "../../../UI/Inputs/Checkbox";
import MyModal from "../../../UI/Modal";
import TextInput from "../../../UI/Inputs/TextInput";
import useStore from "../../../store/store.js";
import { useState } from "react";

export default function AdminBarbers() {
  const [modalPage, setModalPage] = useState("");
  const { openModal } = useStore();

  const editModalPage = () => {
    setModalPage("EditModal");
    openModal();
  };

  const createModalPage = () => {
    setModalPage("CreateModal");
    openModal();
  };

  return (
    <div className="admin_barbers">
      <MyModal
        Tittle={
          modalPage === "EditModal"
            ? "Редактировать Барбера"
            : "Добавить Барбера"
        }
      >
        <TextInput placeholder="Имя барбера" />
        <TextInput placeholder="Опыт работы (месяц)" />
        <TextInput placeholder="URL изображения" />
        <label>
          Активность?
          <Checkbox />
        </label>
        <PrimaryButton>
          {modalPage === "EditModal" ? "Сохранить" : "Добавить"}
        </PrimaryButton>
      </MyModal>

      <div className="admin-tittle">
        <h3>Управление Барберами</h3>
        <PrimaryButton onClick={createModalPage}>
          Добавить Барбера
        </PrimaryButton>
      </div>

      <div className="AdminBarbers-container">
        <div className="adminBarber-card">
          <img src={testbarber} alt="Barber img" />
          <p className="barber-name">Александр Петров</p>
          <div className="barber-stats">
            <p className="barber-experiance">5 Месяцев</p>
            <p className="barber-IsActive barber-active">Активный</p>
          </div>
          <div className="barber-buttons">
            <SecondaryButton onClick={editModalPage}>
              Редактировать
            </SecondaryButton>
            <button>
              <img src={barberdel} alt="Удалить" />
            </button>
          </div>
        </div>

        <div className="adminBarber-card">
          <img src={testbarber} alt="Barber img" />
          <p className="barber-name">Александр Петров</p>
          <div className="barber-stats">
            <p className="barber-experiance">5 Месяцев</p>
            <p className="barber-IsActive barber-nonActive">Неактивный</p>
          </div>
          <div className="barber-buttons">
            <SecondaryButton onClick={editModalPage}>
              Редактировать
            </SecondaryButton>
            <button>
              <img src={barberdel} alt="Удалить" />
            </button>
          </div>
        </div>

        <div className="adminBarber-card">
          <img src={testbarber} alt="Barber img" />
          <p className="barber-name">Александр Петров</p>
          <div className="barber-stats">
            <p className="barber-experiance">5 Месяцев</p>
            <p className="barber-IsActive barber-active">Активный</p>
          </div>
          <div className="barber-buttons">
            <SecondaryButton onClick={editModalPage}>
              Редактировать
            </SecondaryButton>
            <button>
              <img src={barberdel} alt="Удалить" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
