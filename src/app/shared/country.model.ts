export interface CountryModel{
    code?:String,
    flag?:String,
    name?:String
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
