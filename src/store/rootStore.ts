import { createContext } from 'react';
import { EmployeeStore } from './employeeStore';
import { OfficeStore } from './officeStore';
import { PublisherStore } from './publisherStore';

export class RootStore {
    employeeStore: EmployeeStore
    publisherStore: PublisherStore
    officeStore: OfficeStore

    constructor() {
        this.employeeStore = new EmployeeStore(this)
        this.publisherStore = new PublisherStore(this)
        this.officeStore = new OfficeStore(this)
    }
}

export const RooteStoreContext = createContext(new RootStore())