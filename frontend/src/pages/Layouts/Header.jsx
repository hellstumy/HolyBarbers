import { useState, useEffect } from "react";
import "./Layouts.css";
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import useStore from "../../store/store";
import holy from "../../assets/holy.jpg";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { pageState, setMainPage, setAppointmentPage, setFindAppointmentPage } =
    useStore();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleNavigate = (action) => {
    action();
    setMenuOpen(false);
  };

  return (
    <header>
      <div className="logo-container">
        <img src={holy} alt="Holy Barbers Logo" />
        <p>
          Holy <br /> Barbers
        </p>
      </div>

      <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li
            className={pageState === "Main" ? "active" : ""}
            onClick={() => handleNavigate(setMainPage)}
          >
            <a>{t("header.home")}</a>
            <span></span>
          </li>

          <li
            className={pageState === "Appointment" ? "active" : ""}
            onClick={() => handleNavigate(setAppointmentPage)}
          >
            <a>{t("header.appointment")}</a>
            <span></span>
          </li>

          <li
            className={pageState === "FindAppointment" ? "active" : ""}
            onClick={() => handleNavigate(setFindAppointmentPage)}
          >
            <a>{t("header.findAppointment")}</a>
            <span></span>
          </li>
        </ul>
      </nav>

      <div className="sele-div">
        <select
          className="language-select"
          value={i18n.language}
          onChange={(e) => handleChangeLanguage(e.target.value)}
        >
          <option value="pl">PL</option>
          <option value="en">EN</option>
          <option value="ua">UA</option>
        </select>

        <PrimaryButton className="primary-button" onClick={setAppointmentPage}>
          {t("header.book")}
        </PrimaryButton>
      </div>

      <div className={`burger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
