import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',    
  },
  stepper: {
    background: '#000',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  text: {
    
  }
}));

function getSteps() {
  return ['Busca el título que más te gusta', 'Oprime el botón contactar', 'Contactate con el dueño'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Hay muchos títulos disponibles para el intercambio, busca el que más te llama la atención.`;
    case 1:
      return `Cada producto tendrá unas condiciones para el intercambio, estás condiciones no son
      necesariamente obligatorias, puedes comunicarte con el propietario para intentar llegar a un acuerdo.`;
    case 2:
      return `Una vez oprímas el botón contactar, se abrirá un chat para que hables con la persona que posee el juego
      organicen una cita en un lugar público para poder intercambiar los juegos.`;
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [redirectUrl, setRedirectUrl] = React.useState();
  const steps = getSteps();

  useEffect(() => {
    if(redirectUrl) {
      window.location.replace(redirectUrl);
    }
  }, [redirectUrl]);

  const handleNext = () => {
    if(activeStep === steps.length - 1) {
      setRedirectUrl("/marketplace");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper} theme={theme}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel className={classes.text}>{label}</StepLabel>
            <StepContent>
              <Typography className={classes.text}>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Atrás
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? '¡Ir a intercambiar!' : '¡Entendido!'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}