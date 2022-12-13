'use client';
import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
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
  scale: number;
}

//game parameters

const Targets: NextPage = () => {
  //Setup state
  const [time, setTime] = useState(Date.now());
  const [menuTime, setMenuTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());

  const mainMenu = useRef(true);
  const endMenu = useRef(false);

  const [counter, setCounter] = useState(0);
  const [circles, setCircles] = useState<CircleData[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  //how often the objects are ticked
  const [circleTimer, setCircleTimer] = useState(Date.now());
  const [radiusTimer, setRadiusTimer] = useState(Date.now());

  //the magnitude in the attribute's change
  const [circleRadiusSize, setCircleRadiusSize] = useState(350);
  const [circleSpawnSpeed, setCircleSpawnSpeed] = useState(800);
  const [circleShrinkSpeed, setCircleShrinkSpeed] = useState(0.01);

  //the rate the attribute's tick amount changes
  const [circleRadiusSizeTimer, setCircleRadiusSizeTimer] = useState(
    Date.now()
  );
  const [circleSpawnSpeedTimer, setCircleSpawnSpeedTimer] = useState(
    Date.now()
  );
  const [circleShrinkSpeedTimer, setCircleShrinkSpeedTimer] = useState(
    Date.now()
  );

  //scenes and UI
  let menu = (
    <div className={css.base}>
      <div className={css.container}>
        <div className={css.top}>
          Client Render Tick: {counter} | Score: {score} | Menu:{' '}
          {String(mainMenu.current)}| EndMenu: {String(endMenu.current)} |
          Lives: {lives}
        </div>
        <div
          className={css.gamecontainer}
          style={{ backgroundColor: '#7f7f7f' }}
        >
          {Array.from(circles).map((circle) => {
            return (
              <div
                key={circle.id}
                style={{
                  backgroundColor: '#414141',
                  border: 'solid 1px #2c2c2c',
                  width: circle.radius,
                  height: circle.radius,
                  borderRadius: '50%',
                  position: 'absolute',
                  top: circle.y,
                  left: circle.x,
                  transformOrigin: 'center center',
                  transform: `scale(${circle.scale})`,
                }}
              ></div>
            );
          })}
          <div className={css.menucontainer}>
            <div className={css.pause}>START</div>
            <div className={css.little}>
              left shift to pause | space to start | right shift to reset
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  let game = (
    <div className={css.base}>
      <div className={css.container}>
        <div className={css.top}>
          Client Render Tick: {counter} | Score: {score} | Menu:{' '}
          {String(mainMenu.current)}| EndMenu: {String(endMenu.current)} |
          Lives: {lives}
        </div>
        <div className={css.gamecontainer}>
          {Array.from(circles).map((circle) => {
            return (
              <div
                onMouseDown={() => clickedCircle(circle.id)}
                key={circle.id}
                style={{
                  backgroundColor: 'purple',
                  border: 'solid 1px red',
                  width: circle.radius,
                  height: circle.radius,
                  borderRadius: '50%',
                  position: 'absolute',
                  top: circle.y,
                  left: circle.x,
                  transformOrigin: 'center center',
                  transform: `scale(${circle.scale})`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );

  let end = (
    <div className={css.base}>
      <div className={css.container}>
        <div className={css.top}>
          Client Render Tick: {counter} | Score: {score} | Menu:
          {String(mainMenu.current)}| EndMenu: {String(endMenu.current)} |
          lives: {lives}
        </div>
        <div
          className={css.gamecontainer}
          style={{ backgroundColor: '#7f7f7f' }}
        >
          {Array.from(circles).map((circle) => {
            return (
              <div
                key={circle.id}
                style={{
                  backgroundColor: '#414141',
                  border: 'solid 1px #2c2c2c',
                  width: circle.radius,
                  height: circle.radius,
                  borderRadius: '50%',
                  position: 'absolute',
                  top: circle.y,
                  left: circle.x,
                  transformOrigin: 'center center',
                  transform: `scale(${circle.scale})`,
                }}
              ></div>
            );
          })}
          <div className={css.menucontainer}>
            <div className={css.pause}>GAME OVER</div>
            <div className={css.little}>
              left shift to pause | space to start | right shift to reset
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const [output, setOutput] = useState(menu);

  //controls
  const pauseAndStartMenu = () => {
    mainMenu.current = true;
    setMenuTime(Date.now());
  };
  const startGame = () => {
    setLives(3);
    setCircles([]);
    setCounter(0);
    setScore(0);
    setCircleRadiusSize(400);
    setCircleSpawnSpeed(1000);
    setCircleShrinkSpeed(0.015);
    mainMenu.current = false;
    endMenu.current = false;
    setTime(Date.now());
  };
  const gameOver = () => {
    mainMenu.current = false;
    endMenu.current = true;
    setEndTime(Date.now());
  };

  const resumeGame = () => {
    mainMenu.current = false;
    endMenu.current = false;
    setTime(Date.now());
  };

  useEffect(() => {
    document.addEventListener(
      'keyup',
      (event) => {
        if (event.code === 'ShiftLeft') {
          if (!endMenu.current) pauseAndStartMenu();
        }

        if (event.code === 'Space') {
          if (endMenu.current === true) {
            startGame();
          } else {
            resumeGame();
          }
        }

        if (event.code === 'ShiftRight') {
          gameOver();
        }
      },
      false
    );
  }, []);

  //lib functions

  const removeCircle = (id: number) => {
    const newCircles: CircleData[] = circles.filter(
      (circle) => circle.id != id
    );
    setCircles(newCircles);
  };
  const createCircle = () => {
    return [
      {
        id: circles.length ? circles[circles.length - 1].id + 1 : 1,
        radius: circleRadiusSize,
        x: getRandomInt(1600 - circleRadiusSize),
        y: getRandomInt(900 - circleRadiusSize),
        clicked: false,
        speed: 1,
        hp: 1,
        scale: 1,
      },
    ];
  };
  const addCircles = (newCircles: CircleData[]) => {
    setCircles([...circles, ...newCircles]);
  };
  const decreaseRadius = (oldCircles: CircleData[]) => {
    return oldCircles.map<CircleData>((circle) => {
      return {
        ...circle,
        scale: circle.scale - circleShrinkSpeed,
      };
    });
  };
  const cullingCircles = (oldCircles: CircleData[]) => {
    return oldCircles.filter((circle) => circle.scale > 0.05);
  };
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };
  const clickedCircle = (id: number) => {
    setScore(score + 5);
    removeCircle(id);
  };
  const misClick = () => {
    setScore(score - 20);
  };

  useEffect(() => {
    if (lives <= 0 || score <= -20) {
      gameOver();
    }
  }, [lives, score]);

  //game loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (mainMenu.current || endMenu.current) {
        return () => clearInterval(interval);
      }
      //tick control
      setTime(Date.now());

      //game logic
      setCounter(counter + 1);

      //decrease size of all circles and handle culling them
      //the 50 is locked in
      if (radiusTimer + 50 < Date.now()) {
        const decreasedCircles = decreaseRadius(circles);
        const updatedCircles = cullingCircles(decreasedCircles);
        setCircles(updatedCircles);
        setLives(lives - (decreasedCircles.length - updatedCircles.length));
        setRadiusTimer(Date.now());
      }

      //check if its time to draw a new circle
      if (circleTimer + circleSpawnSpeed < Date.now()) {
        addCircles(createCircle());
        setCircleTimer(Date.now());
      }

      //check if time to change all the rates
      if (circleRadiusSizeTimer + 7000 < Date.now() && circleRadiusSize > 210) {
        setCircleRadiusSize(circleRadiusSize - 15);
        setCircleRadiusSizeTimer(Date.now());
      }
      if (circleSpawnSpeedTimer + 2000 < Date.now() && circleSpawnSpeed > 290) {
        setCircleSpawnSpeed(circleSpawnSpeed - 25);
        setCircleSpawnSpeedTimer(Date.now());
      }
      if (
        circleShrinkSpeedTimer + 25000 < Date.now() &&
        circleRadiusSize < 0.025
      ) {
        setCircleShrinkSpeed(circleShrinkSpeed + 0.005);
        setCircleShrinkSpeedTimer(Date.now());
      }

      //assign to game to draw via setOutput
      game = (
        <div className={css.base}>
          <div className={css.container}>
            <div className={css.top}>
              Client Render Tick: {counter} | Score: {score} | Menu:{' '}
              {String(mainMenu['current'])}| EndMenu:{' '}
              {String(endMenu['current'])} | Lives: {lives}
            </div>
            <div className={css.gamecontainer} onMouseDown={() => misClick()}>
              {Array.from(circles).map((circle) => {
                return (
                  <div
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      clickedCircle(circle.id);
                    }}
                    key={circle.id}
                    style={{
                      backgroundColor: 'purple',
                      border: 'solid 1px red',
                      width: circle.radius,
                      height: circle.radius,
                      borderRadius: '50%',
                      position: 'absolute',
                      top: circle.y,
                      left: circle.x,
                      transformOrigin: 'center center',
                      transform: `scale(${circle.scale})`,
                      zIndex: 2,
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      );

      //draw
      setOutput(game);
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  //main menu
  useEffect(() => {
    const intervalMenu = setInterval(() => {
      if (!mainMenu.current) {
        clearInterval(intervalMenu);
        return;
      }
      //tick control
      setMenuTime(Date.now());

      //game logic

      //draw
      setOutput(menu);
    }, 50);

    return () => {
      clearInterval(intervalMenu);
    };
  }, [menuTime]);

  //end screen
  useEffect(() => {
    const intervalEnd = setInterval(() => {
      if (endMenu.current === false) {
        clearInterval(intervalEnd);
        return;
      }
      //tick control
      setEndTime(Date.now());

      //game logic

      //draw
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
