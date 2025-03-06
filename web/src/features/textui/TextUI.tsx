import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { Box, createStyles, Group } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import ScaleFade from '../../transitions/ScaleFade';
import remarkGfm from 'remark-gfm';
import type { TextUiPosition, TextUiProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import LibIcon from '../../components/LibIcon';

const useStyles = createStyles((theme, params: { position?: TextUiPosition }) => ({
  wrapper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 
      params.position === 'top-center' ? 'baseline' :
      params.position === 'bottom-center' ? 'flex-end' : 'center',
    justifyContent: 
      params.position === 'right-center' ? 'flex-end' :
      params.position === 'left-center' ? 'flex-start' : 'center',
  },
  container: {
    position: 'relative',
    fontSize: 15,
    padding: '12px 16px',
    margin: 8,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    backdropFilter: 'blur(4px)',
    color: '#fff',
    fontFamily: 'Roboto',
    borderRadius: theme.radius.sm,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(116, 192, 252, 0.15)',
    transition: 'all 0.2s ease',
    minWidth: 200,
    maxWidth: 400,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 3,
      left: 3,
      width: '6px',
      height: '6px',
      borderTop: '2px solid #74C0FC',
      borderLeft: '2px solid #74C0FC',
      opacity: 0.8,
      transition: 'opacity 0.2s ease',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 3,
      right: 3,
      width: '6px',
      height: '6px',
      borderBottom: '2px solid #74C0FC',
      borderRight: '2px solid #74C0FC',
      opacity: 0.8,
      transition: 'opacity 0.2s ease',
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    backgroundColor: 'rgba(116, 192, 252, 0.1)',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    border: '1px solid rgba(116, 192, 252, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(116, 192, 252, 0.15)',
      borderColor: 'rgba(116, 192, 252, 0.25)',
    },
  },
  text: {
    flex: 1,
    lineHeight: 1.4,
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: '0.02em',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    '& p': {
      margin: 0,
    },
    '& code': {
      backgroundColor: 'rgba(116, 192, 252, 0.1)',
      padding: '2px 6px',
      borderRadius: 4,
      fontSize: '0.9em',
      color: '#74C0FC',
    },
    '& a': {
      color: '#74C0FC',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));

const TextUI: React.FC = () => {
  const [data, setData] = React.useState<TextUiProps>({
    text: '',
    position: 'right-center',
  });
  const [visible, setVisible] = React.useState(false);
  const { classes } = useStyles({ position: data.position });

  useNuiEvent<TextUiProps>('textUi', (data) => {
    if (!data.position) data.position = 'right-center';
    setData(data);
    setVisible(true);
  });

  useNuiEvent('textUiHide', () => setVisible(false));

  return (
    <Box className={classes.wrapper}>
      <ScaleFade visible={visible}>
        <Box style={data.style} className={classes.container}>
          <Group className={classes.content}>
            {data.icon && (
              <Box className={classes.icon}>
                <LibIcon
                  icon={data.icon}
                  fixedWidth
                  size="lg"
                  animation={data.iconAnimation}
                  style={{
                    color: data.iconColor || '#74C0FC',
                    alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start',
                  }}
                />
              </Box>
            )}
            <Box className={classes.text}>
              <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                {data.text}
              </ReactMarkdown>
            </Box>
          </Group>
        </Box>
      </ScaleFade>
    </Box>
  );
};

export default TextUI;