import { ReactNode } from 'react';
import { TargetsInfo } from '../../components';
import css from '../../styles/targets/TargetsMenu.module.css';

type Props = {
  children?: ReactNode;
  score?: number;
  misclickScore: number;
  lives?: number;
  clientRenderTick?: number;
};

export const TargetsMenu: React.FC<Props> = ({
  children,
  score,
  misclickScore,
  lives,
  clientRenderTick,
}: Props) => {
  return (
    <div className={css.base}>
      <div className={css.container}>
        <div className={css.top}>
          MisClicks: {misclickScore} || Score: {score} || Lives: {lives}
        </div>
        {children}
      </div>
      <TargetsInfo clientRenderTick={clientRenderTick} />
    </div>
  );
};
