import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  '2xl': '96em'
});

const theme = extendTheme({ breakpoints });

export { theme };
