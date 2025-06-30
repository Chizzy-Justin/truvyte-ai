// src/pages/Home.jsx
import { Container, Typography, Button, Grid, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import useTypewriter from '../hooks/useTypewriter';

export default function Home() {

     const { text, showCursor } = useTypewriter(
    [
      'Instant AI Compliance Audits. Trusted By Modern Startups.',
      'Prevent Legal Consequences. Audit Your AI Model',
    ],
    {
      typingSpeed: 100,
      deletingSpeed: 50,
      pause: 2000,
      cursorBlinkSpeed: 500
    }
  );
  return (
    // <Container maxWidth="lg" sx={{ pt: 8, pb: 12 }}>
         <Container
      maxWidth="lg"
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, sm: 8, md: 12 },
         pt: 8, 
         pb: 12
      }}
    >
      {/* Hero */}
      <Box textAlign="center" mb={{ xs: 6, sm: 8, md: 10 }}>
        <Typography variant="h1" gutterBottom>
            {text}
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: '1ch',
              ml: 0.5,
              opacity: showCursor ? 1 : 0,
              transition: 'opacity 0.1s linear'
            }}
          >
            |
          </Box>
        </Typography>
        <Typography variant="h5" color="text.secondary" mb={{ xs: 2, sm: 4 }}>
          Truvyte runs instant, jurisdiction‑specific compliance checks,
          so you can display a verified certification badge with confidence.
        </Typography>
        <Button
          component={Link}
          to="/plans"
          variant="contained"
          size="large"
          sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
        >
          Start Free Audit
        </Button>
        <Button
          component={Link}
          to="/plans"
          variant="outlined"
          size="large"
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          View Plans
        </Button>
      </Box>

      {/* How It Works */}
      <Box mb={10}>
        <Typography variant="h2" gutterBottom textAlign="center">
          How Truvyte Works
        </Typography>
        <Grid container spacing={4} mt={4}>
          {[
            { title: 'Choose Your Plan', desc: 'From free Foundations to enterprise Assure360.' },
            { title: 'Select Jurisdiction', desc: 'GDPR, CCPA, PIPEDA, DPA and more.' },
            { title: 'Answer Key Questions', desc: 'Targeted prompts tailored to your model.' },
            { title: 'Get Verified Badge', desc: 'Download report & embed your trust seal.' },
          ].map(({ title, desc }, i) => (
            <Grid size={{xs: 12, sm: 6, md: 3}} key={i}>
              <Paper>
                <Typography variant="h3" color="primary" gutterBottom>
                  Step {i + 1}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Quick Benefits */}
      <Box textAlign="center" mb={10}>
        <Typography variant="h2" gutterBottom>
          Why Truvyte?
        </Typography>
        <Grid container spacing={4} justifyContent="center" mt={4}>
          {[
            'Save hours on legal research',
            'Get instant, auditable results',
            'Showcase your compliance badge',
            'Scale as you grow—from free to enterprise',
          ].map((text, idx) => (
            <Grid size={{xs: 12, sm: 6, md: 3}} key={idx}>
              <Paper sx={{ height: '100%' }}>
                <Typography variant="h6">{text}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
