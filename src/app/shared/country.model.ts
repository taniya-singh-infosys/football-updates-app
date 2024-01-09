export interface CountryModel{
    code?:string,
    flag?:string,
    name?:string
}

export interface ApiCountry  {
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
    response: CountryModel[];
}
