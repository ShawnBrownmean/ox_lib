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
    alignItems: 'center', // Align items to the center vertically
    justifyContent: 'flex-start', // Align items to the left horizontally
  },
  container: {
    fontSize: 16,
    padding: 12,
    margin: 8,
    color: "lightgray",
    fontFamily: 'Roboto',
    boxShadow: theme.shadows.sm,
    backgroundColor: '#252934',
    borderRadius: '3px',
    position: 'relative', // Make the container relative for absolute positioning of the blue dot
  },
  blueDot: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 5,
    height: 5,
    borderRadius: '25%',
    backgroundColor: '#74C0FC',
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
    //if (!data.position) data.position = 'right-center'; // Default right position
    setData(data);
    setVisible(true);
  });

  useNuiEvent('textUiHide', () => setVisible(false));

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible}>
          <Box style={data.style} className={classes.container}>
            <div className={classes.blueDot}></div>
            <div className="textui-keybind-container">
              <div className="textui-keybind">
              </div>
              <Box style={data.style} className="textui-container"></Box>
              {/*data.icon && (
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
              )*/}
              {/*<ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                {data.text}
              </ReactMarkdown>*/}
            </div>
            <p>{data.text}</p>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default TextUI;
