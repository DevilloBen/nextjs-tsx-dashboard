import icons from '@paljs/icons';
import { Button } from '@paljs/ui/Button';
import { EvaIcon } from '@paljs/ui/Icon';
import { Layout, LayoutColumn, LayoutColumns, LayoutContainer, LayoutContent, LayoutFooter } from '@paljs/ui/Layout';
import { Menu, MenuRefObject } from '@paljs/ui/Menu';
import { Sidebar, SidebarBody, SidebarRefObject } from '@paljs/ui/Sidebar';
import SEO, { SEOProps } from 'components/SEO';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useRef, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import Header from './Header';
import menuItems from './menuItem';
import SimpleLayout from './SimpleLayout';
import themes from './themes';

// const getDefaultTheme = (): DefaultTheme['name'] => {
//   if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
//     return localStorage.getItem('theme') as DefaultTheme['name'];
//   } else {
//     const hours = new Date().getHours();
//     return hours > 6 && hours < 19 ? 'default' : 'dark';
//   }
// };

const LayoutPage: React.FC<SEOProps> = ({ children, ...rest }) => {
  const [theme, setTheme] = useState<DefaultTheme['name']>('default');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const sidebarRef = useRef<SidebarRefObject>(null);
  const router = useRouter();
  const [menuState, setMenuState] = useState(false);
  const menuRef = useRef<MenuRefObject>(null);
  const [seeHeader, setSeeHeader] = useState(true);

  const getState = (state?: 'hidden' | 'visible' | 'compacted' | 'expanded') => {
    setSeeHeader(state !== 'compacted');
  };

  // const changeTheme = (newTheme: DefaultTheme['name']) => {
  //   setTheme(newTheme);
  //   typeof localStorage !== 'undefined' && localStorage.setItem('theme', newTheme);
  // };

  // useEffect(() => {
  //   console.log("Test sidebar")
  //   const localTheme = getDefaultTheme();
  //   if (localTheme !== theme && theme === 'default') {
  //     setTheme(localTheme);
  //   }
  // }, []);

  const changeDir = () => {
    const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
    setDir(newDir);
  };

  const authLayout = router.pathname.startsWith('/auth');

  return (
    <Fragment>
      <SEO {...rest} />
      <ThemeProvider theme={themes(theme, dir)}>
        <Fragment>
          <SimpleLayout />
          <Layout evaIcons={icons} dir={dir} className={!authLayout ? 'auth-layout' : ''}>
            {!authLayout && (
              <Header
                dir={dir}
                changeDir={changeDir}
                theme={{ set: () => setTheme(theme), value: theme }}
                toggleSidebar={() => sidebarRef.current?.toggle()}
              />
            )}
            <LayoutContainer>
              {!authLayout && (
                <Sidebar
                  getState={getState}
                  ref={sidebarRef}
                  property="start"
                  containerFixed
                  responsive
                  className="menu-sidebar"
                >
                  {seeHeader && (
                    <header>
                      <Button
                        size="Tiny"
                        status="Primary"
                        onClick={() => {
                          setMenuState(!menuState);
                          menuRef.current?.toggle();
                        }}
                        fullWidth
                      >
                        {menuState ? <EvaIcon name="arrow-circle-up" /> : <EvaIcon name="arrow-circle-down" />}
                      </Button>
                    </header>
                  )}
                  <SidebarBody>
                    <Menu
                      nextJs
                      className="sidebar-menu"
                      Link={Link}
                      ref={menuRef}
                      items={menuItems}
                      currentPath={router.pathname}
                      toggleSidebar={() => sidebarRef.current?.hide()}
                    />
                  </SidebarBody>
                </Sidebar>
              )}
              <LayoutContent>
                <LayoutColumns>
                  <LayoutColumn className="main-content">{children}</LayoutColumn>
                </LayoutColumns>
                {!authLayout && <LayoutFooter>PTT Public Company Limited</LayoutFooter>}
              </LayoutContent>
            </LayoutContainer>
          </Layout>
        </Fragment>
      </ThemeProvider>
    </Fragment>
  );
};

export default LayoutPage;
