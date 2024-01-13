'use client'

import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Header({ theme, className, ...delegated }) {
  const router = useRouter();
  const [currentTheme, setCurrentTheme] = React.useState(theme);

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    setCurrentTheme(nextTheme);

    Cookie.set('color-theme', nextTheme, { expires: 1000 });

    router.refresh();
  }

  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <Link href="/rss" className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </Link>
        <button onClick={toggleTheme} className={styles.action}>
          {currentTheme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
