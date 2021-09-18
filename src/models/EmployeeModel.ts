import { Office } from "./OfficeModel";
import { Publisher } from "./PublisherModel";

export type Employee = {
    id: number,
    first_name: string,
    last_name: string,
    office: Office,
    publisher?: Publisher
}

export type EmployeeFormModel = {
    id?: number,
    first_name: string,
    last_name: string,
    officeId: number,
    publisherId?: number
}

export enum EmployeeFormType {
    "None" = 0,
    "NewForm" = 1,
    "EditForm" = 2
}

