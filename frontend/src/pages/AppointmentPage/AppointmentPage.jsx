import { useEffect, useState } from 'react';
import Select from '../../UI/Inputs/Select.jsx'
import "./appointment.css";
import TextInput from '../../UI/Inputs/TextInput.jsx';
import PrimaryButton from '../../UI/Buttons/PrimaryButton.jsx';
import { barbersApi } from "../../../api/barbers.api.js";
import { servicesApi } from '../../../api/services.api.js';
import { appointmentsApi } from '../../../api/appointments.api.js';
import { useTranslation } from "react-i18next";

export default function AppointmentPage(){
  const { t } = useTranslation();
const openingHours = {
  1: { start: "10:00", end: "20:00" }, // Poniedziałek (Monday)
  2: { start: "10:00", end: "20:00" }, // Wtorek
  3: { start: "10:00", end: "20:00" }, // Środa
  4: { start: "10:00", end: "20:00" }, // Czwartek
  5: { start: "10:00", end: "20:00" }, // Piątek
  6: { start: "10:00", end: "18:00" }, // Sobota
  0: null, // Niedziela – close
};

  const [barbers, setBarbers] = useState([])
  const [services, setServices] = useState([])
  useEffect(() => {
      barbersApi.getAllBarbers().then(setBarbers).catch(console.error);
    }, []);

    useEffect(()=>{
      servicesApi.getAllService().then(setServices).catch(console.error)
    },[])

    const [master, setMaster] = useState(null)
    const [selectedHaircut, setSelectedHaircut] = useState(null);
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const handleCreateAppointment = async () => {
      if (!master || !selectedHaircut || !date || !time || !name || !phone) {
        alert(`${t("appointment.alerts.fillAllFields")}`);
        return;
      }

      try {
        const response = await appointmentsApi.createAppointmant({
          barberId: master,
          serviceId: selectedHaircut,
          appointmentDate: date,
          appointment_time: time,
          name,
          contact: phone,
        });

        console.log(response)

        alert(`${t("appointment.alerts.success")}`);
        // clean form
        setMaster(null);
        setSelectedHaircut(null);
        setDate(null);
        setTime(null);
        setName("");
        setPhone("");
      } catch (err) {
        console.error(err);
        alert(`${t("appointment.alerts.error")}`);
      }
    };


    return (
      <section className="AppointmentPage">
        <p className="subtittle">{t("appointment.subtitle")}</p>
        <h2>{t("appointment.title")}</h2>
        <p>{t("appointment.description")}</p>
        <div className="form">
          <div className="form-select">
            <p>{t("appointment.chooseService")}</p>
            <Select
              value={selectedHaircut}
              onChange={(e) => setSelectedHaircut(e.target.value)}
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {`${s.name}   ${s.price}zl`}
                </option>
              ))}
            </Select>
          </div>
          <div className="form-select">
            <p>{t("appointment.chooseMaster")}</p>
            <div className="masters-list">
              {barbers.map((b) => {
                return (
                  <div
                    role="button"
                    className={`master-card ${
                      master === b.id ? "selected" : ""
                    }`}
                    key={b.id}
                    onClick={() => setMaster(b.id)}
                  >
                    <img src={b.img_url} alt={b.name} />
                    <p className="master-name">{b.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="form-select">
            <p>{t("appointment.date")}</p>
            <TextInput
              type="date"
              value={date}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const day = selectedDate.getDay();
                if (!openingHours[day]) {
                  alert(`${t("appointment.alerts.dayClosed")}`);
                  setDate(null);
                } else {
                  setDate(e.target.value);
                  setTime(null);
                }
              }}
            />
          </div>
          <div className="form-select">
            <p>{t("appointment.time")}</p>
            <TextInput
              type="time"
              value={time}
              onChange={(e) => {
                if (!date) {
                  alert(`${t("appointment.alerts.selectDateFirst")}`);
                  return;
                }
                const selectedTime = e.target.value;
                const day = new Date(date).getDay();
                const hours = openingHours[day];
                if (!hours) {
                  alert(`${t("appointment.alerts.dayClosed")}`);
                  setTime(null);
                  return;
                }
                if (selectedTime < hours.start || selectedTime > hours.end) {
                  alert(`Select time from ${hours.start} to ${hours.end}`);
                  setTime(null);
                } else {
                  setTime(selectedTime);
                }
              }}
            />
          </div>
          <div className="form-select">
            <div>
              {t("appointment.name")}:
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={"Jan Pawel"}
              />
            </div>

            <div>
              {t("appointment.phone")}:
              <TextInput
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={"(888) 123 456 789"}
              />
            </div>
          </div>
          <div className="form-action">
            <PrimaryButton onClick={handleCreateAppointment}>
              {t("appointment.submit")}
            </PrimaryButton>
          </div>
        </div>
      </section>
    );
}