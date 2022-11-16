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
  const [menuTime, setMenuTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());

  const [mainMenu, setMainMenu] = useState(true);
  const [endMenu, setEndMenu] = useState(false);

  const [counter, setCounter] = useState(0);
  const [circles, setCircles] = useState<CircleData[]>([]);
  const [circle, setCircle] = useState<CircleData>();

  //scenes and UI
  let menu = <div className={css.top}>Space to Play: {counter}</div>;

  let game = (
    <div className={css.container}>
      <div className={css.top}>Client Render Tick: {counter}</div>
      <div className={css.gamecontainer}></div>
    </div>
  );

  let end = <div>End Screen</div>;

  const [output, setOutput] = useState(menu);

  //controls
  useEffect(() => {
    document.addEventListener(
      'keyup',
      (event) => {
        console.log('1');

        if (event.code === 'ShiftLeft') {
          setMainMenu(true);
          setEndMenu(false);
          setMenuTime(Date.now());
        }

        if (event.code === 'Space') {
          setMainMenu(false);
          setEndMenu(false);
          setTime(Date.now());
        }

        if (event.code === 'ShiftRight') {
          setCounter(0);
        }
      },
      false
    );
  }, []);

  //game loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (mainMenu) {
        return () => clearInterval(interval);
      }
      setTime(Date.now()); //main tick control
      //example state changer

      setCounter(counter + 1);
      if (circle) {
        //console.log('grow cricle');
        //console.log(JSON.stringify(circle));
        game = (
          <div className={css.container}>
            <div className={css.top}>Client Render Tick: {counter}</div>
            <div className={css.gamecontainer}>
              <div
                style={{
                  backgroundColor: 'red',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  position: 'relative',
                  top: '20px',
                  left: '40px',
                }}
              ></div>
            </div>
          </div>
        );
      } else {
        //console.log('create circle');
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

      setOutput(game);
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  //main menu
  useEffect(() => {
    const intervalMenu = setInterval(() => {
      if (!mainMenu) {
        clearInterval(intervalMenu);
        return;
      }
      setMenuTime(Date.now()); //main tick control

      setOutput(menu);
    }, 50);

    return () => {
      clearInterval(intervalMenu);
    };
  }, [menuTime]);

  //end screen
  useEffect(() => {
    const intervalEnd = setInterval(() => {
      if (endMenu === false) {
        clearInterval(intervalEnd);
        return;
      }
      setEndTime(Date.now()); //main tick control

      setOutput(end);
    }, 100);

    return () => {
      clearInterval(intervalEnd);
    };
  }, [endTime]);

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
