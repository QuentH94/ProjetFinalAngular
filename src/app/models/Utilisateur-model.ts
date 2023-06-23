
export interface Utilisateur{
    UtilisateurId : number,
    Pdp : string,
    Nom : string,
    Prenom : string,
    Pseudo : string,
    Email : string,
    Mdp : string,
    DateDeCreation : Date,
    Connecte : boolean
}

export interface Profil{
    utilisateurId : number,
    pdp : string,
    nom : string,
    prenom : string,
    pseudo : string,
    email : string,
    dateDeCreation : Date,
    connecte : boolean
}
export interface Register{
    Pdp : string,
    Nom : string,
    Prenom : string,
    Pseudo : string,
    Email : string,
    Mdp : string,
    MdpConfirmation : string,
}
export interface Login{
  
    email : string,
    mdp : string,
    
}

export interface UpdateNomPrenom{
    Nom : string,
    Prenom : string,
}