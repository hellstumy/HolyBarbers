import { useEffect, useState } from "react";
import useStore from "../../../store/store.js";
import TableUI from "../../../UI/Sheets";
import edit from "../../../assets/icons/edit.svg";
import delbutton from "../../../assets/icons/delete.svg";
import MyModal from "../../../UI/Modal.jsx";
import TextInput from "../../../UI/Inputs/TextInput";
import Select from "../../../UI/Inputs/Select";
import PrimaryButton from "../../../UI/Buttons/PrimaryButton";
import { useTranslation } from "react-i18next";
import { appointmentsApi } from "../../../../api/appointments.api.js";
import { servicesApi } from "../../../../api/services.api.js";
import { barbersApi } from "../../../../api/barbers.api.js";

export default function AdminAppointment() {
  const {t} = useTranslation()
  const { openModal, closeModal } = useStore();

  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);

  const [current, setCurrent] = useState(null);

  const [serviceId, setServiceId] = useState("");
  const [barberId, setBarberId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    appointmentsApi
      .getAllAppointmant()
      .then(setAppointments)
      .catch(console.error);
    servicesApi.getAllService().then(setServices).catch(console.error);
    barbersApi.getAllBarbers().then(setBarbers).catch(console.error);
  }, []);

  const resetForm = () => {
    setServiceId("");
    setBarberId("");
    setClientName("");
    setClientContact("");
    setDate("");
    setTime("");
    setCurrent(null);
  };

  // CREATE
  const handleCreate = async () => {
    try {
      const newAppointment = await appointmentsApi.createAppointmant({
        serviceId,
        barberId,
        appointmentDate: date,
        appointment_time: time,
        name: clientName,
        contact: clientContact,
      });

      const appointmentWithNames = {
        ...newAppointment,
        service_name:
          services.find((s) => s.id === newAppointment.service_id)?.name || "",
        barber_name:
          barbers.find((b) => b.id === newAppointment.barber_id)?.name || "",
      };

      setAppointments((prev) => [...prev, appointmentWithNames]);

      setAppointments((prev) => [...prev, newAppointment]);
      closeModal();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!current) return;

    try {
      const updated = await appointmentsApi.updateAppointmant(current.id, {
        serviceId,
        barberId,
        appointmentDate: date,
        appointment_time: time,
        name: clientName,
        contact: clientContact,
      });

      const updatedWithNames = {
        ...updated,
        service_name:
          services.find((s) => s.id === updated.service_id)?.name || "",
        barber_name:
          barbers.find((b) => b.id === updated.barber_id)?.name || "",
      };

      setAppointments((prev) =>
        prev.map((a) => (a.id === current.id ? updatedWithNames : a))
      );

      closeModal();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await appointmentsApi.removeAppointmant(id);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT
  const openEditModal = (a) => {
    setCurrent(a);
    setServiceId(a.service_id);
    setBarberId(a.barber_id);
    setClientName(a.client_name);
    setClientContact(a.client_contact);
    setDate(a.appointment_date);
    setTime(a.appointment_time);
    openModal();
  };

  // CREATE MODAL
  const openCreateModal = () => {
    resetForm();
    openModal();
  };

  return (
    <div className="admin-appointment">
      <MyModal
        Tittle={
          current
            ? `${t("adminAppointment.modal.edit")}`
            : `${t("adminAppointment.modal.create")}`
        }
      >
        <Select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value="">
            {t("adminAppointment.modal.servicePlaceholder")}
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </Select>

        <Select value={barberId} onChange={(e) => setBarberId(e.target.value)}>
          <option value="">
            {t("adminAppointment.modal.barberPlaceholder")}
          </option>
          {barbers.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </Select>

        <TextInput
          placeholder={t("adminAppointment.modal.clientName")}
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />

        <TextInput
          placeholder={t("adminAppointment.modal.clientContact")}
          value={clientContact}
          onChange={(e) => setClientContact(e.target.value)}
        />

        <TextInput
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextInput
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <PrimaryButton onClick={current ? handleUpdate : handleCreate}>
          {current
            ? `${t("adminAppointment.modal.submitCreate")}`
            : `${t("adminAppointment.modal.submitEdit")}`}
        </PrimaryButton>
      </MyModal>

      <div className="admin-tittle">
        <h3>{t("adminAppointment.title")}</h3>
        <p>
          {t("adminAppointment.totalAppointments")} {appointments.length}
        </p>
        <PrimaryButton onClick={openCreateModal}>createButton</PrimaryButton>
      </div>

      <TableUI>
        <div className="table-tittle">
          <div>
            {t("adminAppointment.table.service")}
          </div>
          <div>
            {t("adminAppointment.table.barber")}
          </div>
          <div>
            {t("adminAppointment.table.client")}
          </div>
          <div>
            {t("adminAppointment.table.phone")}
          </div>
          <div>
            {t("adminAppointment.table.datetime")}
          </div>
          <div>
            {t("adminAppointment.table.actions")}
          </div>
        </div>

        {appointments.map((a) => (
          <div key={a.id}>
            <div>{a.service_name}</div>
            <div>{a.barber_name}</div>
            <div>{a.client_name}</div>
            <div>{a.client_contact}</div>
            <div>
              {a.appointment_date} {a.appointment_time}
            </div>
            <div className="service-buttons">
              <button onClick={() => openEditModal(a)}>
                <img src={edit} alt="edit" />
              </button>
              <button onClick={() => handleDelete(a.id)}>
                <img src={delbutton} alt="delete" />
              </button>
            </div>
          </div>
        ))}
      </TableUI>
    </div>
  );
}
