'use client';

import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { Layout, TargetsGame, TargetsMenu } from '../components';
import {
  CircleData,
  createCircle,
  cullingCircles,
  decreaseRadius,
  drawCircles,
} from '../lib/Targets';
import * as CONFIG from '../lib/TargetsConfig';

const title: string = 'Ink JQ - Targets';

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
  const [lives, setLives] = useState(CONFIG.DEFAULT_LIVES);

  //how often the objects are ticked
  const [circleTimer, setCircleTimer] = useState(Date.now());
  const [radiusTimer, setRadiusTimer] = useState(Date.now());

  //the magnitude in the attribute's change
  const [circleRadiusSize, setCircleRadiusSize] = useState(
    CONFIG.DEFAULT_STARTING_CIRCLE_RADIUS
  );
  const [circleSpawnSpeed, setCircleSpawnSpeed] = useState(
    CONFIG.DEFAULT_STARTING_SPAWN_SPEED
  );
  const [circleShrinkSpeed, setCircleShrinkSpeed] = useState(
    CONFIG.DEFAULT_STARTING_SHRINK_SPEED
  );

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

  //wrapper functions
  const removeCircle = (id: number) => {
    const newCircles: CircleData[] = circles.filter(
      (circle) => circle.id != id
    );
    setCircles(newCircles);
  };
  const addCircles = (newCircles: CircleData[]) => {
    setCircles([...circles, ...newCircles]);
  };
  const clickedCircle = (id: number) => {
    setScore(score + CONFIG.DEFAULT_SCORE_GAIN);
    removeCircle(id);
  };
  const misClick = () => {
    setScore(score + CONFIG.DEFAULT_MISCLICK_DEDUCTION);
  };

  //scenes and UI
  let menu = (
    <TargetsMenu score={score} lives={lives} clientRenderTick={counter}>
      <TargetsGame
        pauseTitle="TARGETS"
        pauseLitte="left shift to pause | space to start | right shift to reset"
      >
        {drawCircles(circles, {
          backgroundColor: '#414141',
          border: 'solid 1px #2c2c2c',
        })}
      </TargetsGame>
    </TargetsMenu>
  );

  let game = (
    <TargetsMenu score={score} lives={lives} clientRenderTick={counter}>
      <TargetsGame>{drawCircles(circles, {}, clickedCircle)}</TargetsGame>
    </TargetsMenu>
  );

  let end = (
    <TargetsMenu score={score} lives={lives} clientRenderTick={counter}>
      <TargetsGame
        pauseTitle="GAME OVER"
        pauseLitte="left shift to pause | space to start | right shift to reset"
        score={score}
        gameOver={true}
      >
        {drawCircles(circles, {
          backgroundColor: '#414141',
          border: 'solid 1px #2c2c2c',
        })}
      </TargetsGame>
    </TargetsMenu>
  );

  //scene controllers
  const [output, setOutput] = useState(menu);

  const pauseAndStartMenu = () => {
    mainMenu.current = true;
    setMenuTime(Date.now());
  };
  const startGame = () => {
    setLives(3);
    setCircles([]);
    setCounter(0);
    setScore(0);
    setCircleRadiusSize(CONFIG.DEFAULT_STARTING_CIRCLE_RADIUS);
    setCircleSpawnSpeed(CONFIG.DEFAULT_STARTING_SPAWN_SPEED);
    setCircleShrinkSpeed(CONFIG.DEFAULT_STARTING_SHRINK_SPEED);
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

  //controls
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
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
      }
    });
  }, []);

  //game condition checker
  useEffect(() => {
    if (lives <= 0 || score <= CONFIG.DEFAULT_LOW_SCORE_LOSS) {
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
      if (radiusTimer + CONFIG.CIRCLE_RADIUS_SHRINK_TICK_RATE < Date.now()) {
        const decreasedCircles = decreaseRadius(circles, circleShrinkSpeed);
        const updatedCircles = cullingCircles(decreasedCircles);
        setCircles(updatedCircles);
        setLives(lives - (decreasedCircles.length - updatedCircles.length));
        setRadiusTimer(Date.now());
      }

      //check if its time to draw a new circle
      if (circleTimer + circleSpawnSpeed < Date.now()) {
        addCircles(createCircle(circles, circleRadiusSize));
        setCircleTimer(Date.now());
      }

      //check if time to change all the rates
      if (
        circleRadiusSizeTimer + CONFIG.CIRCLE_RADIUS_RATE_DECREASE_TICK_RATE <
          Date.now() &&
        circleRadiusSize > CONFIG.CIRCLE_RADIUS_MININUM_LIMIT
      ) {
        setCircleRadiusSize(circleRadiusSize + CONFIG.CIRCLE_RADIUS_CHANGE);
        setCircleRadiusSizeTimer(Date.now());
      }
      if (
        circleSpawnSpeedTimer +
          CONFIG.CIRCLE_SPAWN_SPEED_RATE_DECREASE_TICK_RATE <
          Date.now() &&
        circleSpawnSpeed > CONFIG.CIRCLE_SPAWN_SPEED_MININUM_LIMIT
      ) {
        setCircleSpawnSpeed(
          circleSpawnSpeed + CONFIG.CIRCLE_SPAWN_SPEED_CHANGE
        );
        setCircleSpawnSpeedTimer(Date.now());
      }
      if (
        circleShrinkSpeedTimer +
          CONFIG.CIRCLE_SHRINK_SPEED_RATE_DECREASE_TICK_RATE <
          Date.now() &&
        circleRadiusSize < CONFIG.CIRCLE_SHRINK_SPEED_MININUM_LIMIT
      ) {
        setCircleShrinkSpeed(
          circleShrinkSpeed + CONFIG.CIRCLE_SHRINK_SPEED_CHANGE
        );
        setCircleShrinkSpeedTimer(Date.now());
      }

      //assign to game to draw via setOutput
      game = (
        <TargetsMenu score={score} lives={lives} clientRenderTick={counter}>
          <TargetsGame menuActive={false} misClick={misClick}>
            {drawCircles(circles, {}, clickedCircle)}
          </TargetsGame>
        </TargetsMenu>
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
