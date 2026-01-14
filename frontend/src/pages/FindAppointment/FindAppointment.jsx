import './findappointment.css'
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import TextInput from "../../UI/Inputs/TextInput";
import FoundAppointment from './FoundAppointment';
import { appointmentsApi } from '../../../api/appointments.api';
import { useState } from 'react';

export default function FindAppointment(){
    
    const [phoneData, setPhoneData] = useState([])
    const [phone, setPhone] = useState()

    const handleFind = ()=>{
      appointmentsApi
        .getAppointmantByContact(phone)
        .then(setPhoneData)
        .catch(console.error);
        console.log(phoneData);
    }

    return (
      <div className="find_appointment">
        <p className="subtittle">НАЙТИ ЗАПИСЬ</p>
        <h2>Найти свою запись</h2>
        <div className="find-container">
          <h4>ПОИСК ПО НОМЕРУ ТЕЛЕФОНА</h4>
          <div className="input-container">
            <TextInput
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={"(888) 123 123 321"}
            />
            <PrimaryButton onClick={handleFind}>НАЙТИ</PrimaryButton>
          </div>
        </div>

        <div className="finded-container">
          <h4>Найденные записи {phoneData.length}</h4>
          {phoneData.map((item, index) => (
            <FoundAppointment key={index} phoneData={item} />
          ))}
        </div>
      </div>
    );
}