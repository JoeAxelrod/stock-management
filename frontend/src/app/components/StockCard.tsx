import { Card, CardActionArea, CardContent, Typography, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ComponentErrorFallback } from '../../components/ErrorFallback';

interface Props {
  symbol: string;
  onDelete: (symbol: string) => Promise<void>;
}

export default function StockCard({ symbol, onDelete }: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(symbol);
    } catch (err) {
      console.error('Failed to delete stock:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card sx={{ 
      position: 'relative',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
      }
    }}>
      <CardActionArea component={Link} to={`/stock/${symbol}`}>
        <CardContent sx={{ pr: 5, py: 1 }}>
          <Typography variant="h6" align="center">
            {symbol}
          </Typography>
        </CardContent>
      </CardActionArea>
      <IconButton
        size="small"
        onClick={handleDelete}
        disabled={deleting}
        sx={{ position: 'absolute', top: 2, right: 2 }}
      >
        {deleting ? (
          <CircularProgress size={16} />
        ) : (
          <DeleteIcon fontSize="small" />
        )}
      </IconButton>
    </Card>
  );
} 