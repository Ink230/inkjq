import Link from 'next/link';
import { ReactNode } from 'react';
import css from '../../styles/targets/TargetsInfo.module.css';

type Props = {
  children?: ReactNode;
};

export const TargetsInfo: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className={css.container}>
      <div className={css.split}>
        <div className={css.bigTitle}>HOW TO PLAY</div>
        <div className={css.smallTitle}>Objective</div>
        <div className={css.textBox}>
          <ul>
            <li>Click the circles to earn 5 points for each one clicked</li>
            <li>Circles that shrink too small will cost you a life</li>
            <li>Get the highest score possible with your 3 lives</li>
            <li>Avoid misclicks as they will deduct 20 points</li>
            <li>Instant GAME OVER if your score falls to -20 or lower</li>
          </ul>
        </div>
        <div className={css.smallTitle}>Controls</div>
        <div className={css.textBox}>
          <ul>
            <li>LEFT SHIFT to pause the game</li>
            <li>SPACE to start or resume</li>
            <li>RIGHT SHIFT to reset</li>
          </ul>
        </div>
        <div className={css.smallTitle}>Tips</div>
        <div className={css.textBox}>
          <ul>
            <li>
              Smaller circles mean more misclicks; build up your score to afford
              misses
            </li>
            <li>Prioritize the oldest circles before its too late</li>
          </ul>
        </div>
      </div>
      <div className={css.split}>
        <div className={css.bigTitle}>QUIRKS</div>
        <div className={css.smallTitle}>Click Registration</div>
        <div className={css.textBox}>
          <ul>
            <li>Non-canvas browser rendering is gimmicky!</li>
            <li>Try to limit movement of the mouse while clicking</li>
            <li>A new tab may be needed every so often on older systems</li>
            <li>
              Many extensions interrupt rendering frames causing input delay
            </li>
            <li>Check the performance tips below</li>
          </ul>
        </div>
        <div className={css.smallTitle}>Performance Tips</div>
        <div className={css.textBox}>
          <ul>
            <li>
              Developer Tool windows in browsers will cause reduced performance
            </li>
            <li>Other tabs using heavy JS / media elements may cause lag</li>

            <li>Chrome will work the best: fresh tabs or incognito are best</li>
          </ul>
        </div>
        <div className={css.smallTitle}>Bugs</div>
        <div className={css.textBox}>
          <ul>
            <li>
              Report them via
              <Link href="https://github.com/ink230/inkjq/">GitHub</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
