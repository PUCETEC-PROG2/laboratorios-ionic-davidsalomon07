import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonThumbnail,
} from "@ionic/react";
import "./RepoItem.tsx";
import React from "react";
import "./RepoItem.css";
import { pencil, trash } from "ionicons/icons";
import { Repository } from "../interfaces/Repository.js";

interface RepoItemProps extends Repository {
  onEdit: (repository: Repository) => void;
  onDelete: (repository: Repository) => void;
}

const RepoItem: React.FC<RepoItemProps> = (repository) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img src={repository.owner.avatar_url} alt={repository.name} />
        </IonThumbnail>
        <IonLabel>
          <h3>{repository.name}</h3>
          <p>{repository.description}</p>
          {repository.language !== null && repository.language !== "" &&
            (<p>
              <strong>Lenguaje: </strong>
              {repository.language}
            </p>)}
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption
          color="warning"
          onClick={() => repository.onEdit(repository)}
        >
          <IonIcon icon={pencil} slot="icon-only" />
        </IonItemOption>
        <IonItemOption
          color="danger"
          onClick={() => repository.onDelete(repository)}
        >
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;