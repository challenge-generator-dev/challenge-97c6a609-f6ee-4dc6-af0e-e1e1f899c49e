import React from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  overlay?: boolean;
  showIcon?: boolean;
}

const getSizeValue = (size: 'small' | 'medium' | 'large'): number => {
  switch (size) {
    case 'small':
      return 24;
    case 'large':
      return 56;
    case 'medium':
    default:
      return 40;
  }
};

const getIconSize = (size: 'small' | 'medium' | 'large'): number => {
  switch (size) {
    case 'small':
      return 20;
    case 'large':
      return 48;
    case 'medium':
    default:
      return 32;
  }
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Cargando...',
  size = 'medium',
  fullScreen = false,
  overlay = false,
  showIcon = true,
}) => {
  const spinnerSize = getSizeValue(size);
  const iconSize = getIconSize(size);

  const spinnerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 3,
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        {showIcon && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          >
            <ShoppingBagIcon
              sx={{
                fontSize: iconSize,
                color: 'primary.main',
                opacity: 0.8,
              }}
            />
          </Box>
        )}
        <CircularProgress
          size={spinnerSize}
          thickness={4}
          sx={{
            color: 'primary.light',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
      {message && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Backdrop
        open={true}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {spinnerContent}
      </Backdrop>
    );
  }

  if (overlay) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 1,
          zIndex: 10,
        }}
      >
        {spinnerContent}
      </Box>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;