// // src/pages/NewAudit.jsx
// import { Typography, Box, Paper } from '@mui/material';
// export default function NewAudit() {
//   return (
//     <Box>
//       <Typography variant="h2" gutterBottom>New Compliance Audit</Typography>
//       <Paper sx={{ p: 3 }}>
//         {/* JurisdictionSelector, QuestionnaireStepper … */}
//       </Paper>
//     </Box>
//   );
// }
// src/pages/NewAudit.jsx
import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';

import JurisdictionSelector from '../components/NewAudit/JurisdictionSelector';
import ModelDetailsForm from '../components/NewAudit/ModelDetailsForm';
import SampleOutputUploader from '../components/NewAudit/SampleOutputUploader';
import ReviewSubmit from '../components/NewAudit/ReviewSubmit';

const steps = [
  'Select Jurisdictions',
  'Model Details',
  'Sample Output',
  'Review & Submit'
];

export default function NewAudit() {
  const [activeStep, setActiveStep] = useState(0);
  // You can lift these states up or use a form library later
  const [jurisdictions, setJurisdictions] = useState([]);
  const [modelDetails, setModelDetails] = useState({ name: '', industry: '', version: '' });
  const [sampleOutput, setSampleOutput] = useState('');
  
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <JurisdictionSelector
            value={jurisdictions}
            onChange={setJurisdictions}
          />
        );
      case 1:
        return (
          <ModelDetailsForm
            value={modelDetails}
            onChange={setModelDetails}
          />
        );
      case 2:
        return (
          <SampleOutputUploader
            value={sampleOutput}
            onChange={setSampleOutput}
          />
        );
      case 3:
        return (
          <ReviewSubmit
            jurisdictions={jurisdictions}
            modelDetails={modelDetails}
            sampleOutput={sampleOutput}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        New Compliance Audit
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4, minHeight: 300 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="primary">
              Submit Audit
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
