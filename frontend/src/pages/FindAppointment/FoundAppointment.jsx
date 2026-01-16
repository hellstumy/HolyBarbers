import man from '../../assets/icons/man.svg'
import calendar from "../../assets/icons/calendar.svg"
import minitime from '../../assets/icons/mini-time.svg'
import minisiccers from '../../assets/icons/mini-siccets.svg'
import './findappointment.css'
import { useTranslation } from "react-i18next";
export default function FoundAppointment({ phoneData }) {
   const { t } = useTranslation();
  
  return (
    <article className="found-card">
      <div className="found-head">
        <div>
          <h4>{phoneData.service_name}</h4>
          <p className="date-time">
            {phoneData.appointment_date} / {phoneData.appointment_time}
          </p>
        </div>
      </div>

      <div className="found-grid">
        <div className="found-item">
          <div className="img_container small">
            <img src={man} alt="master" />
          </div>
          <p className="label">{t("foundAppointment.master")}:</p>
          <p className="info-name">{phoneData.barber_name}</p>
        </div>

        <div className="found-item">
          <div className="img_container small">
            <img src={minisiccers} alt="service" />
          </div>
          <p className="label">{t("foundAppointment.service")}:</p>
          <p className="info-name">{phoneData.service_name}</p>
        </div>

        <div className="found-item">
          <div className="img_container small">
            <img src={calendar} alt="date" />
          </div>
          <p className="label">{t("foundAppointment.date")}:</p>
          <p className="info-name">{phoneData.appointment_date}</p>
        </div>

        <div className="found-item">
          <div className="img_container small">
            <img src={minitime} alt="time" />
          </div>
          <p className="label">{t("foundAppointment.time")}:</p>
          <p className="info-name">{phoneData.appointment_time}</p>
        </div>
      </div>
    </article>
  );
}
