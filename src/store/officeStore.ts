import { loadOffices } from './../services/employess.service';
import { action, computed, makeObservable, observable } from "mobx";
import { Office } from '../models/OfficeModel';
import { RootStore } from './rootStore';


export class OfficeStore {

    @observable offices: Office[] = [];
    @observable selectedOfficeId: number = -1;

    root: RootStore
    constructor(root: RootStore) {
        makeObservable(this, {
            office: computed
        });
        this.root = root
    }

    @action fetchOffices = async () => {
        if (this.offices.length > 0) {
            return
        }
        const { data } = await loadOffices();
        this.setLoadedOffices(data)
    }

    get office() {
        return this.offices.find((officeItem: Office) => officeItem.id === this.selectedOfficeId)
    }


    setLoadedOffices(data: Office[]) {
        this.offices = data;
    }

}

