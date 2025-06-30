import { Container, Grid, Typography, Link, Box, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, GitHub, Email } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: '#fff', py: 6 }}>
      <Container maxWidth="100%">
        <Grid container spacing={4}>
          {/* About */}
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <Typography variant="h6" gutterBottom>
              About Truvyte
            </Typography>
            <Typography variant="body2">
              Trusted AI compliance checks and certification badges for your models.  
              From early-stage audits to enterprise reviews, build confidence in every deployment.
            </Typography>
          </Grid>

          {/* Company Links */}
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Link href="/about" color="inherit" display="block" underline="hover">
              About Us
            </Link>
            <Link href="/careers" color="inherit" display="block" underline="hover">
              Careers
            </Link>
            <Link href="/blog" color="inherit" display="block" underline="hover">
              Blog
            </Link>
            <Link href="/contact" color="inherit" display="block" underline="hover">
              Contact
            </Link>
          </Grid>

          {/* Resources */}
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Link href="/docs" color="inherit" display="block" underline="hover">
              Documentation
            </Link>
            <Link href="/faq" color="inherit" display="block" underline="hover">
              FAQ
            </Link>
            <Link href="/terms" color="inherit" display="block" underline="hover">
              Terms of Service
            </Link>
            <Link href="/privacy" color="inherit" display="block" underline="hover">
              Privacy Policy
            </Link>
          </Grid>

          {/* Connect */}
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                sx={{ color: '#fff' }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
                sx={{ color: '#fff' }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
                sx={{ color: '#fff' }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                component="a"
                href="https://github.com/your-org"
                target="_blank"
                rel="noopener"
                sx={{ color: '#fff' }}
              >
                <GitHub />
              </IconButton>
            </Box>
            <Box mt={1}>
              <Link href="mailto:support@truvyte.ai" color="inherit" underline="hover">
                <Email sx={{ mr: 1, verticalAlign: 'middle' }} />
                support@truvyte.ai
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={6}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Truvyte, Inc. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
