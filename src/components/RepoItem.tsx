import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
} from "@ionic/react";
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
    <IonItemSliding className="repo-sliding">
      <IonItem className="repo-item" lines="none" detail={false}>
        <div className="repo-card">
          <img
            className="repo-avatar"
            src={repository.owner.avatar_url}
            alt={repository.name}
          />

          <div className="repo-info">
            <h3>{repository.name}</h3>

            {repository.description && (
              <p className="repo-description">{repository.description}</p>
            )}

            {repository.language !== null && repository.language !== "" && (
              <span className="repo-language">
                Lenguaje: {repository.language}
              </span>
            )}
          </div>
        </div>
      </IonItem>

      <IonItemOptions side="end" className="glass-options">
        <IonItemOption
          className="glass-option edit-opt"
          onClick={() => repository.onEdit(repository)}
        >
          <IonIcon icon={pencil} slot="icon-only" />
        </IonItemOption>

        <IonItemOption
          className="glass-option delete-opt"
          onClick={() => repository.onDelete(repository)}
        >
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;