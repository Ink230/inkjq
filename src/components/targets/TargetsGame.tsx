import { ReactNode } from 'react';
import css from '../../styles/targets/TargetsGame.module.css';

type Props = {
  children?: ReactNode;
  backgroundColor?: string;
  pauseTitle?: string;
  pauseLitte?: string;
  menuActive?: boolean;
  misClick?: () => void;
};
export const TargetsGame: React.FC<Props> = ({
  children,
  backgroundColor,
  pauseTitle,
  pauseLitte,
  menuActive = true,
  misClick = () => null,
}: Props) => {
  let miniMenu = <></>;

  if (menuActive) {
    miniMenu = (
      <div className={css.menucontainer}>
        <div className={css.pause}>{pauseTitle}</div>
        <div className={css.little}>{pauseLitte}</div>
      </div>
    );
  }

  return (
    <div
      className={css.gamecontainer}
      style={{ backgroundColor: backgroundColor }}
      onMouseDown={misClick}
    >
      {children}
      {miniMenu}
    </div>
  );
};
