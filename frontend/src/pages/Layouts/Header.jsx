import './Layouts.css';
import PrimaryButton from '../../UI/Buttons/PrimaryButton'
import holy from '../../assets/holy.jpg';
export default function Header() {
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
            <li className="active">
              <a>Главная</a>
              <span></span>
            </li>
            <li>
              <a>Запись</a>
              <span></span>
            </li>
            <li>
              <a>Найти запись</a>
              <span></span>
            </li>
          </ul>
        </nav>
        <PrimaryButton>ЗАПИСАТЬСЯ</PrimaryButton>
      </header>
    </div>
  );
}