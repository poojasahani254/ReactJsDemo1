// module.exports = {
//   stories: ['../src/**/*.stories.js'],
//   addons: [
//     '@storybook/preset-create-react-app',
//     '@storybook/addon-actions',
//     '@storybook/addon-links',
//   ],
// };

import { configure } from '@storybook/react';
function loadStories() {
  require('../src/stories');
}
configure(loadStories, module);