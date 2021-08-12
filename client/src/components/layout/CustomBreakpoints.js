import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  '2xl': '96em'
});

const Button = {
  baseStyle: {
    _focus: {
      boxShadow: 'none'
    }
  }
}

const theme = extendTheme({ components: {Button}, breakpoints });

export { theme };
