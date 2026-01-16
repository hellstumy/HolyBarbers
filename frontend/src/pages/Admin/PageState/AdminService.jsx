import delbutton from "../../../assets/icons/delete.svg";
import edit from "../../../assets/icons/edit.svg";
import PrimaryButton from "../../../UI/Buttons/PrimaryButton.jsx";
import TextInput from "../../../UI/Inputs/TextInput.jsx";
import MyModal from "../../../UI/Modal.jsx";
import TableUI from "../../../UI/Sheets.jsx";
import useStore from "../../../store/store.js";
import { servicesApi } from "../../../../api/services.api.js";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function AdminService() {
  const { t } = useTranslation();   

  const [services, setServices] = useState([]);
  const [modalPage, setModalPage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentService, setCurrentService] = useState(null);
  const { openModal, closeModal } = useStore();

  // Get All servises
  useEffect(() => {
    servicesApi.getAllService().then(setServices).catch(console.error);
  }, []);

  // Delete servise
  const handleDelete = async (id) => {
    try {
      await servicesApi.removeService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // create new servise
  const handleCreate = async () => {
    try {
      const newService = await servicesApi.createService({
        name,
        price,
        duration,
      });
      setServices((prev) => [...prev, newService]);
      closeModal();
      setName("");
      setPrice(0);
      setDuration(0);
    } catch (err) {
      console.error(err);
    }
  };

  // edit servise
  const handleUpdate = async () => {
    if (!currentService) return;
    try {
      const updatedService = await servicesApi.updateService(
        currentService.id,
        { name, price, duration }
      );

      // update UI
      setServices((prev) =>
        prev.map((s) => (s.id === currentService.id ? updatedService : s))
      );

      closeModal();
      setCurrentService(null);
      setName("");
      setPrice(0);
      setDuration(0);
    } catch (err) {
      console.error(err);
    }
  };

  // Открыть модалку редактирования
  const editModalPage = (service) => {
    setCurrentService(service);
    setModalPage("EditModal");
    setName(service.name);
    setPrice(service.price);
    setDuration(service.duration);
    openModal();
  };

  // Открыть модалку создания
  const createModalPage = () => {
    setCurrentService(null);
    setModalPage("CreateModal");
    setName("");
    setPrice(0);
    setDuration(0);
    openModal();
  };

  return (
    <div className="service-admin">
      <MyModal
        Tittle={
          modalPage === "EditModal"
            ? `${t("adminService.modal.edit")}`
            : `${t("adminService.modal.create")}`
        }
      >
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("adminService.modal.namePlaceholder")}
        />
        <TextInput
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder={t("adminService.modal.pricePlaceholder")}
        />
        <TextInput
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder={t("adminService.modal.durationPlaceholder")}
        />

        <PrimaryButton
          onClick={modalPage === "EditModal" ? handleUpdate : handleCreate}
        >
          {modalPage === "EditModal"
            ? `${t("adminService.modal.submitEdit")}`
            : `${t("adminService.modal.submitCreate")}`}
        </PrimaryButton>
      </MyModal>

      <div className="admin-tittle">
        <h3>{t("adminService.title")}</h3>
        <PrimaryButton onClick={createModalPage}>
          {t("adminService.addButton")}
        </PrimaryButton>
      </div>

      <TableUI>
        <div>
          <div>{t("adminService.table.name")}</div>
          <div>{t("adminService.table.price")}</div>
          <div>{t("adminService.table.duration")}</div>
          <div>{t("adminService.table.actions")}</div>
        </div>
        {services.map((s) => (
          <div key={s.id} className="table-data">
            <div className="service-name">{s.name}</div>
            <div className="service-price">{s.price} zl</div>
            <div className="service-time">{s.duration} minut</div>
            <div className="service-buttons">
              <button onClick={() => editModalPage(s)}>
                <img src={edit} alt="" />
              </button>

              <button onClick={() => handleDelete(s.id)}>
                <img src={delbutton} alt="" />
              </button>
            </div>
          </div>
        ))}
      </TableUI>
    </div>
  );
}
