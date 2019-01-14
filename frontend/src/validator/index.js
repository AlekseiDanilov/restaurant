const required = {
  validate: v => !!v,
  message: "Please, enter a value"
};

const positiveInt = {
  validate: v => pattern(/^[1-9][0-9]*$/g)(v),
  message: "Please, enter a positive integer"
};

const pattern = pattern => v => pattern.test(v);

export {
  required,
  positiveInt,
  pattern
};