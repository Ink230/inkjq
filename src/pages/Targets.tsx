'use client';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Layout } from '../components';
import css from '../styles/Targets.module.css';

const title: string = 'Ink JQ - Targets';

export interface CircleData {
  id: number;
  radius: number;
  x: number;
  y: number;
  clicked: boolean;
  speed?: number;
  hp?: number;
}

//game parameters

const Targets: NextPage = () => {
  //Setup state to hold ticks
  const [time, setTime] = useState(Date.now());
  const [counter, setCounter] = useState(0);
  const [circles, setCircles] = useState<CircleData[]>([]);
  const [circle, setCircle] = useState<CircleData>();

  //scenes and UI
  let menu = <div className={css.top}>Space to Play</div>;

  let game = (
    <div className={css.container}>
      <div className={css.top}>Client Render Tick: {counter}</div>
      <div className={css.gamecontainer}></div>
    </div>
  );

  let end = <div>End Screen</div>;

  //0 - menu, 1 - game, 2 - end game screen
  const [scene, setScene] = useState(0);
  const [output, setOutput] = useState(menu);

  //controls

  //game loop
  useEffect(() => {
    //controls
    document.addEventListener(
      'keydown',
      (event) => {
        if (event.code === 'Space') {
          setScene(1);
        }
      },
      false
    );

    document.addEventListener(
      'keydown',
      (event) => {
        if (event.code === 'ShiftLeft') {
          setScene(0);
        }
      },
      false
    );

    const interval = setInterval(() => {
      setTime(Date.now()); //main tick control
      //example state changer

      if (scene === 0) {
        setOutput(menu);
      } else if (scene === 1) {
        setOutput(game);
        setCounter(counter + 1);
        if (circle) {
          console.log('grow cricle');
          console.log(JSON.stringify(circle));
        } else {
          console.log('create circle');
          let a: CircleData = {
            id: 1,
            radius: 5,
            x: 1,
            y: 1,
            clicked: false,
            speed: 1,
            hp: 1,
          };
          setCircle((circle) => ({ ...circle, ...a }));
        }
        //grow circles
        //check collisions
        //draw new circles in blank spots
      } else if (scene === 0) {
        setOutput(end);
      }
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  //what gets output each game loop cycle
  return (
    <Layout _home={true} _pageTitle={title}>
      {output}
    </Layout>
  );
};

export default Targets;

/*
• circles that get larger
• if two circles touch its over
• circles always spawn x diameters apart from each other

difficulty
• circles grow faster
• circles populate the field faster
• 

controls
• space resets game
• tab resets to menu
• click to destroy circle

scenes
• menu
• game
• end scene

difficulties
easy
medium
hard
insanity

scaling
• growth speed
• circle spawn speed
• circle spawn spacing
 

v2
• double clicking, HP ?
• do something in the circle
• powerups from completing a challenge?


*/
