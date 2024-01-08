export interface TeamModel {
    teams:{
        home:{
            id:number;
            name:string;
            logo:string;
            winner:boolean;
        }
        away:{
            id:number;
            name:string;
            logo:string;
            winner:boolean;
        }
    } 

    goals:{
        home:number;
        away:number;
    }

    league:{
        id:number;
        name:string;
        country:string;
        logo:string;
        flag:string;
        season:number;
        round:string;
    }
}
export interface ApiTeams  {
    get?: string;
    parameters?: {
        league?: string;
        season?: string;
    }; 
    errors?: string[]; 
    results?: number;
    paging?: {
        current?:number;

    };
    response: TeamModel[];
}