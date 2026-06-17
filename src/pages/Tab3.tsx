import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>


        <div className='card-container'>
          <IonCard>
            <img 
            src='https://avatars.githubusercontent.com/u/216223767?s=400&u=080bd4126623560cb471b5547a05d84d5e766f4b&v=4'
            alt='Avatar'
            />
            <IonCardHeader>
              <IonCardTitle>Luis David Salomon</IonCardTitle>
              <IonCardSubtitle>luisdavidsalomon</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              Desarrollador de software con experiencia
              en aplicaciones moviles y web.
              Me gusta la tecnologia, aprender de manera continua y el deporte.
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
