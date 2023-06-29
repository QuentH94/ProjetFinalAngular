export interface MessageGlobal{
    id_MessageGlobal : number,
    expediteur : number,
    message : string,
    heure : Date,
}
export interface UserMessage{
    utilisateurId:number,
    pdp : string,
    message : string,
    pseudo : string,
    heure : Date,
    connecte : boolean,
}