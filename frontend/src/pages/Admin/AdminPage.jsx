import './admin.css'
import useStore from '../../store/store.js';
import AdminService from './PageState/AdminService.jsx';
import AdminBarbers from './PageState/AdminBarbers.jsx';
import AdminAppointment from './PageState/AdminAppointment.jsx';


export default function AdminPage(){
  const {AdminState, setAdminService, setAdminBarbers, setAdminAppointmen }= useStore()

    return (
      <div className="adminPage">
        <div className="container">
          <p className="subtittle">ПАНЕЛЬ УПРАВЛЕНИЯ</p>
          <h2>ADMIN PANEL</h2>
          <div className="toggle-container">
            <button
              onClick={setAdminService}
              className={
                "toggle" + (AdminState === "Service" ? " toggle-active" : "")
              }
            >
              Услуги
            </button>
            <button
              onClick={setAdminBarbers}
              className={
                "toggle" + (AdminState === "Barbers" ? " toggle-active" : "")
              }
            >
              Барберы
            </button>
            <button
              onClick={setAdminAppointmen}
              className={
                "toggle" + (AdminState === "Appointmen" ? " toggle-active" : "")
              }
            >
              Записи
            </button>
          </div>
          {AdminState === "Service" && <AdminService />}
          {AdminState === "Barbers" && <AdminBarbers />}
          {AdminState === "Appointmen" && <AdminAppointment/>}
        </div>
      </div>
    );
}