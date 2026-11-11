import React from 'react';
import { Alert, AlertTitle, Box, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

export interface ErrorMessageProps {
  message: string;
  title?: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  onRetry?: () => void;
  fullWidth?: boolean;
  showIcon?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title = 'Ha ocurrido un error',
  severity = 'error',
  onRetry,
  fullWidth = false,
  showIcon = true,
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <Box
      sx={{
        width: fullWidth ? '100%' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 2,
      }}
    >
      <Alert
        severity={severity}
        sx={{
          width: '100%',
          maxWidth: 500,
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
        icon={showIcon ? <ErrorOutlineIcon fontSize="inherit" /> : undefined}
      >
        <AlertTitle sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </AlertTitle>
        <Box
          component="span"
          sx={{
            display: 'block',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: 'text.secondary',
          }}
        >
          {message}
        </Box>
        {onRetry && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={handleRetry}
              startIcon={<RefreshIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderColor: 'rgba(0, 0, 0, 0.23)',
                '&:hover': {
                  borderColor: 'rgba(0, 0, 0, 0.5)',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Reintentar
            </Button>
          </Box>
        )}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;