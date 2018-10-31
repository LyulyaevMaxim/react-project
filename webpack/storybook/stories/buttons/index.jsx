import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, boolean /* number, object, color, array, select, selectV2, date */ } from '@storybook/addon-knobs/react'

storiesOf('Buttons', module).add('with text', () => (
  <button
    {...{
      onClick: action('clicked'),
      fontSize: text('fontSize', '14px'),
      minWidth: text('minWidth', 'auto'),
      height: text('height', '30px'),
      borderRadius: text('borderRadius', undefined),
      disabled: boolean('disabled', false),
      active: boolean('active', false),
    }}
  >
    {text('button-text', 'Hello Button!')}
  </button>
))
