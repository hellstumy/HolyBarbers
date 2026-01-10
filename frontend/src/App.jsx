import Footer from "./pages/Layouts/Footer";
import Header from "./pages/Layouts/Header";
import { useDevMode } from "./dev/useDevMode";
import MainPage from "./pages/Main/MainPage";
import AppointmentPage from "./pages/AppointmentPage/AppointmentPage";
import useStore from "./store/store";
import FindAppointment from "./pages/FindAppointment/FindAppointment";
import AdminPage from "./pages/Admin/AdminPage";

function App() {
  const {pageState} = useStore()
  const [isAdmin] = useDevMode();

  return (
    <>
      <Header />
      {isAdmin ? (
        <AdminPage/>
      ) : (
        <>
          {pageState == "Main" && <MainPage />}
          {pageState == "Appointment" && <AppointmentPage />}
          {pageState == "FindAppointment" && <FindAppointment/>}
        </>
      )}

      <Footer />
    </>
  );
}

export default App;
