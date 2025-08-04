import { useState } from 'react';
import { TextField, Button, Stack, CircularProgress } from '@mui/material';

interface Props {
  portfolio: string[];
  onAdd: (symbol: string) => Promise<void>;
}

export default function AddStockForm({ portfolio, onAdd }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = (sym: string) => {
    if (!/^[A-Z]{1,5}$/.test(sym)) return 'Only 1-5 uppercase letters allowed';
    if (portfolio.includes(sym)) return 'Already in portfolio';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim().toUpperCase();
    const msg = validate(trimmed);
    if (msg) {
      setError(msg);
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      await onAdd(trimmed);
      setValue('');
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Failed to add stock');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Add symbol"
          value={value}
          error={!!error}
          helperText={error}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          size="small"
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Adding...' : 'Add'}
        </Button>
      </Stack>
    </form>
  );
} 