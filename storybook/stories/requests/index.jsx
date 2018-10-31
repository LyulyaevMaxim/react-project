import React from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import { Provider } from '~storybook-store'
import RequestCreatorDemo from './request-creator'

storiesOf('Requests', module)
  .addDecorator(story => <Provider story={story()} />)
  .add('request-creator', withReadme(require('~utils/request-creator/readme.md'), () => <RequestCreatorDemo />))
