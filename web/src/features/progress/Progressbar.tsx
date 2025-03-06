import React from 'react';
import { Box, createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';

const useStyles = createStyles((theme) => ({
  container: {
    width: 350,
    height: 20,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid rgba(116, 192, 252, 0.3)',
    backdropFilter: 'blur(4px)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 3,
      left: 3,
      width: 6,
      height: 6,
      borderTop: '2px solid #74C0FC',
      borderLeft: '2px solid #74C0FC',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 4,
      right: 4,
      width: 6,
      height: 6,
      borderBottom: '2px solid #74C0FC',
      borderRight: '2px solid #74C0FC',
    },
    boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
  },
  wrapper: {
    width: '100%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  bar: {
    height: '100%',
    background: 'linear-gradient(90deg, rgba(116, 192, 252, 0.2) 0%, rgba(116, 192, 252, 0.2) 100%)',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '2px',
      height: '100%',
      background: '#74C0FC',
      boxShadow: '0 0 10px #74C0FC',
    },
  },
  labelWrapper: {
    position: 'absolute',
    display: 'flex',
    width: 350,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    '&::before': {
      content: '""',
      position: 'absolute', // white lines 
      top: '50%',
      left: 35,
      width: 20,
      height: 1,
      background: 'rgb(255, 255, 255)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      right: 35,
      width: 20,
      height: 1,
      background: 'rgb(255, 255, 255)',
    },
  },
  label: {
    maxWidth: 250,
    padding: 8,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 12,
    fontFamily: 'Roboto Mono, monospace',
    color: 'white',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);

  useNuiEvent('progressCancel', () => setVisible(false));

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);
  });

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <Box className={classes.container}>
            <Box
              className={classes.bar}
              onAnimationEnd={() => setVisible(false)}
              sx={{
                animation: 'progress-bar linear',
                animationDuration: `${duration}ms`,
              }}
            >
              <Box className={classes.labelWrapper}>
                <Text className={classes.label}>{label}</Text>
              </Box>
            </Box>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;