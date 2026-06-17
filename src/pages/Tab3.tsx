import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab3.css";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          <IonCard className="card">
            <img
              src="https://avatars.githubusercontent.com/u/216223767?s=96&v=4"
              alt="Avatar David"
            />

            {/* IonCardHeader - Sirve para poner como si fuera un card */}
            <IonCardHeader>
              <IonCardTitle>David Salomon</IonCardTitle>
              <IonCardSubtitle>luisdavidsalomon</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>Desarrollador de Software / Apasionado de los videojuegos y anime</IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;