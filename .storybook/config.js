import { addDecorator, configure } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import results from '../.jest.test.result.json';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { themes } from '@storybook/components';
import 'assets/styles/calendar.scss';
// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(
  withOptions({
    name: 'React Datepicker',
    theme: Object.assign(themes.dark, {
      mainFill: 'white',
    }),
  })
);

addDecorator(
  withTests({
    results,
    filesExt: '.test.tsx',
  })
);

addDecorator(withKnobs);
addDecorator(
  withInfo({
    inline: true,
  })
);

configure(loadStories, module);