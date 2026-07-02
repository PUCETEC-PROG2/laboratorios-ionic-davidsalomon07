import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { RepositoryPayload } from "../interfaces/RepositoryPayload";
import "./Tab2.css";
import { createRepository, updateRepository } from "../services/GithubService";
import { logoGithub, folderOutline, documentTextOutline } from "ionicons/icons";


const Tab2: React.FC = () => {
  const history = useHistory();

  type EditState = {
    owner?: string;
    currentName?: string;
    name?: string;
    description?: string;
  };

  const location = useLocation<EditState>();
  const editState = location.state;
  const isEditing =
    editState?.owner !== undefined && editState?.currentName !== undefined;

  const [repositoryData, setRepositoryData] = useState<RepositoryPayload>({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const saveRepo = () => {
    if (repositoryData.name.trim() === "") {
      setErrorMsg("El nombre del repositorio es obligatorio");
      return;
    }

    setLoading(true);

    if (isEditing && editState?.owner && editState?.currentName) {
      updateRepository(
        editState.owner,
        editState.currentName,
        repositoryData
      )
        .then(() => {
          setRepositoryData({
            name: "",
            description: "",
          });

          history.replace("/tab1");
        })
        .catch((error) =>
          setErrorMsg("Error al actualizar repositorio. " + error)
        )
        .finally(() => setLoading(false));

      return;
    }

    createRepository(repositoryData)
      .then(() => history.push("/tab1"))
      .catch((error) => setErrorMsg("Error al crear repositorio. " + error))
      .finally(() => {
        setLoading(false);
        setRepositoryData({
          name: "",
          description: "",
        });
      });
  };

  useIonViewWillEnter(() => {
    setErrorMsg("");

    if (isEditing && editState) {
      setRepositoryData({
        name: editState.name || "",
        description: editState.description || "",
      });
    } else {
      setRepositoryData({
        name: "",
        description: "",
      });
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {isEditing ? "Actualizar Repositorio" : "Crear Repositorio"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="repo-form-page">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {isEditing ? "Actualizar Repositorio" : "Crear Repositorio"}
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <div className="form-card">
            <div className="form-icon">
              <div className="form-icon-inner">
                <IonIcon icon={logoGithub} />
              </div>
            </div>

            <h2>
              {isEditing ? "Editar repositorio" : "Crear repositorio"}
            </h2>

            <p>
              {isEditing
                ? "Actualiza la información de tu repositorio de GitHub."
                : "Crea un nuevo repositorio para tu cuenta de GitHub."}
            </p>
            <div className="glass-input">
              <IonIcon icon={folderOutline} className="field-icon" />

              <IonInput
                placeholder="Nombre del repositorio"
                value={repositoryData.name}
                onIonChange={(e) =>
                  setRepositoryData({ ...repositoryData, name: e.detail.value! })
                }
              />
            </div>

            <div className="glass-input glass-textarea">
              <IonIcon icon={documentTextOutline} className="field-icon textarea-icon" />

              <IonTextarea
                placeholder="Descripción del repositorio"
                value={repositoryData.description}
                onIonChange={(e) =>
                  setRepositoryData({
                    ...repositoryData,
                    description: e.detail.value!,
                  })
                }
                rows={6}
              />
            </div>

            {errorMsg !== "" && (
              <IonText color="danger">
                <p>{errorMsg}</p>
              </IonText>
            )}

            <IonButton
              className="glass-button"
              expand="block"
              color="dark"
              shape="round"
              disabled={loading}
              onClick={saveRepo}
            >
              {loading
                ? isEditing
                  ? "Actualizando..."
                  : "Guardando..."
                : isEditing
                  ? "Actualizar"
                  : "Guardar"}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;