import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
  '3xl': '2000px'
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
