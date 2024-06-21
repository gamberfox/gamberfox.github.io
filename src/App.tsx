import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import "./css/javi-btn.css";
import Banner from "./components/Banner";
import Menu from "./components/Menu";
import Task from "./components/Task";

function App() {
  const [count, setCount] = useState<number>(0);
  const jon = () => <h1>test</h1>;
  const jon2 = () => <h1>test2</h1>;

  const { t, i18n } = useTranslation<string>();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Router>
        <div
          className="card"
          style={{
            maxWidth: "600px",
            padding: "3px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <div className="d-grid d-flex">
            <div className="card-body" style={{ width: "200px" }}>
              {t("you can choose another language")}
            </div>
            <button className="btn ln-btn" onClick={() => changeLanguage("es")}>
              {t("spanish")}
            </button>
            <button className="btn ln-btn" onClick={() => changeLanguage("en")}>
              {t("english")}
            </button>
          </div>
        </div>

        <br></br>
        <button onClick={() => setCount(count + 1)}>test and {count}</button>
        <Banner />
        <Menu />
        <Task />
        <Routes>
          <Route path="/" element={jon2()} />
          <Route path="/about" element={jon()} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
