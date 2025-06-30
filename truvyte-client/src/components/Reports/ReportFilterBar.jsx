// import { useState } from 'react';
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Button,
//   ToggleButtonGroup,
//   ToggleButton
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const plans = ['Foundations', 'TrustBuilder', 'Assure360'];
// const riskLevels = ['Low', 'Medium', 'High'];

// export default function ReportFilterBar({ onFilter }) {
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [plan, setPlan] = useState('');
//   const [risk, setRisk] = useState([]);
//   const [search, setSearch] = useState('');

//   const applyFilters = () => {
//     if (onFilter) {
//       onFilter({ dateFrom, dateTo, plan, risk, search });
//     }
//   };

//   return (
//     <Box
//       sx={{
        
//         display: 'grid',
//         gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'auto auto auto 1fr auto' },
//         gap: 2,
//         alignItems: 'center'
//       }}
//     >
//       {/* Date Range */}
//       <TextField
//         label="From"
//         type="date"
//         value={dateFrom}
//         onChange={(e) => setDateFrom(e.target.value)}
//         InputLabelProps={{ shrink: true }}
//       />
//       <TextField
//         label="To"
//         type="date"
//         value={dateTo}
//         onChange={(e) => setDateTo(e.target.value)}
//         InputLabelProps={{ shrink: true }}
//       />

//       {/* Plan Filter */}
//       <FormControl fullWidth>
//         <InputLabel id="plan-filter-label">Plan</InputLabel>
//         <Select
//           labelId="plan-filter-label"
//           label="Plan"
//           value={plan}
//           onChange={(e) => setPlan(e.target.value)}
//         >
//           <MenuItem value="">All Plans</MenuItem>
//           {plans.map((p) => (
//             <MenuItem key={p} value={p}>{p}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* Risk Level Filter */}
//       <ToggleButtonGroup
//         value={risk}
//         onChange={(_, newRisk) => setRisk(newRisk)}
//         aria-label="risk level"
//         size="small"
//       >
//         {riskLevels.map((r) => (
//           <ToggleButton key={r} value={r.toLowerCase()} aria-label={r}>
//             {r}
//           </ToggleButton>
//         ))}
//       </ToggleButtonGroup>

//       {/* Search + Apply */}
//       <Box sx={{ display: 'flex', gap: 1 }}>
//         <TextField
//           placeholder="Search reports…"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           size="small"
//           InputProps={{
//             startAdornment: <SearchIcon sx={{ mr: 1 }} />
//           }}
//         />
//         <Button variant="contained" onClick={applyFilters}>
//           Apply
//         </Button>
//       </Box>
//     </Box>
//   );
// }
import { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const plans = ['Foundations', 'TrustBuilder', 'Assure360'];
const riskLevels = ['Low', 'Medium', 'High'];

export default function ReportFilterBar({ onFilter }) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [plan, setPlan] = useState('');
  const [risk, setRisk] = useState([]);
  const [search, setSearch] = useState('');

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const applyFilters = () => {
    if (onFilter) {
      onFilter({ dateFrom, dateTo, plan, risk, search });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
        p: 1,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1
      }}
    >
      {/* Date Range */}
      <TextField
        label="From"
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ flex: isSmall ? '1 1 100%' : '0 1 150px' }}
      />
      <TextField
        label="To"
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ flex: isSmall ? '1 1 100%' : '0 1 150px' }}
      />

      {/* Plan Filter */}
      <FormControl
        fullWidth={!isSmall}
        sx={{ flex: isSmall ? '1 1 100%' : '0 1 200px' }}
      >
        <InputLabel id="plan-filter-label">Plan</InputLabel>
        <Select
          labelId="plan-filter-label"
          label="Plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <MenuItem value="">All Plans</MenuItem>
          {plans.map((p) => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Risk Level Filter */}
      <ToggleButtonGroup
        value={risk}
        onChange={(_, newRisk) => setRisk(newRisk)}
        aria-label="risk level"
        size="small"
        sx={{ flex: isSmall ? '1 1 100%' : '0 1 auto' }}
      >
        {riskLevels.map((r) => (
          <ToggleButton key={r} value={r.toLowerCase()} aria-label={r}>
            {r}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Search + Apply */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flex: isSmall ? '1 1 100%' : '1 1 300px'
        }}
      >
        <TextField
          placeholder="Search reports…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
          fullWidth
        />
        <Button variant="contained" onClick={applyFilters}>
          Apply
        </Button>
      </Box>
    </Box>
  );
}
