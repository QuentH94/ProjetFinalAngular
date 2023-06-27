export interface Ami{
    utilisateur1 : number,
    utilisateur2 : number,
   
}
export interface Invitation{
    id_Invitation : number,
    id_Status : number,
    utilisateur1 : number,
    utilisateur2 : number,
    demandeur : number,

}
export interface UserInvitation{
    id_Invitation : number,
    pseudo : string,
}
