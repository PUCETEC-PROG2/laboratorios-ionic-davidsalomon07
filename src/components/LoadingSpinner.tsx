import { IonSpinner } from "@ionic/react";
import "./LoadingSpinner.css";
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-overlay">
        <IonSpinner name="crescent" color="primary" className="loading-spinner" />
      <p>Cargando repositorios...</p>
    </div>
  );
}

export default LoadingSpinner;