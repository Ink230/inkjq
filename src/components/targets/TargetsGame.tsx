import { ReactNode } from 'react';
import css from '../../styles/targets/TargetsGame.module.css';

type Props = {
  children?: ReactNode;
  backgroundColor?: string;
  pauseTitle?: string;
  pauseLitte?: string;
  menuActive?: boolean;
  score?: number;
  gameOver?: boolean;
  misClick?: () => void;
};

type tiers = {
  name: string;
  lowScore: number;
  highScore: number;
  color: string;
  flavour: string;
};

const tierList: tiers[] = [
  {
    name: 'Potato',
    lowScore: 0,
    highScore: 150,
    color: '#d92525',
    flavour: 'at least you can be a battery',
  },
  {
    name: 'Average',
    lowScore: 151,
    highScore: 399,
    color: '#25d9a7',
    flavour: 'nice job, try again',
  },
  {
    name: 'Gamer',
    lowScore: 400,
    highScore: 749,
    color: '#25d92b',
    flavour: 'no controller here',
  },
  {
    name: 'Circle Destroyer',
    lowScore: 750,
    highScore: 999,
    color: '#3025d9',
    flavour: 'pro level aim',
  },
  {
    name: 'So Close...',
    lowScore: 1000,
    highScore: 1499,
    color: '#ffffff',
    flavour: 'prove your ascension',
  },
  {
    name: 'GOD',
    lowScore: 1500,
    highScore: 9000,
    color: '#efe80a',
    flavour: 'pedes meos osculari',
  },
];

export const TargetsGame: React.FC<Props> = ({
  children,
  backgroundColor,
  pauseTitle,
  pauseLitte,
  menuActive = true,
  gameOver = false,
  score = 0,
  misClick = () => null,
}: Props) => {
  let miniMenu = <></>;

  let finalScore = (
    <div className={css.scorecontainer}>
      <div className={css.score}></div>
    </div>
  );

  let index = 0;
  if (gameOver) {
    switch (true) {
      case score <= tierList[0].highScore: {
        index = 0;
        break;
      }
      case score <= tierList[1].highScore: {
        index = 1;
        break;
      }
      case score <= tierList[2].highScore: {
        index = 2;
        break;
      }
      case score <= tierList[3].highScore: {
        index = 3;
        break;
      }
      case score <= tierList[4].highScore: {
        index = 4;
        break;
      }
      case score <= tierList[5].highScore: {
        index = 5;
        break;
      }
    }

    finalScore = (
      <div className={css.scorecontainer}>
        FINAL SCORE
        <div className={css.score} style={{ color: tierList[index].color }}>
          {score}
        </div>
        <div className={css.tier} style={{ color: tierList[index].color }}>
          <div className={css.tiertext}>{tierList[index].name}</div>
          <div className={css.tiertext}>{tierList[index].flavour}</div>
        </div>
      </div>
    );
  }

  if (menuActive) {
    miniMenu = (
      <div className={css.menucontainer}>
        <div className={css.pause}>{pauseTitle}</div>
        <div className={css.littlecontainer}>
          <div className={css.little}>{pauseLitte}</div>
          {finalScore}
          <div className={css.little}>
            more instructions below
            <br />
            <div className={css.small}>
              1920x1080 or higher resolution recommended
            </div>
          </div>
        </div>
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
