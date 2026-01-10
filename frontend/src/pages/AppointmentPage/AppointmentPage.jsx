import { useState } from 'react';
import Select from '../../UI/Inputs/Select.jsx'
import "./appointment.css";
import TextInput from '../../UI/Inputs/TextInput.jsx';
import PrimaryButton from '../../UI/Buttons/PrimaryButton.jsx';
export default function AppointmentPage(){
    const [selectedHaircut, setSelectedHaircut] = useState("");
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')


    const haircutOptions = [
      { value: "buzzcut", label: "Короткая стрижка" },
      { value: "undercut", label: "Андеркат" },
      { value: "pompadour", label: "Помпадур" },
      { value: "bob", label: "Боб" },
      { value: "mohawk", label: "Ирокез" },
    ];

    const masters = [
      {
        name: "Александр Петров",
        photo:
          "https://img.freepik.com/free-photo/barber-man-apron-with-hairdressing-tools-looking-camera-with-serious-confident-expression-standing-white-background_141793-118147.jpg?semt=ais_hybrid&w=740&q=80",
      },
      { name: "Иван Смирнов" },
      { name: "Михаил Козлов" },
    ];
    const [selectedMaster, setSelectedMaster] = useState(null);


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
              options={haircutOptions}
            />
          </div>
          <div className="form-select">
            <p>ВЫБЕРИТЕ Мастера</p>
            <div className="masters-list">
              {masters.map((m, i) => {
                return (
                  <div
                    role="button"
                    tabIndex={0}
                    className={`master-card ${selectedMaster === i ? 'selected' : ''}`}
                    key={i}
                    onClick={() => setSelectedMaster(i)}
                    onKeyDown={() => setSelectedMaster(i)}
                  >
                    <img src={m.photo} alt={m.name} />
                    <p className="master-name">{m.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="form-select">
            <p>ДАТА</p>
            <TextInput
              onChange={(e) => setDate(e.target.value)}
              type={"date"}
            />
          </div>
          <div className="form-select">
            <p>ВРЕМЯ</p>
            <TextInput
              onChange={(e) => setTime(e.target.value)}
              type={"time"}
            />
          </div>
          <div className="form-select">
            <div>
              Имя:
              <TextInput
                onChange={(e) => setName(e.target.value)}
                placeholder={"Боб"}
              />
            </div>

            <div>
              Телефон:
              <TextInput
                onChange={(e) => setPhone(e.target.value)}
                placeholder={"(888) 123 456 789"}
              />
            </div>
          </div>
          <div className="form-action">
            <PrimaryButton>ПОДТВЕРДИТЬ ЗАПИСЬ</PrimaryButton>
          </div>
        </div>
      </section>
    );
}