import { Box, createStyles, Group, Progress, Stack, Text } from '@mantine/core';
import React, { forwardRef } from 'react';
import CustomCheckbox from './CustomCheckbox';
import type { MenuItem } from '../../../typings';
import { isIconUrl } from '../../../utils/isIconUrl';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import LibIcon from '../../../components/LibIcon';

interface Props {
  item: MenuItem;
  index: number;
  scrollIndex: number;
  checked: boolean;
}

const useStyles = createStyles((theme, params: { iconColor?: string }) => ({
  buttonContainer: {
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    backdropFilter: 'blur(4px)',
    borderRadius: theme.radius.sm,
    padding: 2,
    height: 60,
    scrollMargin: 8,
    border: '1px solid rgba(116, 192, 252, 0.1)',
    transition: 'all 0.2s ease',
    position: 'relative',
    '&:focus': {
      backgroundColor: 'rgba(23, 32, 52, 0.95)',
      outline: 'none',
      borderColor: 'rgba(116, 192, 252, 0.3)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    },
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
      transition: 'opacity 0.2s ease',
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
      transition: 'opacity 0.2s ease',
    },
    '&:hover::before, &:hover::after, &:focus::before, &:focus::after': {
      opacity: 1,
    },
  },
  buttonWrapper: {
    paddingLeft: 5,
    paddingRight: 12,
    height: '100%',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    backgroundColor: 'rgba(116, 192, 252, 0.1)',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    border: '1px solid rgba(116, 192, 252, 0.1)',
  },
  iconImage: {
    maxWidth: 32,
    borderRadius: 4,
  },
  icon: {
    fontSize: 24,
    color: params.iconColor || '#74C0FC',
    transition: 'transform 0.2s ease',
  },
  label: {
    color: theme.colors.gray[1],
    textTransform: 'uppercase',
    fontSize: 12,
    verticalAlign: 'middle',
    fontWeight: 500,
    letterSpacing: '0.02em',
  },
  value: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
  },
  chevronIcon: {
    fontSize: 14,
    color: '#74C0FC',
    opacity: 0.8,
  },
  scrollIndexValue: {
    color: theme.colors.gray[1],
    textTransform: 'uppercase',
    fontSize: 14,
  },
  progressStack: {
    width: '100%',
    marginRight: 5,
  },
  progressLabel: {
    verticalAlign: 'middle',
    marginBottom: 3,
    color: '#fff',
    fontSize: 13,
    fontWeight: 500,
  },
  progress: {
    '& .mantine-Progress-root': {
      backgroundColor: 'rgba(116, 192, 252, 0.1)',
    },
    '& .mantine-Progress-bar': {
      background: 'linear-gradient(90deg, rgba(116, 192, 252, 0.8) 0%, rgba(116, 192, 252, 1) 100%)',
    },
  },
}));

const ListItem = forwardRef<Array<HTMLDivElement | null>, Props>(({ item, index, scrollIndex, checked }, ref) => {
  const { classes } = useStyles({ iconColor: item.iconColor });

  return (
    <Box
      tabIndex={index}
      className={classes.buttonContainer}
      key={`item-${index}`}
      ref={(element: HTMLDivElement) => {
        if (ref)
          // @ts-ignore i cba
          return (ref.current = [...ref.current, element]);
      }}
    >
      <Group spacing={15} noWrap className={classes.buttonWrapper}>
        {item.icon && (
          <Box className={classes.iconContainer}>
            {typeof item.icon === 'string' && isIconUrl(item.icon) ? (
              <img src={item.icon} alt="Missing image" className={classes.iconImage} />
            ) : (
              <LibIcon
                icon={item.icon as IconProp}
                className={classes.icon}
                fixedWidth
                animation={item.iconAnimation}
              />
            )}
          </Box>
        )}
          {Array.isArray(item.values) ? (
          <Group position="apart" w="100%">
            <Stack spacing={0} justify="space-between">
              <Text className={classes.label}>{item.label}</Text>
              <Text>
                {typeof item.values[scrollIndex] === 'object'
                  ? // @ts-ignore for some reason even checking the type TS still thinks it's a string
                    item.values[scrollIndex].label
                  : item.values[scrollIndex]}
              </Text>
            </Stack>
            <Group spacing={1} position="center">
              <LibIcon icon="chevron-left" className={classes.chevronIcon} />
              <Text className={classes.scrollIndexValue}>
                {scrollIndex + 1}/{item.values.length}
              </Text>
              <LibIcon icon="chevron-right" className={classes.chevronIcon} />
            </Group>
          </Group>
        ) : item.checked !== undefined ? (
          <Group position="apart" w="100%">
            <Text className={classes.label}>{item.label}</Text>
            <CustomCheckbox checked={checked} />
          </Group>
        ) : item.progress !== undefined ? (
          <Stack className={classes.progressStack} spacing={0}>
            <Text className={classes.progressLabel}>{item.label}</Text>
            <Progress
              value={item.progress}
              size="sm"
              color={item.colorScheme || '#74C0FC'}
              className={classes.progress}
            />
          </Stack>
        ) : (
          <Text className={classes.label}>{item.label}</Text>
        )}
      </Group>
    </Box>
  );
});

export default React.memo(ListItem);