export default theme => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    marginTop: 50,
    width: 400,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  submit: {
    marginTop: 20,
  },
});

