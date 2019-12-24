import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
setOptions({
  name: 'Maps',
  url: 'https://localhost:9001',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  downPanelInRight: false,
});

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
