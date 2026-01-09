import Footer from "./pages/Layouts/Footer";
import Header from "./pages/Layouts/Header";
import { useDevMode } from "./dev/useDevMode";
import MainPage from "./pages/Main/MainPage";

function App() {
  const [isAdmin, setIsAdmin] = useDevMode();

  return (
    <>

        <Header />
          {isAdmin ? (
            <>
              <h1>Admin Mode Activated</h1>
              <p>You have access to admin features.</p>
              <button onClick={() => setIsAdmin(false)}>
                Turn off Admin Mode
              </button>
            </>
          ) : (
            <>
              <MainPage />
            </>
          )}

      <Footer />
    </>
  );
}

export default App;
