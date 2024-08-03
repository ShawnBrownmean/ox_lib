import { Checkbox, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'lightgray',
    '&:checked': { backgroundColor: 'linear-gradient(90deg, rgba(56, 162, 229,0) 0%,  rgba(24, 72, 102, 1) 90%)' },
  },
  inner: {
    '> svg > path': {
      fill: 'white',
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
