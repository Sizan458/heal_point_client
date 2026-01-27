import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import AppContextProvider from "./context/AppContext.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
      <ToastContainer/>
    </AppContextProvider>
  </BrowserRouter>
);
