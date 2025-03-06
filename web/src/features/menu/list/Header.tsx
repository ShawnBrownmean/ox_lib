import { Box, createStyles, Text } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  container: {
    textAlign: 'center',
    borderTopLeftRadius: theme.radius.sm,
    borderTopRightRadius: theme.radius.sm,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    backdropFilter: 'blur(4px)',
    height: 60,
    width: 384,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(116, 192, 252, 0.1)',
    borderBottom: 'none',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 4,
      left: 4,
      width: '8px',
      height: '8px',
      borderTop: '2px solid #74C0FC',
      borderLeft: '2px solid #74C0FC',
      opacity: 0.8,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 4,
      right: 4,
      width: '8px',
      height: '8px',
      borderTop: '2px solid #74C0FC',
      borderRight: '2px solid #74C0FC',
      opacity: 0.8,
    },
  },
  heading: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 500,
    color: '#fff',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    letterSpacing: '0.05em',
    position: 'relative',
    padding: '0 20px',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: -30,
      width: 40,
      height: 1,
      background: 'linear-gradient(90deg, rgba(116, 192, 252, 0) 0%, rgba(116, 192, 252, 0.5) 100%)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      right: -30,
      width: 40,
      height: 1,
      background: 'linear-gradient(90deg, rgba(116, 192, 252, 0.5) 0%, rgba(116, 192, 252, 0) 100%)',
    },
  },
}));

const Header: React.FC<{ title: string }> = ({ title }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Text className={classes.heading}>{title}</Text>
    </Box>
  );
};

export default React.memo(Header);