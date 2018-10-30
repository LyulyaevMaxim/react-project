import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

storiesOf('Buttons', module).add('with text', () => <button onClick={action('clicked')}>Hello Button!</button>)
