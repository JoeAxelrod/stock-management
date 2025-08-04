import { Card, CardActionArea, CardContent, Typography, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
      width: '120px',
      height: '60px'
    }}>
      <CardActionArea 
        component={Link} 
        to={`/stock/${symbol}`}
        sx={{ height: '100%' }}
      >
        <CardContent sx={{ 
          padding: '8px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography variant="h6" align="center">
            {symbol}
          </Typography>
        </CardContent>
      </CardActionArea>
      <IconButton
        size="small"
        onClick={handleDelete}
        disabled={deleting}
        sx={{ 
          position: 'absolute', 
          top: 4, 
          right: 4,
          color: 'text.secondary',
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            backgroundColor: 'action.hover',
            color: 'text.primary'
          }
        }}
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