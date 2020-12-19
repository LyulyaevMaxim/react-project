import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
// import ThemeSelect from './themeSelect'
import { IRoute } from '~types/index'
import { css, keyframes, useSpring, useTransition, useChain, animated } from '~utils/styled'
import { Hamburger, hamburgerTypes } from '~modules/hamburger'
import { ThemeContext } from '~modules/contexts/theme'

interface IProps {
  routes: IRoute[]
}

const AnimatedNavLink = animated(
  React.forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
    const refCallback = () => ref
    return (
      <NavLink {...props} innerRef={refCallback}>
        {props.children}
      </NavLink>
    )
  })
)

export const Header: React.FC<IProps> = ({ routes }) => {
  const [isOpen, changeOpen] = React.useState<null | boolean>(null),
    theme = React.useContext(ThemeContext),
    isDesktop = theme.media.is(`(${theme.media.minDesktop})`),
    handleOpen = React.useCallback(() => changeOpen(!isOpen), [isOpen]),
    styles = (() => {
      const { activeTheme, themes, fonts, media } = theme
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
          transition: filter 0.3s;
        `,
        hamburger: css`
          ${isOpen &&
            css`
              position: relative;
              z-index: 2;
              animation: ${keyframes`
                100% {
                  transform: rotate(360deg); 
                }
              `} 4s linear infinite;
            `};

          @media (${media.minDesktop}) {
            display: none;
          }
        `,
        headerNav: css`
          grid-area: menu;
          @media (${media.maxTablet}) {
            ul {
              position: fixed;
              left: 0;
              top: 0;
              z-index: 1;
              width: 100vw;
              height: 100vh;
              overflow-y: auto;
              padding: 20px ${theme.paddings.horizontal.mobile};
              background-color: ${themes[activeTheme].pageBackground};
              display: grid;
              grid-gap: 10px;
              align-items: center;
              transition-property: transform;
              transition-duration: 0.3s;
              transform: translateX(100%)
            }

            ul > li {
              text-align: center;
              transition: filter 1s;
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
                pointer-events: none;
              }
            }
          }
        `,
      }
    })(),
    animations = {
      mountFromOpacity: useSpring({
        from: { filter: 'opacity(0)' },
        to: { filter: 'opacity(1)' },
        reset: true,
      }),
    }

  return (
    <header css={styles.header}>
      <AnimatedNavLink
        css={styles.headerTitle}
        style={animations.mountFromOpacity}
        to={routes[0].path}
        onMouseEnter={routes[0].component.preload}
        exact={true}
      >
        React Project
      </AnimatedNavLink>
      {/*<ThemeSelect />*/}
      <nav css={styles.headerNav}>
        <Hamburger
          type={hamburgerTypes.linesToCross}
          className={styles.hamburger}
          isActive={isOpen}
          onClick={handleOpen}
        />
        {(isOpen !== null || isDesktop) && <Menu {...{ routes, isOpen }} />}
      </nav>
    </header>
  )
}

const Menu = ({ routes, isOpen }) => {
  const menuRef = React.useRef(),
    // linksRef = React.useRef(),
    animations = {
      menu: useTransition(isOpen, item => item, {
        ref: menuRef,
        from: { transform: 'translateX(0)' },
        enter: { transform: 'translateX(100%)' },
        leave: { transform: 'translateX(100%)' },
        update: { transform: 'translateX(100%)' },
        // unique: true,
        reset: true,
      }),
      /*menuLinks: useTransition(routes, route => route.title, {
        ref: linksRef,
        from: { filter: 'opacity(0)' },
        enter: { filter: 'opacity(1)' },
        leave: { filter: 'opacity(0)' },
        trail: 400 / routes.length,
        unique: true,
        reset: true,
      }),*/
    },
    handleClickLink = React.useCallback((event: React.SyntheticEvent<HTMLAnchorElement>) => {
      event.stopPropagation()
      // /!*if (!isDesktop) *!/ handleOpen()
    }, [])

  // useChain(isOpen ? [menuRef/*, linksRef*/] : [/*linksRef, */menuRef], [0, isOpen ? 0.1 : 0.6])
console.log(animations.menu)
  return animations.menu.map(({item,key, props, ...rest}) => {
    console.log(rest)
    return <animated.ul {...{key, style: props}} />
  })

      /*{animations.menuLinks.map(({ item, props, key }) => (
        <animated.li style={props} key={key}>
          <NavLink to={item.path} onMouseEnter={item.component.preload} exact={true} onClick={handleClickLink}>
            {item.title}
          </NavLink>
        </animated.li>
      ))}*/

}
