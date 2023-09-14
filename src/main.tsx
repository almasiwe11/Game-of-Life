import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "../style.css"
import { DateContextProvider } from "./Context/DateContextProvider.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DateContextProvider>
      <App />
    </DateContextProvider>
  </React.StrictMode>
)
