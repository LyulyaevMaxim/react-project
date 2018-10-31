import { configure, addDecorator } from '@storybook/react'

require('@storybook/addon-options').setOptions({
  name: 'React Project Storybook',
  url: 'https://github.com/LyulyaevMaxim/react-project',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
  sortStoriesByKind: false,
  hierarchySeparator: null,
  hierarchyRootSeparator: null,
  sidebarAnimations: false,
  selectedAddonPanel: undefined,
})

addDecorator(require('@storybook/addon-knobs/react').withKnobs)

const stories = ['buttons', 'requests', 'design' /*'inputs', 'elements', 'styledElements'*/]

configure(stories.sort().forEach(story => require(`./stories/${story}`)), module)
