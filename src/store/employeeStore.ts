import { Employee, EmployeeFormModel } from './../models/EmployeeModel';
import { loadEmployees } from './../services/employess.service';
import { action, makeObservable, observable } from "mobx";
import { RootStore } from './rootStore';


export class EmployeeStore {

    @observable employess: Employee[] = [];
    @observable employeeFormModalStatus: boolean = false;

    root: RootStore
    constructor(root: RootStore) {
        makeObservable(this);
        this.root = root
    }

    @action fetchEmployees = async () => {
        if (this.employess.length > 0) {
            return
        }
        const { data } = await loadEmployees();
        this.setLoadedEmployees(data);
    }



    @action addNewEmployee = ((postData: EmployeeFormModel) => {
        const { first_name, last_name, officeId, publisherId } = postData;
        this.setSelectedIdsForReqiredData(officeId, publisherId)
        const newData = {
            id: Math.max.apply(null, this.employess.map((employee: Employee) => employee.id)) + 1,
            first_name,
            last_name,
            office: this.root.officeStore.office!,
            publisher: this.root.publisherStore.publisher,
        }
        this.employess.push(newData);
    })

    @action updateEmployee = ((updatedData: EmployeeFormModel) => {
        const { id, first_name, last_name, officeId, publisherId } = updatedData;
        this.setSelectedIdsForReqiredData(officeId, publisherId);
        this.employess = this.employess.map((employeeItem: Employee) => employeeItem.id === id ?
            {
                id,
                first_name,
                last_name,
                office: this.root.officeStore.office!,
                publisher: this.root.publisherStore.publisher
            } : employeeItem);
    })

    @action deleteEmployeeRecord = ((employeeId: number) => {
        this.employess = this.employess.filter((record: Employee) => record.id !== employeeId)
    })

    @action setEmployeeFormModalStatus = (status: boolean) => {
        this.employeeFormModalStatus = status;
    }

    setLoadedEmployees(data: Employee[]) {
        this.employess = data;
    }

    setSelectedIdsForReqiredData(officeId: number, publisherId: number = -1) {
        this.root.officeStore.selectedOfficeId = officeId;
        this.root.publisherStore.selectedPublisherId = publisherId || -1;
    }
}
