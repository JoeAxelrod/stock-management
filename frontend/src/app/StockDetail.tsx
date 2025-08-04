import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, Skeleton, Alert, Paper } from '@mui/material';
import { cachedApi } from '../services/cachedApi';

interface Stock {
  symbol: string;
  price: number;
  name?: string;
}

export default function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!symbol) return;
    const fetchStock = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await cachedApi.getStock(symbol);
        setStock(data);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.message ?? 'Failed to fetch stock');
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, [symbol]);

  if (!symbol) return null;

  if (loading)
    return (
      <Box p={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button component={Link} to="/" variant="outlined" sx={{ alignSelf: 'flex-start', mb: 2 }}>
          Back
        </Button>
        <Paper sx={{ p: 3, maxWidth: 400, width: '100%' }}>
          <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="70%" height={30} />
        </Paper>
      </Box>
    );

  if (error)
    return (
      <Box p={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button component={Link} to="/" variant="outlined" sx={{ alignSelf: 'flex-start', mb: 2 }}>
          Back
        </Button>
        <Alert 
          severity="error" 
          sx={{ maxWidth: 600 }}
          action={
            <Button color="inherit" size="small" onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );

  return (
    <Box p={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button component={Link} to="/" variant="outlined" sx={{ alignSelf: 'flex-start', mb: 2 }}>
        Back
      </Button>
      {stock ? (
        <Paper sx={{ p: 3, maxWidth: 400, width: '100%' }}>
          <Typography variant="h4" gutterBottom align="center">
            {stock.name ?? stock.symbol}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Symbol: {stock.symbol}
          </Typography>
          <Typography variant="h6" color="primary">
            Price: ${stock.price.toFixed(2)}
          </Typography>
        </Paper>
      ) : null}
    </Box>
  );
} 