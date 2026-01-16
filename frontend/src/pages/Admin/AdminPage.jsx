import './admin.css'
import useStore from '../../store/store.js';
import AdminService from './PageState/AdminService.jsx';
import AdminBarbers from './PageState/AdminBarbers.jsx';
import AdminAppointment from './PageState/AdminAppointment.jsx';
import { useTranslation } from "react-i18next";

export default function AdminPage(){
  const {AdminState, setAdminService, setAdminBarbers, setAdminAppointmen }= useStore()
  const { t } = useTranslation();

    return (
      <div className="adminPage">
        <div className="container">
          <p className="subtittle">{t("adminPage.subtitle")}</p>
          <h2>{t("adminPage.title")}</h2>
          <div className="toggle-container">
            <button
              onClick={setAdminService}
              className={
                "toggle" + (AdminState === "Service" ? " toggle-active" : "")
              }
            >
              {t("adminPage.tabs.services")}
            </button>
            <button
              onClick={setAdminBarbers}
              className={
                "toggle" + (AdminState === "Barbers" ? " toggle-active" : "")
              }
            >
              {t("adminPage.tabs.barbers")}
            </button>
            <button
              onClick={setAdminAppointmen}
              className={
                "toggle" + (AdminState === "Appointmen" ? " toggle-active" : "")
              }
            >
              {t("adminPage.tabs.appointments")}
            </button>
          </div>
          {AdminState === "Service" && <AdminService />}
          {AdminState === "Barbers" && <AdminBarbers />}
          {AdminState === "Appointmen" && <AdminAppointment />}
        </div>
      </div>
    );
}