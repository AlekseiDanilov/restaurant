import {action, decorate, observable, computed} from "mobx";
import api from "../../api/api";
import WorkTimeModel from "../WorkTimeModel";
import TextFieldModel from "../form/TextFieldModel";

export default class RestaurantStore {
  id;
  name;
  workTimeModel;

  nameField = new TextFieldModel(this, 'name').required();

  constructor() {
    api.verify().then(this.load);
  }

  load() {
    api.client.get('/api/restaurant').then(res => {
      const json = res.data;
      this.id = json.id;
      this.name = json.name;
      this.workTimeModel = new WorkTimeModel(res.data);
    }).catch(({response}) => {
      if (response.status === 404) {
        this.workTimeModel = new WorkTimeModel();
      }
    })
  }

  save() {
    if (!this.id) {
      api.client.post('/api/restaurant', this.toJS)
        .then(res => this.id = res.data.id)
    } else {
      api.client.put('/api/restaurant', this.toJS)
    }
  }

  get toJS() {
    return {
      id: this.id,
      name: this.name,
      ...this.workTimeModel.toJS
    }
  }
}

decorate(RestaurantStore, {
  name: observable,
  workTimeModel: observable,
  nameField: observable,
  load: action.bound,
  save: action.bound,
  toJS: computed
});