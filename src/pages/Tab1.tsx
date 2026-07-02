import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, useIonViewWillEnter, IonText, useIonAlert } from "@ionic/react";
import RepoItem from "../components/RepoItem";
import { Repository } from "../interfaces/Repository";
import { fetchRepositories, deleteRepository } from "../services/GithubService";
import "./Tab1.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { useHistory } from "react-router-dom";

const Tab1: React.FC = () => {
  const history = useHistory();
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("")

  const [presentAlert] = useIonAlert();

  const loadRepos = async () => {
    setLoading(true);
    fetchRepositories()
      .then((reposData) => setRepositoryList(reposData))
      .catch((error) => setErrorMsg("Error al cargar repositorios. " + error))
      .finally(() => setLoading(false));
  };

  const handleDelete = (repository: Repository) => {
    presentAlert({
      header: "Confirmar eliminación",
      message: `¿Deseas eliminar el repositorio "${repository.name}"?`,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Eliminar",
          role: "destructive",
          handler: async () => {
            try {
              await deleteRepository(
                repository.owner.login,
                repository.name
              );

              await loadRepos();
            } catch (error) {
              console.error("Error al eliminar: ", error);
              setErrorMsg("Error al eliminar el repositorio.");
            }
          },
        },
      ],
    });
  };

  const handleEdit = (repository: Repository) => {
    history.push("/tab2", {
      owner: repository.owner.login,
      currentName: repository.name,
      name: repository.name,
      description: repository.description || "",
    });
  };

  useIonViewWillEnter(() => {
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        {/*Android*/}

        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          {/*iOS */}
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repositoryList.map((repo) => (
            <RepoItem
              key={repo.owner.login + "-" + repo.name}
              {...repo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </IonList>
        {loading && <LoadingSpinner />}
        {errorMsg !== "" &&
          (<IonText color="danger">
            <p>{errorMsg}</p>
          </IonText>)
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab1;