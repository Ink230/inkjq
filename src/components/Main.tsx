import { ReactNode } from 'react';
import css from '../styles/Main.module.css';

type Props = {
  children?: ReactNode;
};

export const Main: React.FC<Props> = ({ children }: Props) => {
  return <div className={css.main}>{children}</div>;
};
