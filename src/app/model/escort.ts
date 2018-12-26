export interface Escorts 
{
    _embedded: Embedded;
    _links: Links;
    page:Page
}

export interface Embedded 
{
    person: Person[];
}

export interface Links 
{
    self: Self;
    profile: Profile;
    search:Search;
}

export interface Page 
{
    size: string;
    totalElements: string;
    totalPages:string;
    number: number;
}



export interface Self 
{
    href: string;
    templated: boolean;
    
    
}


export interface Profile 
{
    href: string;

}

export interface Search 
{
    href: string;
   
}


export interface Person 
{
    entity: Entity;
    keyword_facets:keyword_facets[];
    long_facets:long_facets[];
    keyword_multi_facets: multi_facet[];
    _links:_links;
}

export interface Entity 
{
    name:string;
    label:string;
    about_me:string;
    languages:string[];
    location_availablity:string[];
    time_slot_available:string[];
   
}

export interface keyword_facets 
{

    facet_name:string;
    facet_value: string;
   
}


export interface long_facets 
{
    facet_name:string;
    facet_value: string;
   
}




export interface _links 
{
    self:Self;
    person: person;
   
}

export interface person 
{

    href: string;
   
}

export interface multi_facet 
{
    facet_name
    facet_value: string[];
   
}