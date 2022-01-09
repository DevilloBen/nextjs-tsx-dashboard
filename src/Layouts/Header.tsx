import { Actions } from '@paljs/ui/Actions';
import { breakpointDown } from '@paljs/ui/breakpoints';
import ContextMenu from '@paljs/ui/ContextMenu';
import { LayoutHeader } from '@paljs/ui/Layout';
import User from '@paljs/ui/User';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${breakpointDown('sm')`
    .right{
      display: none;
    }
  `}
  .right > div {
    height: auto;
    display: flex;
    align-content: center;
  }
  .logo {
    font-size: 1.25rem;
    white-space: nowrap;
    text-decoration: none;
  }
  .left {
    display: flex;
    align-items: center;
    .github {
      font-size: 18px;
      margin-right: 5px;
    }
  }
  .up{
    margin-bottom: 10px;
  }
`;

// const Label = styled.span`
//   display: flex;
//   align-items: center;
// `;

// const SelectStyled = styled(Select)`
//   min-width: 150px;
// `;

interface HeaderProps {
  toggleSidebar: () => void;
  theme: {
    set: (value: DefaultTheme['name']) => void;
    value: DefaultTheme['name'];
  };
  changeDir: () => void;
  dir: 'rtl' | 'ltr';
}

const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter();
  // const themeOptions = () => [
  //   {
  //     value: 'default',
  //     label: (
  //       <Label>
  //         <EvaIcon name="droplet" options={{ fill: '#a6c1ff' }} />
  //         Default
  //       </Label>
  //     ),
  //   },
  //   {
  //     value: 'dark',
  //     label: (
  //       <Label>
  //         <EvaIcon name="droplet" options={{ fill: '#192038' }} />
  //         Dark
  //       </Label>
  //     ),
  //   },
  //   {
  //     value: 'cosmic',
  //     label: (
  //       <Label>
  //         <EvaIcon name="droplet" options={{ fill: '#5a37b8' }} />
  //         Cosmic
  //       </Label>
  //     ),
  //   },
  //   {
  //     value: 'corporate',
  //     label: (
  //       <Label>
  //         <EvaIcon name="droplet" options={{ fill: '#3366ff' }} />
  //         Corporate
  //       </Label>
  //     ),
  //     selected: true,
  //   },
  // ];
  return (
    <LayoutHeader fixed>
      <HeaderStyle>
        <Actions
          size="Large"
          actions={[
            {
              icon: { name: 'menu-2-outline' },
              url: {
                onClick: props.toggleSidebar,
              },
            },
            {
              content: (
                <Link href="/">
                  <a className="logo">PTT NDID</a>
                </Link>
              ),
            },
            {
              content: (
               <img height="50" src="/icons/logo_PTT_Test.png" alt="pttDigitalLogo" />
              ),
            }
          ]}
        />
    
        <Actions
          size="Small"
          className="right"
          actions={[
            {
              content: (
                <a href="https://discord.gg/ZhrUXzmd" target="_blank" rel="noreferrer">
                  <img height="20" src="/discord.svg" alt="slack" />
                </a>
              ),
            },
            {
              icon: 'twitter',
              url: { href: 'https://twitter.com/DevilloBen', target: '_blank' },
            },
            {
              content: (
                <ContextMenu
                  nextJs
                  style={{ cursor: 'pointer' }}
                  placement="bottom"
                  currentPath={router.pathname}
                  items={[
                    { title: 'Profile', link: { href: '/modal-overlays/tooltip' } },
                    { title: 'Log out', link: { href: '/logout' } },
                  ]}
                  Link={Link}
                >
                  <User image="url('/icons/profile_exemple.png')" name="Benchapon Sakhonkam" title="Developer" size="Medium" />
                </ContextMenu>
              ),
            },
          ]}
        />
      </HeaderStyle>
    </LayoutHeader>
  );
};
export default Header;
