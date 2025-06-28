import { gql } from '@apollo/client';

// Colis Queries
export const GET_ALL_COLIS = gql`
  query GetAllColis {
    getAllColis {
      id
      destinataire
      adresse
      statut
      expediteur
      dateExpedition
      numeroSuivi
      poids
      dateEstimeeLivraison
      commentaire
      type
      valeurDeclaree
    }
  }
`;

export const GET_COLIS_BY_ID = gql`
  query GetColisById($id: Int!) {
    getColisById(id: $id) {
      id
      destinataire
      adresse
      statut
      expediteur
      dateExpedition
      numeroSuivi
      poids
      dateEstimeeLivraison
      commentaire
      type
      valeurDeclaree
    }
  }
`;

// Colis Mutations
export const CREATE_COLIS = gql`
  mutation CreateColis($createColisInput: CreateColisInput!) {
    createColis(createColisInput: $createColisInput) {
      id
      destinataire
      adresse
      statut
      expediteur
      numeroSuivi
    }
  }
`;

export const UPDATE_COLIS = gql`
  mutation UpdateColis($updateColisInput: UpdateColisInput!) {
    updateColis(updateColisInput: $updateColisInput) {
      id
      destinataire
      adresse
      statut
      expediteur
      numeroSuivi
    }
  }
`;

export const REMOVE_COLIS = gql`
  mutation RemoveColis($id: Int!) {
    removeColis(id: $id) {
      id
    }
  }
`;

// Users Queries
export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      email
      nom
      prenom
      telephone
      adresse
      role
      dateInscription
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: Int!) {
    user(id: $id) {
      id
      email
      nom
      prenom
      telephone
      adresse
      role
      dateInscription
    }
  }
`;

// Users Mutations
export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      nom
      prenom
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      email
      nom
      prenom
    }
  }
`;

export const REMOVE_USER = gql`
  mutation RemoveUser($id: Int!) {
    removeUser(id: $id) {
      id
    }
  }
`;

// Notifications Queries
export const GET_ALL_NOTIFICATIONS = gql`
  query GetAllNotifications {
    notifications {
      id
      userId
      colisId
      type
      message
      dateCreation
      lu
      dateLecture
    }
  }
`;

export const GET_USER_NOTIFICATIONS = gql`
  query GetUserNotifications($userId: Int!) {
    userNotifications(userId: $userId) {
      id
      userId
      colisId
      type
      message
      dateCreation
      lu
      dateLecture
    }
  }
`;

// Notifications Mutations
export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($createNotificationInput: CreateNotificationInput!) {
    createNotification(createNotificationInput: $createNotificationInput) {
      id
      userId
      colisId
      type
      message
    }
  }
`;

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($id: Int!) {
    markNotificationAsRead(id: $id) {
      id
      lu
      dateLecture
    }
  }
`;

export const MARK_ALL_NOTIFICATIONS_AS_READ = gql`
  mutation MarkAllNotificationsAsRead($userId: Int!) {
    markAllNotificationsAsRead(userId: $userId)
  }
`;