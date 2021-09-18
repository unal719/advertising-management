import { loadPublishers } from './../services/employess.service';
import { action, computed, makeObservable, observable } from "mobx";
import { Publisher } from '../models/PublisherModel';
import { RootStore } from './rootStore';


export class PublisherStore {

    @observable publishers: Publisher[] = [];
    @observable selectedPublisherId: number = -1;
    root: RootStore
    constructor(root: RootStore) {
        makeObservable(this, {
            publisher: computed
        });
        this.root = root
    }

    @action fetchPublishers = async () => {
        if (this.publishers.length > 0) {
            return
        }
        const { data } = await loadPublishers();
        this.setLoadedPublishers(data)
    }

    get publisher() {
        return this.publishers.find((publisherItem: Publisher) => publisherItem.id === this.selectedPublisherId)
    }



    setLoadedPublishers(data: Publisher[]) {
        this.publishers = data;
    }
}

