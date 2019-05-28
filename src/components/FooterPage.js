// import React from "react";

// const FooterPage = () => {
//   return (
//       <div className="footer-copyright text-center">
//           © {new Date().getFullYear()} Alejandro Aguilar
//       </div>
//   );
// }

// export default FooterPage;
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(0),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1" class="footer-copyright">© {new Date().getFullYear()} Alejandro Aguilar</Typography>
        </Container>
      </footer>
    </div>
  );
}