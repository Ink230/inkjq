import { ReactNode } from 'react';
import { CircleData } from '../../pages/targets';
import css from '../../styles/targets/TargetsCircle.module.css';

type Props = {
  children?: ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  circle: CircleData;
  clickedCircle?: (id: number) => any;
};

export const TargetsCircle: React.FC<Props> = ({
  children,
  backgroundColor,
  borderColor,
  circle,
  clickedCircle = () => null,
}: Props) => {
  return (
    <div
      className={css.circle}
      onMouseDown={(e) => {
        e.stopPropagation();
        clickedCircle(circle.id);
      }}
      key={circle.id}
      style={{
        backgroundColor: backgroundColor,
        border: borderColor,
        width: circle.radius,
        height: circle.radius,
        top: circle.y,
        left: circle.x,
        transform: `scale(${circle.scale})`,
      }}
    ></div>
  );
};
