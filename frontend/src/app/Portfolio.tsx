import { useEffect, useState } from 'react';
import { api } from './axios';
import { Box, Typography, Skeleton, Alert, Grid, Pagination, Button } from '@mui/material';
import AddStockForm from './components/AddStockForm';
import StockCard from './components/StockCard';
import { usePagination } from '../hooks/usePagination';

interface PortfolioStock {
  symbol: string;
}

export default function Portfolio() {
  const [stocks, setStocks] = useState<PortfolioStock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { slice, page, max, setPage } = usePagination(stocks, 8);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get<PortfolioStock[]>('/portfolio');
      setStocks(res.data);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message ?? 'Failed to fetch portfolio');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const addStock = async (symbol: string) => {
    await api.post('/portfolio', { symbol });
    fetchPortfolio();
  };

  const removeStock = async (symbol: string) => {
    await api.delete(`/portfolio/${symbol}`);
    fetchPortfolio();
  };

  if (loading)
    return (
      <Box p={2} sx={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <Typography variant="h4" gutterBottom>
          Portfolio
        </Typography>
        <Box mb={2}>
          <Skeleton variant="rectangular" width={300} height={40} sx={{ borderRadius: 1 }} />
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Skeleton 
                variant="rectangular" 
                height={80} 
                sx={{ borderRadius: 2 }} 
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );

  if (error)
    return (
      <Box p={2} sx={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <Typography variant="h4" gutterBottom>
          Portfolio
        </Typography>
        <Alert 
          severity="error" 
          sx={{ mb: 2, maxWidth: 600 }}
          action={
            <Button color="inherit" size="small" onClick={fetchPortfolio}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );

  return (
    <Box p={2} sx={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <Typography variant="h4" gutterBottom>
        Portfolio
      </Typography>

      <Box mb={2}>
        <AddStockForm
          portfolio={stocks.map((s) => s.symbol)}
          onAdd={addStock}
        />
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {slice.map((stock) => (
          <Grid key={stock.symbol} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <StockCard symbol={stock.symbol} onDelete={removeStock} />
          </Grid>
        ))}
      </Grid>

      {max > 1 && (
        <Pagination
          sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
          count={max}
          page={page}
          onChange={(_, v) => setPage(v)}
          color="primary"
        />
      )}
    </Box>
  );
} 