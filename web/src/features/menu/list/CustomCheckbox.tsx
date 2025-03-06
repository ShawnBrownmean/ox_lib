import { Checkbox, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    border: '1px solid rgba(116, 192, 252, 0.2)',
    transition: 'all 0.2s ease',
    '&:checked': { 
      backgroundColor: '#74C0FC',
      borderColor: '#74C0FC',
    },
    '&:hover': {
      borderColor: 'rgba(116, 192, 252, 0.5)',
      backgroundColor: 'rgba(23, 32, 52, 0.95)',
    },
  },
  inner: {
    '> svg > path': {
      fill: theme.colors.dark[6],
      transition: 'fill 0.2s ease',
    },
  },
}));

const CustomCheckbox: React.FC<{ checked: boolean }> = ({ checked }) => {
  const { classes } = useStyles();
  return (
    <Checkbox
      checked={checked}
      size="md"
      classNames={{ root: classes.root, input: classes.input, inner: classes.inner }}
    />
  );
};

export default CustomCheckbox;