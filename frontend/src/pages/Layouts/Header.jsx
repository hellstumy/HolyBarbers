import './Layouts.css';
import PrimaryButton from '../../UI/Buttons/PrimaryButton'
import useStore from '../../store/store';
import holy from '../../assets/holy.jpg';
export default function Header() {

  const { pageState, setMainPage, setAppointmentPage, setFindAppointmentPage } =
    useStore();

  return (
    <div className="container">
      <header>
        <div className="logo-container">
          <img src={holy} alt="Holy Barbers Logo" />
          <p>
            Holy <br />
            Barbers
          </p>
        </div>
        <nav>
          <ul>
            <li
              onClick={setMainPage}
              className={pageState === "Main" ? "active" : ""}
            >
              <a>Главная</a>
              <span></span>
            </li>
            <li
              onClick={setAppointmentPage}
              className={pageState === "Appointment" ? "active" : ""}
            >
              <a>Запись</a>
              <span></span>
            </li>
            <li
              onClick={setFindAppointmentPage}
              className={pageState === "FindAppointment" ? "active" : ""}
            >
              <a>Найти запись</a>
              <span></span>
            </li>
          </ul>
        </nav>
        <PrimaryButton onClick={setAppointmentPage}>ЗАПИСАТЬСЯ</PrimaryButton>
      </header>
    </div>
  );
}