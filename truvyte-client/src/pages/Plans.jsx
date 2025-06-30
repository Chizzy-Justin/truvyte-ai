// src/pages/Plans.jsx
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Plans() {
  const plans = [
    {
      name: 'Foundations',
      badge: '🧪',
      tagline: 'Free Mini‑Audit',
      pros: ['10‑question mini‑audit', 'Single jurisdiction', 'Risk insights only'],
      cons: ['No PDF export', 'No embeddable badge', 'No re‑scans'],
      cta: { text: 'Start Free Audit', link: '/start?plan=foundations', variant: 'contained' },
    },
    {
      name: 'TrustBuilder',
      badge: '✅',
      tagline: 'Pro Certification',
      pros: ['Full multi‑jurisdiction audit', 'Downloadable PDF & badge', 'Monthly re‑scans'],
      cons: ['$49/month', 'Email support only'],
      cta: { text: 'Choose TrustBuilder', link: '/start?plan=trustbuilder', variant: 'contained' },
    },
    {
      name: 'Assure360',
      badge: '🏢',
      tagline: 'Enterprise Suite',
      pros: ['Expert review & signed certs', 'Team & RBAC', 'API & integrations'],
      cons: ['Custom pricing', 'Dedicated onboarding time'],
      cta: { text: 'Contact Sales', link: '/contact', variant: 'outlined' },
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ pt: 8, pb: 12 }}>
      <Typography variant="h1" textAlign="center" mb={6}>
        Plans & Pricing
      </Typography>
      <Grid container spacing={4}>
        {plans.map((plan) => (
          <Grid size={{xs: 12, sm: 6, md: 4}} key={plan.name}>
            <Paper>
              <Typography variant="h4" gutterBottom>
                {plan.badge} {plan.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {plan.tagline}
              </Typography>
              <Typography variant="h6">What’s Included</Typography>
              <ul>
                {plan.pros.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Typography variant="h6">Limitations</Typography>
              <ul>
                {plan.cons.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <Button
                component={Link}
                to={plan.cta.link}
                variant={plan.cta.variant}
                fullWidth
                sx={{ mt: 2 }}
              >
                {plan.cta.text}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
