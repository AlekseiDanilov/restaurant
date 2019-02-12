import {computed, decorate, observable} from "mobx";
import moment from 'moment';
import FormBuilder from "./form/FormBuilder";

const afterTimeValidator = timeFoo => ({
  validate: v => v.isAfter(timeFoo()),
  message: 'Time must be more then "from"'
});

export default class WorkTimeModel {
  monFrom = moment('1970-01-01 00:00:00');
  monUntil = moment('1970-01-01 00:00:00');
  tueFrom = moment('1970-01-01 00:00:00');
  tueUntil = moment('1970-01-01 00:00:00');
  wedFrom = moment('1970-01-01 00:00:00');
  wedUntil = moment('1970-01-01 00:00:00');
  thuFrom = moment('1970-01-01 00:00:00');
  thuUntil = moment('1970-01-01 00:00:00');
  friFrom = moment('1970-01-01 00:00:00');
  friUntil = moment('1970-01-01 00:00:00');
  satFrom = moment('1970-01-01 00:00:00');
  satUntil = moment('1970-01-01 00:00:00');
  sunFrom = moment('1970-01-01 00:00:00');
  sunUntil = moment('1970-01-01 00:00:00');

  form;

  constructor(json) {
    if (json) {
      this.monFrom = moment(json.monFrom);
      this.monUntil = moment(json.monUntil);
      this.tueFrom = moment(json.tueFrom);
      this.tueUntil = moment(json.tueUntil);
      this.wedFrom = moment(json.wedFrom);
      this.wedUntil = moment(json.wedUntil);
      this.thuFrom = moment(json.thuFrom);
      this.thuUntil = moment(json.thuUntil);
      this.friFrom = moment(json.friFrom);
      this.friUntil = moment(json.friUntil);
      this.satFrom = moment(json.satFrom);
      this.satUntil = moment(json.satUntil);
      this.sunFrom = moment(json.sunFrom);
      this.sunUntil = moment(json.sunUntil);
    }

    this.form = new FormBuilder(this)
      .date('monFrom', f => f.withLabel('Monday from').required())
      .date('monUntil', f => f.withLabel('until').required()
        .withValidator(afterTimeValidator(() => this.monFrom)))

      .date('tueFrom', f => f.withLabel('Tuesday from').required())
      .date('tueUntil', f => f.withLabel('until').required()
        .withValidator(afterTimeValidator(() => this.tueFrom)))

      .date('wedFrom', f => f.withLabel('Wednesday from').required())
      .date('wedUntil', f => f.withLabel('until').required()
        .withValidator(afterTimeValidator(() => this.wedFrom)))

      .date('thuFrom', f => f.withLabel('Thursday from').required())
      .date('thuUntil', f => f.withLabel('until').required()
        .withValidator(afterTimeValidator(() => this.thuFrom)))

      .date('friFrom', f => f.withLabel('Friday from').required())
      .date('friUntil', f => f.withLabel('until').required()
        .withValidator(afterTimeValidator(() => this.friFrom)))

      .date('satFrom', f => f.withLabel('Saturday from').required())
      .date('satUntil', f => f.withLabel('until').required()
        .withValidator(afterTimeValidator(() => this.satFrom)))

      .date('sunFrom', f => f.withLabel('Sunday from').required())
      .date('sunUntil', f => f.withLabel('until').required()
        .withValidator(afterTimeValidator(() => this.sunFrom)))
  }

  get toJS() {
    return {
      monFrom: this.monFrom.toJSON(),
      monUntil: this.monUntil.toISOString(),
      tueFrom: this.tueFrom.toISOString(),
      tueUntil: this.tueUntil.toISOString(),
      wedFrom: this.wedFrom.toISOString(),
      wedUntil: this.wedUntil.toISOString(),
      thuFrom: this.thuFrom.toISOString(),
      thuUntil: this.thuUntil.toISOString(),
      friFrom: this.friFrom.toISOString(),
      friUntil: this.friUntil.toISOString(),
      satFrom: this.satFrom.toISOString(),
      satUntil: this.satUntil.toISOString(),
      sunFrom: this.sunFrom.toISOString(),
      sunUntil: this.sunUntil.toISOString()
    }
  }
}

decorate(WorkTimeModel, {
  monFrom: observable,
  monUntil: observable,
  tueFrom: observable,
  tueUntil: observable,
  wedFrom: observable,
  wedUntil: observable,
  thuFrom: observable,
  thuUntil: observable,
  friFrom: observable,
  friUntil: observable,
  satFrom: observable,
  satUntil: observable,
  sunFrom: observable,
  sunUntil: observable,
  form: observable,
  toJS: computed
});