import { useTheme } from 'next-themes';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

const Layout: FC<{ children: React.ReactElement }> = ({ children }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <nav className="px-10 dark:bg-gray-900 dark:border-none pt-5 flex justify-between pb-6 border-b border-b-gray-100 shadow">
        <Link href="/">
          <a className="font-bold text-2xl">Where in the world</a>
        </Link>

        {mounted && (
          <button
            onClick={() =>
              setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
            }
          >
            {resolvedTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        )}
      </nav>
      <main className="dark:bg-gray-900">{children}</main>
    </div>
  );
};

export default Layout;
