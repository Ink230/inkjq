import Link from 'next/link';
import { ReactNode } from 'react';
import css from '../../styles/targets/TargetsInfo.module.css';

type Props = {
  children?: ReactNode;
  clientRenderTick?: number;
};

export const TargetsInfo: React.FC<Props> = ({
  children,
  clientRenderTick,
}: Props) => {
  return (
    <div className={css.container}>
      <div className={css.split}>
        <div className={css.bigTitle}>HOW TO PLAY</div>
        <div className={css.smallTitle}>Rules</div>
        <div className={css.textBox}>
          <ul>
            <li>Click the circles to earn 5 points for each one clicked</li>
            <li>Circles that shrink too small will cost you a life</li>
            <li>
              Get the <div className={css.highest}>highest score</div> possible
              with your 3 lives
            </li>
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
            <li>Smaller circles mean more misclicks, be precise</li>
            <li>Prioritize the oldest circles before its too late</li>
          </ul>
        </div>
      </div>
      <div className={css.split}>
        <div className={css.bigTitle}>QUIRKS</div>
        <div className={css.smallTitle}>Bad Clicks</div>
        <div className={css.textBox}>
          <ul>
            <li>Non-canvas browser rendering is gimmicky!</li>
            <li>Try to limit movement of the mouse while clicking</li>
            <li>A new tab may be needed frequently on older systems</li>
            <li>Many extensions can cause input delay</li>
            <li>Check the performance tips below</li>
          </ul>
        </div>
        <div className={css.smallTitle}>Troubleshooting</div>
        <div className={css.textBox}>
          <ul>
            <li>Developer Tool windows will cause reduced performance</li>
            <li>Other tabs with heavy JS may cause lag</li>

            <li>Chrome works best: fresh tabs or incognito help</li>
          </ul>
        </div>
        <div className={css.smallTitle}>About</div>
        <div className={css.textBox}>
          <ul>
            <li>
              Report bugs via{' '}
              <Link href="https://github.com/ink230/inkjq/" target="_blank">
                GitHub
              </Link>
            </li>
            <li>
              Game uses DOM renders and FPS independent ticks:{' '}
              {clientRenderTick}
            </li>
            <li>No canvas or WebGL for demonstrations reasons only </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
