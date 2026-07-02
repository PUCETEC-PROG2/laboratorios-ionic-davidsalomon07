import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  logoGithub,
  personOutline,
  documentTextOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import "./Tab3.css";
import { fetchUserInfo } from "../services/GithubService";
import { GithubUser } from "../interfaces/GithubUser";
import LoadingSpinner from "../components/LoadingSpinner";

const Tab3: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userInfo, setUserInfo] = useState<GithubUser | null>(null);

  useIonViewWillEnter(() => {
    setLoading(true);
    fetchUserInfo()
      .then((githubUser) => setUserInfo(githubUser))
      .catch((error) => setErrorMsg("Error al cargar usuario. " + error))
      .finally(() => setLoading(false));
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="profile-page">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="profile-container">
          {userInfo && (
            <div className="profile-card">
              <div className="profile-avatar-wrapper">
                <img
                  className="profile-avatar"
                  src={userInfo.avatar_url}
                  alt={userInfo.login}
                />
              </div>

              <h2>{userInfo.name || "Usuario de GitHub"}</h2>
              <span className="profile-username">@{userInfo.login}</span>

              <p className="profile-bio">
                {userInfo.bio || "Este usuario aún no tiene una descripción en su perfil de GitHub."}
              </p>

              <div className="profile-info-grid">
                <div className="profile-info-card">
                  <IonIcon icon={logoGithub} />
                  <span>GitHub</span>
                  <strong>Conectado</strong>
                </div>

                <div className="profile-info-card">
                  <IonIcon icon={personOutline} />
                  <span>Usuario</span>
                  <strong>{userInfo.login}</strong>
                </div>

                <div className="profile-info-card">
                  <IonIcon icon={documentTextOutline} />
                  <span>Perfil</span>
                  <strong>Activo</strong>
                </div>

                <div className="profile-info-card">
                  <IonIcon icon={checkmarkCircleOutline} />
                  <span>API</span>
                  <strong>Online</strong>
                </div>
              </div>
            </div>
          )}

          {errorMsg !== "" && (
            <IonText color="danger">
              <p>{errorMsg}</p>
            </IonText>
          )}
        </div>

        {loading && <LoadingSpinner />}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;