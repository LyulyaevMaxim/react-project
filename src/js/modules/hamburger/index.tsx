import React from 'react'
import { css } from '~utils/styled'
// import { ThemeContext } from '~modules/contexts/theme'
import { ReactComponent as Icon } from '~img/icons/hamburger.svg'

export enum hamburgerTypes {
  linesToCross,
  linesToArrow,
}

interface IHamburger {
  type: hamburgerTypes
  isActive: null | boolean
  changeActive: (props: any) => void
  css?: any
}

export function Hamburger(props: IHamburger): React.ReactElement {
  const { type, isActive = null, changeActive } = props,
    onClick = React.useCallback(() => changeActive(!isActive), [isActive]),
    /*theme = React.useContext(ThemeContext),*/
    styles = css`
      cursor: pointer;
      user-select: none;

      & > [data-class~='line'] {
        fill: none;
        transition: transform 400ms, stroke-dasharray 200ms, opacity 600ms;
        stroke: #000;
        stroke-width: 4.5;
        stroke-linecap: round;
        stroke-dasharray: 0;
      }

      ${(() => {
        switch (type) {
          case hamburgerTypes.linesToCross:
            return css`
              & > [data-class~='line'][data-class~='top'] {
                ${isActive && 'transform: rotate(45deg) translate(11px, -12px);'}
              }
              & > [data-class~='line'][data-class~='middle'] {
                ${isActive && 'transform: rotateZ(-45deg) translate(-22px, 13px); opacity: 0;'}
              }
              & > [data-class~='line'][data-class~='bottom'] {
                ${isActive && 'transform: rotate(-45deg) translateX(-23px);'}
              }
            `

          case hamburgerTypes.linesToArrow:
            return css`
              & > [data-class~='line'][data-class~='top'],
              & > [data-class~='line'][data-class~='bottom'] {
                ${isActive && 'stroke-dasharray: 16 100; stroke-width: 4;'}
              }
              & > [data-class~='line'][data-class~='top'] {
                ${isActive && 'transform: rotate(-25deg) translate(-9px, 14px);'}
              }
              & > [data-class~='line'][data-class~='bottom'] {
                ${isActive && 'transform: rotate(25deg) translate(11px, -18px);'}
              }
            `

          default:
            throw new Error(`${type} is incorrect hamburger's type`)
        }
      })()}
    `

  return <Icon onClick={onClick} css={[styles, props.css]} />
}
