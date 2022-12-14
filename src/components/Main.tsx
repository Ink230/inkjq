import Link from 'next/link';
import { ReactNode } from 'react';
import css from '../styles/Main.module.css';

type Props = {
  children?: ReactNode;
};

export const Main: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className={css.main}>
      <Link href="/wordle">
        <div className={css.selector}>Wordle</div>
      </Link>
      <Link href="/targets">
        <div className={css.selector}>Targets</div>
      </Link>
    </div>
  );
};
