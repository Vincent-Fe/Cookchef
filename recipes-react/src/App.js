import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import DetailRecipe from "./pages/DetailRecipe/DetailRecipe";
import styles from "./assets/styles/App.module.scss";
import { useState } from "react";
import Admin from "./pages/Admin/Admin";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";

function App() {
  const [page, setPage] = useState("homepage");

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/recipe/:id" element={<DetailRecipe />} />
        <Route path="/auth/login" element={<Auth />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
