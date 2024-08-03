import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { Box, createStyles, Flex, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ContextMenuProps } from '../../../typings';
import ContextButton from './components/ContextButton';
import { fetchNui } from '../../../utils/fetchNui';
import ReactMarkdown from 'react-markdown';
import HeaderButton from './components/HeaderButton';
import ScaleFade from '../../../transitions/ScaleFade';
import MarkdownComponents from '../../../config/MarkdownComponents';

const openMenu = (id: string | undefined) => {
  fetchNui<ContextMenuProps>('openContext', { id: id, back: true });
};

const useStyles = createStyles((theme) => ({
  contextMenu: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute',
    top: '15%',
    right: '25%',
    width: 320,
    height: 580,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
    color: 'lightgray',
    borderRadius: '5px',
    border: '1px solid lightgray',
    background: 'radial-gradient(ellipse, rgba(122, 122, 122, 0.9) 0%, rgba(148, 148, 148, 0.5) 85%)',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    flex: '1 85%',
    background: 'radial-gradient(ellipse, rgba(122, 122, 122, 0.9) 0%, rgba(148, 148, 148, 0.5) 85%)',
  },
  titleText: {
    color: "white",
    padding: 6,
    textAlign: 'center',
  },
  buttonsContainer: {
    height: 560,
    overflowY: 'scroll',
  },
  buttonsFlexWrapper: {
    gap: 3,
  },
}));

const ContextMenu: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuProps>({
    title: '',
    options: { '': { description: '', metadata: [] } },
  });

  const closeContext = () => {
    if (contextMenu.canClose === false) return;
    setVisible(false);
    fetchNui('closeContext');
  };

  // Hides the context menu on ESC
  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (['Escape'].includes(e.code)) closeContext();
    };

    window.addEventListener('keydown', keyHandler);

    return () => window.removeEventListener('keydown', keyHandler);
  }, [visible]);

  useNuiEvent('hideContext', () => setVisible(false));

  useNuiEvent<ContextMenuProps>('showContext', async (data) => {
    if (visible) {
      setVisible(false);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setContextMenu(data);
    setVisible(true);
  });

  return (
    <div
    className={classes.contextMenu}
    style={{
      background: visible
        ? 'linear-gradient(90deg, rgba(56, 162, 229,0) 0%,  rgba(24, 72, 102, 1) 90%)'
        : 'transparent',
    }}
  >
    <Box className={classes.container}>
      <ScaleFade visible={visible}>
        <Flex className={classes.header}>
          {contextMenu.menu && (
            <HeaderButton icon="chevron-left" iconSize={16} handleClick={() => openMenu(contextMenu.menu)} />
          )}
          <Box className={classes.titleContainer}>
            <Text className={classes.titleText}>
              <ReactMarkdown components={MarkdownComponents}>{contextMenu.title}</ReactMarkdown>
            </Text>
          </Box>
          <HeaderButton icon="xmark" canClose={contextMenu.canClose} iconSize={18} handleClick={closeContext} />
        </Flex>
        <Box className={classes.buttonsContainer}>
          <Stack className={classes.buttonsFlexWrapper}>
            {Object.entries(contextMenu.options).map((option, index) => (
              <ContextButton option={option} key={`context-item-${index}`} />
            ))}
          </Stack>
        </Box>
      </ScaleFade>
    </Box>
    </div>
  );
};

export default ContextMenu;