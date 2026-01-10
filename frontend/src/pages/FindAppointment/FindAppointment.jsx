import './findappointment.css'
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import TextInput from "../../UI/Inputs/TextInput";
import FoundAppointment from './FoundAppointment';

export default function FindAppointment(){
    // sample data — replace with real data when wired to API
    const sample = {
      service: 'Классическая стрижка',
      date: '16.04.2026',
      time: '10:00',
      master: { name: 'Александр Петров', avatar: null },
    }

    return (
      <div className="find_appointment">
        <p className="subtittle">НАЙТИ ЗАПИСЬ</p>
        <h2>Найти свою запись</h2>
        <div className="find-container">
          <h4>ПОИСК ПО НОМЕРУ ТЕЛЕФОНА</h4>
          <div className="input-container">
            <TextInput placeholder={"(888) 123 123 321"} />
            <PrimaryButton>НАЙТИ</PrimaryButton>
          </div>
        </div>

        <div className="finded-container">
          <h4>Найденные записи (1)</h4>
          <FoundAppointment data={sample} />
        </div>
      </div>
    );
}