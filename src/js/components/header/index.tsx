import React from 'react'
import { NavLink } from 'react-router-dom'
// import ThemeSelect from './themeSelect'
import { IRoute } from '~types/index'
import { css } from '~utils/styled'
import { Hamburger, hamburgerTypes } from '~modules/hamburger'
import { ThemeContext } from '~modules/contexts/theme'

interface IProps {
  routes: IRoute[]
}
console.log(require('~img/icon-close.svg'))
export const Header = ({ routes }: IProps) => {
  const [isOpen, changeOpen] = React.useState(null),
    theme = React.useContext(ThemeContext),
    styles = (() => {
      const { activeTheme, themes, fonts } = theme
      return {
        header: css`
          display: grid;
          grid-template: 'title menu';
          grid-template-columns: 1fr auto;
          align-items: center;
          background-color: ${themes[activeTheme].pageBackground};
          padding: 20px ${theme.paddings.horizontal.mobile};
        `,
        headerTitle: css`
          grid-area: title;
          color: ${themes[activeTheme].textColor};
          /* на отрезке [1024, 1400] равномерно увеличивать размер шрифта с 24px до 36px */
          //font-size: scale($desktop, $big-desktop, 24px, 32px, 100vw);
          font-size: ${fonts.sizes['3']};
          font-weight: ${fonts.weight.bold};
          line-height: 1.5;
        `,
        hamburger: css`
          ${theme['@media'].minDesktop} {
            display: none;
          }
        `,
        headerNav: css`
          grid-area: menu;
          ${theme['@media'].maxTablet} {
            ul {
              position: fixed;
              left: 0;
              top: 0;
              width: 100vw;
              height: 100vh;
              overflow-y: auto;
              padding: 20px ${theme.paddings.horizontal.mobile};
              background-color: ${themes[activeTheme].pageBackground};
              display: ${isOpen ? 'grid' : 'none'};
              grid-gap: 10px;
              align-items: center;
            }

            ul::before {
              content: '';
              display: block;
              background-image: url(${require('~img/icon-close.svg').default});
              background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgOSA5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjx0aXRsZT5VbmlvbjwvdGl0bGU+PGRlc2M+Q3JlYXRlZCB1c2luZyBGaWdtYTwvZGVzYz48ZyBpZD0iQ2FudmFzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDc3OCAtMzE4NSkiPjxnIGlkPSJVbmlvbiI+PHVzZSB4bGluazpocmVmPSIjcGF0aDBfZmlsbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDc3OCAzMTg1KSIgc3R5bGU9ImZpbGw6dmFyKC0tY29sb3IsYmxhY2spIi8+PC9nPjwvZz48ZGVmcz48cGF0aCBpZD0icGF0aDBfZmlsbCIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNIDEuMjg1NjQgMEwgMCAxLjI4NTY0TCAzLjIxNDM2IDQuNDk5NzZMIDAgNy43MTQxMUwgMS4yODU2NCA4Ljk5OTc2TCA0LjUgNS43ODU0TCA3LjcxNDM2IDguOTk5NzZMIDkgNy43MTQxMUwgNS43ODU2NCA0LjQ5OTc2TCA5IDEuMjg1NjRMIDcuNzEzODcgMEwgNC41IDMuMjE0MTFMIDEuMjg1NjQgMFoiLz48L2RlZnM+PC9zdmc+);
            }

            ul > li {
              text-align: center;
              &:hover > a {
                color: hsl(0, 0%, 0%);
              }
            }

            ul > li > a {
              //border-bottom: 3px solid transparent;
              color: rgba(79, 79, 79, 0.5);
              font-size: ${fonts.sizes['1']};
              font-weight: 700;
              letter-spacing: 0.05em;
              line-height: 2.5;
              text-transform: uppercase;
              transition: color 0.3s;

              &.active {
                //border-color: hsl(138, 54%, 49%);
                color: hsl(0, 0%, 31%);
              }
            }
          }
        `,
      }
    })()

  return (
    <header css={styles.header}>
      <h3 css={styles.headerTitle}>React Project</h3>
      {/*<ThemeSelect />*/}
      <nav css={styles.headerNav}>
        <Hamburger
          type={hamburgerTypes.linesToCross}
          css={styles.hamburger}
          isActive={isOpen}
          changeActive={changeOpen}
        />
        <ul>
          {routes.map(({ title, path, component }) => (
            <li key={title}>
              <NavLink
                {...{
                  to: path,
                  // className: styles.headerNavLink,
                  // activeClassName: styles.active,
                  onMouseEnter: () => component.preload(),
                  exact: true,
                }}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
