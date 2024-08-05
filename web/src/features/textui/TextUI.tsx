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
    position: 'relative', // Ensure pseudo-elements are positioned correctly
    fontSize: 25,
    padding: 12,
    margin: 8,
    backgroundColor: theme.colors.dark[6],
    color: 'white',
    fontFamily: 'Roboto',
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.sm,
    '::before': {
      content: '""',
      position: 'absolute',
      top: 2.5,
      left: 2.5,
      width: '20px', // Adjust as needed
      height: '20px', // Adjust as needed
      borderTop: '4px solid #74C0FC', // Adjust color and size as needed
      borderLeft: '4px solid #74C0FC', // Adjust color and size as needed
      borderRadius: '2px', // Optional, adjust as needed
    },
    '::after': {
      content: '""',
      position: 'absolute',
      bottom: 2.5,
      right: 2.5,
      width: '20px', // Adjust as needed
      height: '20px', // Adjust as needed
      borderBottom: '4px solid #74C0FC', // Adjust color and size as needed
      borderRight: '4px solid #74C0FC', // Adjust color and size as needed
      borderRadius: '1px', // Optional, adjust as needed
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
    if (!data.position) data.position = 'right-center'; // Default right position
    setData(data);
    setVisible(true);
  });

  useNuiEvent('textUiHide', () => setVisible(false));

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible}>
          <Box style={data.style} className={classes.container}>
            <Group spacing={12}>
              {data.icon && (
                <LibIcon
                  icon={data.icon}
                  fixedWidth
                  size="lg"
                  animation={data.iconAnimation}
                  style={{
                    color: data.iconColor,
                    alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start',
                  }}
                />
              )}
              <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                {data.text}
              </ReactMarkdown>
            </Group>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default TextUI;
