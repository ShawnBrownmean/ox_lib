import { Button, createStyles, Group, HoverCard, Image, Progress, Stack, Text } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { ContextMenuProps, Option } from '../../../../typings';
import { fetchNui } from '../../../../utils/fetchNui';
import { isIconUrl } from '../../../../utils/isIconUrl';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import MarkdownComponents from '../../../../config/MarkdownComponents';
import LibIcon from '../../../../components/LibIcon';

const openMenu = (id: string | undefined) => {
  fetchNui<ContextMenuProps>('openContext', { id: id, back: false });
};

const clickContext = (id: string) => {
  fetchNui('clickContext', id);
};

const useStyles = createStyles((theme, params: { disabled?: boolean; readOnly?: boolean }) => ({
  inner: {
    justifyContent: 'flex-start',
  },
  label: {
    width: '100%',
    color: params.disabled ? theme.colors.dark[3] : theme.colors.gray[1],
    whiteSpace: 'pre-wrap',
  },
  button: {
    height: 'fit-content',
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(116, 192, 252, 0.1)',
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 2,
      left: 2,
      width: '6px',
      height: '6px',
      borderTop: '2px solid #74C0FC',
      borderLeft: '2px solid #74C0FC',
      opacity: 0.6,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: '6px',
      height: '6px',
      borderBottom: '2px solid #74C0FC',
      borderRight: '2px solid #74C0FC',
      opacity: 0.6,
    },
    '&:hover': {
      backgroundColor: params.readOnly ? theme.colors.dark[6] : 'rgba(23, 32, 52, 0.95)',
      cursor: params.readOnly ? 'unset' : 'pointer',
      transform: 'translateY(-1px)',
      borderColor: 'rgba(116, 192, 252, 0.3)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      '&::before, &::after': {
        opacity: 1,
      },
    },
    '&:active': {
      transform: params.readOnly ? 'unset' : 'translateY(0)',
    },
  },
  iconImage: {
    maxWidth: '25px',
    borderRadius: '4px',
  },
  description: {
    fontSize: 12,
    color: '#74C0FC',
    opacity: 0.8,
    marginTop: 4,
    fontWeight: 400,
    letterSpacing: '0.02em',
  },
  dropdown: {
    padding: 16,
    color: theme.colors.dark[0],
    fontSize: 14,
    maxWidth: 256,
    width: 'fit-content',
    border: '1px solid rgba(116, 192, 252, 0.15)',
    backgroundColor: 'rgba(17, 24, 39, 0.95)',
    backdropFilter: 'blur(8px)',
    borderRadius: '8px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
  buttonStack: {
    gap: 4,
    flex: '1',
  },
  buttonGroup: {
    gap: 12,
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  buttonIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(116, 192, 252, 0.1)',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    border: '1px solid rgba(116, 192, 252, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(116, 192, 252, 0.15)',
      borderColor: 'rgba(116, 192, 252, 0.25)',
    },
  },
  buttonTitleText: {
    overflowWrap: 'break-word',
    fontSize: '14px',
    fontWeight: 500,
    color: '#fff',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
  },
  buttonArrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    color: '#74C0FC',
    opacity: 0.8,
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateX(2px)',
    },
  },
  progressBar: {
    marginTop: 8,
    '& .mantine-Progress-root': {
      backgroundColor: 'rgba(116, 192, 252, 0.1)',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    '& .mantine-Progress-bar': {
      transition: 'width 0.3s ease',
      background: 'linear-gradient(90deg, rgba(116, 192, 252, 0.8) 0%, rgba(116, 192, 252, 1) 100%)',
      boxShadow: '0 0 10px rgba(116, 192, 252, 0.3)',
    },
  },
  metadataText: {
    color: theme.colors.gray[3],
    fontSize: 13,
    lineHeight: 1.4,
  },
  metadataProgress: {
    marginTop: 4,
    '& .mantine-Progress-root': {
      backgroundColor: 'rgba(116, 192, 252, 0.1)',
    },
    '& .mantine-Progress-bar': {
      background: 'linear-gradient(90deg, rgba(116, 192, 252, 0.8) 0%, rgba(116, 192, 252, 1) 100%)',
    },
  },
}));

const ContextButton: React.FC<{
  option: [string, Option];
}> = ({ option }) => {
  const button = option[1];
  const buttonKey = option[0];
  const { classes } = useStyles({ disabled: button.disabled, readOnly: button.readOnly });

  return (
    <>
      <HoverCard
        position="right-start"
        disabled={button.disabled || !(button.metadata || button.image)}
        openDelay={200}
      >
        <HoverCard.Target>
          <Button
            classNames={{ inner: classes.inner, label: classes.label, root: classes.button }}
            onClick={() =>
              !button.disabled && !button.readOnly
                ? button.menu
                  ? openMenu(button.menu)
                  : clickContext(buttonKey)
                : null
            }
            variant="default"
            disabled={button.disabled}
          >
            <Group position="apart" w="100%" noWrap>
              <Stack className={classes.buttonStack}>
                {(button.title || Number.isNaN(+buttonKey)) && (
                  <Group className={classes.buttonGroup}>
                    {button?.icon && (
                      <Stack className={classes.buttonIconContainer}>
                        {typeof button.icon === 'string' && isIconUrl(button.icon) ? (
                          <img src={button.icon} className={classes.iconImage} alt="Missing img" />
                        ) : (
                          <LibIcon
                            icon={button.icon as IconProp}
                            fixedWidth
                            size="lg"
                            style={{ color: button.iconColor }}
                            animation={button.iconAnimation}
                          />
                        )}
                      </Stack>
                    )}
                    <Text className={classes.buttonTitleText}>
                      <ReactMarkdown components={MarkdownComponents}>{button.title || buttonKey}</ReactMarkdown>
                    </Text>
                  </Group>
                )}
                {button.description && (
                  <Text className={classes.description}>
                    <ReactMarkdown components={MarkdownComponents}>{button.description}</ReactMarkdown>
                  </Text>
                )}
                {button.progress !== undefined && (
                  <Progress 
                    value={button.progress} 
                    size="sm" 
                    color={button.colorScheme || '#74C0FC'} 
                    className={classes.progressBar}
                  />
                )}
              </Stack>
              {(button.menu || button.arrow) && button.arrow !== false && (
                <Stack className={classes.buttonArrowContainer}>
                  <LibIcon icon="chevron-right" fixedWidth />
                </Stack>
              )}
            </Group>
          </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown className={classes.dropdown}>
          {button.image && <Image src={button.image} radius="md" mb={8} />}
          {Array.isArray(button.metadata) ? (
            button.metadata.map(
              (
                metadata: string | { label: string; value?: any; progress?: number; colorScheme?: string },
                index: number
              ) => (
                <Stack key={`context-metadata-${index}`} spacing={4}>
                  <Text className={classes.metadataText}>
                    {typeof metadata === 'string' ? `${metadata}` : `${metadata.label}: ${metadata?.value ?? ''}`}
                  </Text>
                  {typeof metadata === 'object' && metadata.progress !== undefined && (
                    <Progress
                      value={metadata.progress}
                      size="sm"
                      color={metadata.colorScheme || button.colorScheme || '#74C0FC'}
                      className={classes.metadataProgress}
                    />
                  )}
                </Stack>
              )
            )
          ) : (
            <>
              {typeof button.metadata === 'object' &&
                Object.entries(button.metadata).map((metadata: { [key: string]: any }, index) => (
                  <Text key={`context-metadata-${index}`} className={classes.metadataText}>
                    {metadata[0]}: {metadata[1]}
                  </Text>
                ))}
            </>
          )}
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  );
};

export default ContextButton;