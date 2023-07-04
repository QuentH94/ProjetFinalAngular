export interface MessagePrive{
    id_MessagePrive : number,
    expediteur : number,
    destinataire : number,
    message : string,
    heure : Date,
}

export interface UserMessagePrive{
    utilisateurId:number,
    pdp : string,
    message : string,
    pseudo : string,
    heure : Date,
    connecte : boolean,

}