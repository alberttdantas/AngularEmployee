export interface Employee{
    id? : number;
    name: string;
    lastName: string;
    departament: string;
    active: boolean;
    shift: string;
    creationDate? : string;
    modificationDate? : string;
}