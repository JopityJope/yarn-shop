import "./App.css";
import React from "react";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { YarnProvider } from "./contexts/YarnContext";

function App() {
  return (
    <AuthProvider>
      <YarnProvider>
        <Layout />
      </YarnProvider>
    </AuthProvider>
  );
}

export default App;
