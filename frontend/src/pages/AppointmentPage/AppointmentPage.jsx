import { useEffect, useState } from 'react';
import Select from '../../UI/Inputs/Select.jsx'
import "./appointment.css";
import TextInput from '../../UI/Inputs/TextInput.jsx';
import PrimaryButton from '../../UI/Buttons/PrimaryButton.jsx';
import { barbersApi } from "../../../api/barbers.api.js";
import { servicesApi } from '../../../api/services.api.js';
import { appointmentsApi } from '../../../api/appointments.api.js';


export default function AppointmentPage(){
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
        alert("Заполните все поля");
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

        alert("Запись успешно создана!");
        // clean form
        setMaster(null);
        setSelectedHaircut(null);
        setDate(null);
        setTime(null);
        setName("");
        setPhone("");
      } catch (err) {
        console.error(err);
        alert("Ошибка при создании записи");
      }
    };


    return (
      <section className="AppointmentPage">
        <p className="subtittle">ОНЛАЙН ЗАПИСЬ</p>
        <h2>Запись на услуги</h2>
        <p>
          Выберите удобное время, мастера и услугу. Запись подтверждается
          мгновенно.
        </p>
        <div className="form">
          <div className="form-select">
            <p>ВЫБЕРИТЕ УСЛУГУ</p>
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
            <p>ВЫБЕРИТЕ МАСТЕРА</p>
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
            <p>ДАТА</p>
            <TextInput
              type="date"
              value={date}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const day = selectedDate.getDay();
                if (!openingHours[day]) {
                  alert(
                    "Выбраный день закрыт! Пожалуйста, выберите другой день."
                  );
                  setDate(null);
                } else {
                  setDate(e.target.value);
                  setTime(null);
                }
              }}
            />
          </div>
          <div className="form-select">
            <p>ВРЕМЯ</p>
            <TextInput
              type="time"
              value={time}
              onChange={(e) => {
                if (!date) {
                  alert("Сначала выберите дату");
                  return;
                }
                const selectedTime = e.target.value;
                const day = new Date(date).getDay();
                const hours = openingHours[day];
                if (!hours) {
                  alert("Этот день закрыт!");
                  setTime(null);
                  return;
                }
                if (selectedTime < hours.start || selectedTime > hours.end) {
                  alert(`Выберите время между ${hours.start} и ${hours.end}`);
                  setTime(null);
                } else {
                  setTime(selectedTime);
                }
              }}
            />
          </div>
          <div className="form-select">
            <div>
              Имя:
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={"Боб"}
              />
            </div>

            <div>
              Телефон:
              <TextInput
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={"(888) 123 456 789"}
              />
            </div>
          </div>
          <div className="form-action">
            <PrimaryButton onClick={handleCreateAppointment}>
              ПОДТВЕРДИТЬ ЗАПИСЬ
            </PrimaryButton>
          </div>
        </div>
        <p>{`Name:${name} ,Phone:${phone} , Date:${date} , Time:${time} , Master:${master} , Service:${selectedHaircut} ,`}</p>
      </section>
    );
}