import barberdel from "../../../assets/icons/delete.svg";
import SecondaryButton from "../../../UI/Buttons/SecondaryButton";
import PrimaryButton from "../../../UI/Buttons/PrimaryButton";
import Checkbox from "../../../UI/Inputs/Checkbox";
import MyModal from "../../../UI/Modal";
import TextInput from "../../../UI/Inputs/TextInput";
import useStore from "../../../store/store.js";
import { useEffect, useState } from "react";
import { barbersApi } from "../../../../api/barbers.api.js";

export default function AdminBarbers() {
  const [modalPage, setModalPage] = useState("");
  const { openModal, closeModal } = useStore();
  const [barbers, setBarbers] = useState([]);
  const [name, setName] = useState("");
  const [experiance, setExperiance] = useState(0);
  const [img_url, setImg_url] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [currentBarber, setCurrentBarber] = useState(null);

  useEffect(() => {
    barbersApi.getAllBarbers().then(setBarbers).catch(console.error);
    console.log(barbers);
  }, []);

  // Создание новой услуги
  const handleCreate = async () => {
    try {
      const newBarber = await barbersApi.createBarber({
        name,
        experiance,
        img_url,
        is_active: isActive,
      });
      setBarbers((prev) => [...prev, newBarber]);
      closeModal();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  // Обновление барбера
  const handleUpdate = async () => {
    if (!currentBarber) return;
    try {
      const updatedBarber = await barbersApi.updateBarber(currentBarber.id, {
        name,
        experiance,
        img_url,
        is_active: isActive,
      });
      setBarbers((prev) =>
        prev.map((b) => (b.id === currentBarber.id ? updatedBarber : b))
      );
      closeModal();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  // Удаление барбера
  const handleDelete = async (id) => {
    try {
      await barbersApi.removeBarber(id);
      setBarbers((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const editModalPage = (barber) => {
    setCurrentBarber(barber);
    setName(barber.name);
    setExperiance(barber.experiance);
    setImg_url(barber.img_url);
    setIsActive(barber.is_active);
    setModalPage("EditModal");
    openModal();
  };

  const createModalPage = () => {
    setCurrentBarber(null);
    resetForm();
    setModalPage("CreateModal");
    openModal();
  };

  const resetForm = () => {
    setName("");
    setExperiance(0);
    setImg_url("");
    setIsActive(true);
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
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя барбера"
        />
        <TextInput
          type="number"
          value={experiance}
          onChange={(e) => setExperiance(e.target.value)}
          placeholder="Опыт работы (месяц)"
        />
        <TextInput
          value={img_url}
          onChange={(e) => setImg_url(e.target.value)}
          placeholder="URL изображения"
        />
        <label>
          Активность?
          <Checkbox
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </label>

        <PrimaryButton
          onClick={modalPage === "EditModal" ? handleUpdate : handleCreate}
        >
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
        {barbers.map((b) => (
          <div key={b.id} className="adminBarber-card">
            <img src={b.img_url} alt="Barber img" />
            <p className="barber-name">{b.name}</p>
            <div className="barber-stats">
              <p className="barber-experiance">{b.experiance} Месяцев</p>
              <p
                className={`barber-IsActive ${
                  b.is_active ? "barber-active" : "barber-nonActive"
                }`}
              >
                {b.is_active ? "Активный" : "Не активный"}
              </p>
            </div>
            <div className="barber-buttons">
              <SecondaryButton onClick={() => editModalPage(b)}>
                Редактировать
              </SecondaryButton>
              <button onClick={() => handleDelete(b.id)}>
                <img src={barberdel} alt="Удалить" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
