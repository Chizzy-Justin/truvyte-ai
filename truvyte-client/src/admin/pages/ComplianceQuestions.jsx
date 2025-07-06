// import React from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from '@mui/material';
// import theme from '../../theme';

// export default function ComplianceQuestions() {
//     const drawerWidth = theme.custom.drawerWidth;
//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Compliance Questions
//       </Typography>

//       <Box mb={2}>
//         <Button variant="contained">+ Add New Question</Button>
//       </Box>

//       <Paper elevation={1} sx={{ 
//         width: {xs: '90vw', md: `calc(90vw - ${drawerWidth}px)`}, 
//         overflowX: 'auto',
//       }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Text</TableCell>
//               <TableCell>Jurisdictions</TableCell>
//               <TableCell>Answer Type</TableCell>
//               <TableCell>Plan Tier</TableCell>
//               <TableCell>Order</TableCell>
//               <TableCell>Active</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {/* TODO: map over questions data */}
//             <TableRow>
//               <TableCell colSpan={7} align="center">
//                 No questions yet.
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }
// src/admin/pages/ComplianceQuestions.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormControlLabel,
  Switch,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import theme from '../../theme';

const jurisdictionsList = [
  { code: 'US', law: 'CCPA' },
  { code: 'EU', law: 'GDPR' },
  { code: 'CA', law: 'PIPEDA' },
  { code: 'AU', law: 'Privacy Act' },
  // …add more…
];
const answerTypes = [
  { value: 'YES_NO', label: 'Yes / No' },
  { value: 'AI', label: 'AI‑based' },
];

export default function ComplianceQuestions() {
  const drawerWidth = theme.custom.drawerWidth;
  
  // Data state
  const [questions, setQuestions] = useState([]);
  const [plans, setPlans]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  // Modal & form state
  const [open, setOpen]           = useState(false);
  const [form, setForm] = useState({
    text: '',
    topic: '',
    jurisdictions: [],
    answerType: '',
    planTiers: [],
    helpText: '',
    active: true,
    order: 0,
  });
  const [saving, setSaving]       = useState(false);
  const [formError, setFormError] = useState('');

  // Fetch initial data
  useEffect(() => {
    async function load() {
      try {
        const [qRes, pRes] = await Promise.all([
          axios.get('/api/questions'),
          axios.get('/api/plans'),
        ]);
        setQuestions(qRes.data);
        setPlans(pRes.data);
      } catch (err) {
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleOpen = () => {
    setForm({
        _id: null,
      text: '',
      topic: '',
      jurisdictions: [],
      answerType: '',
      planTiers: [],
      helpText: '',
      active: true,
      order: 0,
    });
    setFormError('');
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox'
      ? e.target.checked
      : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  // const handleSubmit = async () => {
  //   setFormError('');
  //   const { text, topic, jurisdictions, answerType, planTiers } = form;
  //   if (!text || !topic || !jurisdictions.length || !answerType || !planTiers.length) {
  //     return setFormError('Please fill in all required fields.');
  //   }
  //   setSaving(true);
  //   try {
  //     await axios.post('/api/questions', form);
  //     // reload questions
  //     const { data } = await axios.get('/api/questions');
  //     setQuestions(data);
  //     handleClose();
  //   } catch (err) {
  //     setFormError(err.response?.data?.error || 'Failed to save question.');
  //   } finally {
  //     setSaving(false);
  //   }
  // };
  const handleSubmit = async () => {
  setFormError('');
  const { _id, text, topic, jurisdictions, answerType, planTiers } = form;

  // Basic validation
  if (!text || !topic || !jurisdictions.length || !answerType || !planTiers.length) {
    return setFormError('Please fill in all required fields.');
  }

  setSaving(true);
  try {
    if (_id) {
      // EDIT existing question
      const { data: updated } = await axios.put(`/api/questions/${_id}`, {
        text,
        topic,
        jurisdictions,
        answerType,
        planTiers,
        helpText: form.helpText,
        active: form.active,
        order: form.order,
      });
      // Replace the item in state
      setQuestions((prev) =>
        prev.map((q) => (q._id === updated._id ? updated : q))
      );
    } else {
      // CREATE new question
      const { data: created } = await axios.post('/api/questions', {
        text,
        topic,
        jurisdictions,
        answerType,
        planTiers,
        helpText: form.helpText,
        active: form.active,
        order: form.order,
      });
      // Prepend (or append) the new question
      setQuestions((prev) => [created, ...prev]);
    }

    handleClose();
  } catch (err) {
    setFormError(err.response?.data?.error || 'Failed to save question.');
  } finally {
    setSaving(false);
  }
};


  // Handler to toggle active/inactive
const handleToggleActive = async (q) => {
  try {
    await axios.put(`/api/questions/${q._id}`, {
      active: !q.active,
    });
    // Optimistically update UI
    setQuestions((prev) =>
      prev.map((item) =>
        item._id === q._id ? { ...item, active: !item.active } : item
      )
    );
  } catch (err) {
    console.error('Failed to toggle active:', err);
  }
};

// Handler to delete a question
const handleDelete = async (q) => {
  if (!window.confirm('Delete this question permanently?')) return;
  try {
    await axios.delete(`/api/questions/${q._id}`);
    setQuestions((prev) => prev.filter((item) => item._id !== q._id));
  } catch (err) {
    console.error('Failed to delete question:', err);
  }
};

// Handler to populate the form and open for editing
const handleEdit = (q) => {
  setForm({
    text:          q.text,
    topic:         q.topic,
    jurisdictions: q.jurisdictions,
    answerType:    q.answerType,
    planTiers:     q.planTiers,
    helpText:      q.helpText || '',
    active:        q.active,
    order:         q.order,
    _id:           q._id,       // keep the id for PUT
  });
  setFormError('');
  setOpen(true);
};

  if (loading) return <CircularProgress />;
  if (error)   return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Compliance Questions
      </Typography>

      <Box mb={2}>
        <Button variant="contained" onClick={handleOpen}>
          + Add New Question
        </Button>
      </Box>

      <Paper
        elevation={1}
        sx={{
          width: { xs: '90vw', md: `calc(90vw - ${drawerWidth}px)` },
          overflowX: 'auto',
        }}
      >
        <Table>
    <TableHead>
      <TableRow>
        <TableCell>Text</TableCell>
        <TableCell>Jurisdictions</TableCell>
        <TableCell>Answer Type</TableCell>
        <TableCell>Plan Tiers</TableCell>
        <TableCell>Order</TableCell>
        <TableCell>Active</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {questions.length === 0 ? (
        <TableRow>
          <TableCell colSpan={7} align="center">
            No questions yet.
          </TableCell>
        </TableRow>
      ) : (
        questions.map((q) => (
          <TableRow key={q._id}>
            <TableCell>{q.text}</TableCell>
            <TableCell>
              {q.jurisdictions
                .map((code) => {
                  const law = jurisdictionsList.find((j) => j.code === code)?.law;
                  return law ? `${code} (${law})` : code;
                })
                .join(', ')}
            </TableCell>
            <TableCell>{q.answerType}</TableCell>
            <TableCell>{q.planTiers.join(', ')}</TableCell>
            <TableCell>{q.order}</TableCell>

            {/* Active toggle */}
            <TableCell>
              <Switch
                checked={q.active}
                onChange={() => handleToggleActive(q)}
                inputProps={{ 'aria-label': 'Toggle Active' }}
              />
            </TableCell>

            {/* Edit / Delete actions */}
            <TableCell>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleEdit(q)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(q)}
                >
                  Delete
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
      </Paper>

      {/* Add / Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Compliance Question</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {formError && <Alert severity="error">{formError}</Alert>}

            <TextField
              label="Question Text"
              value={form.text}
              onChange={handleChange('text')}
              required
              fullWidth
            />

            <TextField
              label="Topic"
              value={form.topic}
              onChange={handleChange('topic')}
              required
              fullWidth
            />

            <FormControl fullWidth required>
              <InputLabel>Jurisdictions</InputLabel>
              <Select
                multiple
                value={form.jurisdictions}           // array of codes, e.g. ['US','EU']
                onChange={(e) => setForm(f => ({
                  ...f,
                  jurisdictions: e.target.value,
                }))}
                input={<OutlinedInput label="Jurisdictions" />}
                renderValue={(selectedCodes) =>
                  selectedCodes
                    .map((code) => {
                      const { law } = jurisdictionsList.find((j) => j.code === code) || {};
                      return law ? `${code} (${law})` : code;
                    })
                    .join(', ')
                }
              >
                {jurisdictionsList.map(({ code, law }) => (
                  <MenuItem key={code} value={code}>
                    <Checkbox checked={form.jurisdictions.includes(code)} />
                    <ListItemText primary={`${code} (${law})`} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Answer Type</InputLabel>
              <Select
                value={form.answerType}
                onChange={handleChange('answerType')}
                label="Answer Type"
              >
                {answerTypes.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Plan Tiers</InputLabel>
              {/* <Select
                multiple
                value={form.planTiers}
                onChange={handleChange('planTiers')}
                input={<OutlinedInput label="Plan Tiers" />}
                renderValue={(sel) =>
                  plans.filter((p) => sel.includes(p._id)).map((p) => p.name).join(', ')
                }
              >
                {plans.map((p) => (
                  <MenuItem key={p._id} value={p._id}>
                    <Checkbox checked={form.planTiers.includes(p._id)} />
                    <ListItemText primary={p.name} />
                  </MenuItem>
                ))}
              </Select> */}
                <Select
                    multiple
                    value={form.planTiers}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, planTiers: e.target.value }))
                    }
                    input={<OutlinedInput label="Plan Tiers" />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {plans.map((p) => (
                      <MenuItem key={p.name} value={p.name}>
                        <Checkbox checked={form.planTiers.includes(p.name)} />
                        <ListItemText primary={p.name} />
                      </MenuItem>
                    ))}
                  </Select>
            </FormControl>

            <TextField
              label="Help Text (optional)"
              value={form.helpText}
              onChange={handleChange('helpText')}
              multiline
              rows={2}
              fullWidth
            />

            <TextField
              label="Order"
              type="number"
              value={form.order}
              onChange={handleChange('order')}
              fullWidth
            />

            <FormControlLabel
              control={
                <Switch
                  checked={form.active}
                  onChange={handleChange('active')}
                />
              }
              label="Active"
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? <CircularProgress size={20} /> : 'Save Question'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
