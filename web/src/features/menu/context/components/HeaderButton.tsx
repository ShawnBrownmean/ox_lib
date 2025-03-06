import { Button, createStyles } from '@mantine/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  icon: IconProp;
  canClose?: boolean;
  iconSize: number;
  handleClick: () => void;
}

const useStyles = createStyles((theme, params: { canClose?: boolean }) => ({
  button: {
    borderRadius: 6,
    flex: '1 15%',
    alignSelf: 'stretch',
    height: 'auto',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 8,
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
      width: '4px',
      height: '4px',
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
      width: '4px',
      height: '4px',
      borderBottom: '2px solid #74C0FC',
      borderRight: '2px solid #74C0FC',
      opacity: 0.6,
      transition: 'opacity 0.2s ease',
    },
    '&:hover': {
      backgroundColor: 'rgba(23, 32, 52, 0.95)',
      transform: params.canClose === false ? 'none' : 'translateY(-1px)',
      borderColor: 'rgba(116, 192, 252, 0.3)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      cursor: params.canClose === false ? 'not-allowed' : 'pointer',
      '&::before, &::after': {
        opacity: 1,
      },
    },
    '&:active': {
      transform: params.canClose === false ? 'none' : 'translateY(0)',
    },
    '&:disabled': {
      backgroundColor: 'rgba(17, 24, 39, 0.4)',
      borderColor: 'rgba(116, 192, 252, 0.05)',
      '&::before, &::after': {
        opacity: 0.3,
      },
    },
  },
  root: {
    border: 'none',
    '&:disabled': {
      backgroundColor: 'transparent',
    },
  },
  label: {
    color: params.canClose === false ? theme.colors.gray[4] : theme.colors.gray[1],
    transition: 'color 0.2s ease',
    '&:hover': {
      color: params.canClose === false ? theme.colors.gray[4] : '#74C0FC',
    },
  },
  icon: {
    transition: 'transform 0.2s ease',
    filter: params.canClose === false ? 'grayscale(50%)' : 'none',
    opacity: params.canClose === false ? 0.5 : 1,
    '&:hover': {
      transform: params.canClose === false ? 'none' : 'scale(1.1)',
    },
  },
}));

const HeaderButton: React.FC<Props> = ({ icon, canClose, iconSize, handleClick }) => {
  const { classes } = useStyles({ canClose });

  return (
    <Button
      variant="default"
      className={classes.button}
      classNames={{ label: classes.label, root: classes.root }}
      disabled={canClose === false}
      onClick={handleClick}
    >
      <LibIcon 
        icon={icon} 
        fontSize={iconSize} 
        fixedWidth 
        className={classes.icon}
        style={{
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
          color: canClose === false ? undefined : '#74C0FC',
        }}
      />
    </Button>
  );
};

export default HeaderButton;