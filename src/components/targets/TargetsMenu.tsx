import { ReactNode } from 'react';
import { TargetsInfo } from '../../components';
import css from '../../styles/targets/TargetsMenu.module.css';

type Props = {
  children?: ReactNode;
  score?: number;
  lives?: number;
  clientRenderTick?: number;
};

export const TargetsMenu: React.FC<Props> = ({
  children,
  score,
  lives,
  clientRenderTick,
}: Props) => {
  return (
    <div className={css.base}>
      <div className={css.container}>
        <div className={css.top}>
          Render Tick: {clientRenderTick} || Score: {score} || Lives: {lives}
        </div>
        {children}
      </div>
      <TargetsInfo />
    </div>
  );
};
