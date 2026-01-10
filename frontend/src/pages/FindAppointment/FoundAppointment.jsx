import man from '../../assets/icons/man.svg'
import calendar from "../../assets/icons/calendar.svg"
import minitime from '../../assets/icons/mini-time.svg'
import minisiccers from '../../assets/icons/mini-siccets.svg'
import './findappointment.css'

export default function FoundAppointment({ data }){
  const { service, date, time, master } = data;
  return (
    <article className="found-card">
      <div className="found-head">
        <div>
          <h4>{service}</h4>
          <p className="date-time">{date} в {time}</p>
        </div>
      </div>

      <div className="found-grid">
        <div className="found-item">
          <div className="img_container small">
            <img src={man} alt="master" />
          </div>
          <p className="label">Мастер</p>
          <p className="info-name">{master.name}</p>
        </div>

        <div className="found-item">
          <div className="img_container small">
            <img src={minisiccers} alt="service" />
          </div>
          <p className="label">Услуга</p>
          <p className="info-name">{service}</p>
        </div>

        <div className="found-item">
          <div className="img_container small">
            <img src={calendar} alt="date" />
          </div>
          <p className="label">Дата</p>
          <p className="info-name">{date}</p>
        </div>

        <div className="found-item">
          <div className="img_container small">
            <img src={minitime} alt="time" />
          </div>
          <p className="label">Время</p>
          <p className="info-name">{time}</p>
        </div>
      </div>
    </article>
  )
}
