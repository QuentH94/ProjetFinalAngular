
export interface Utilisateur{
    UtilisateurId : number,
    Pdp : string,
    Nom : string,
    Prenom : string,
    Pseudo : string,
    Email : string,
    Mdp : string,
    DateDeCreation : Date 
}

export interface Profil{
    UtilisateurId : number,
    Pdp : string,
    Nom : string,
    Prenom : string,
    Pseudo : string,
    Email : string,
    DateDeCreation : Date 
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
  
    Email : string,
    Mdp : string,
    
}