import { TargetsCircle } from '../components';
import * as CONFIG from '../lib/TargetsConfig';
import { CircleData, CircleOptions } from '../pages/targets';

export const createCircle = (
  circles: CircleData[],
  circleRadiusSize: number
) => {
  return [
    {
      id: circles.length ? circles[circles.length - 1].id + 1 : 1,
      radius: circleRadiusSize,
      x: getRandomInt(CONFIG.GAME_WIDTH - circleRadiusSize),
      y: getRandomInt(CONFIG.GAME_HEIGHT - circleRadiusSize),
      clicked: false,
      speed: 1,
      hp: 1,
      scale: 1,
    },
  ];
};

export const decreaseRadius = (
  oldCircles: CircleData[],
  circleShrinkSpeed: number
) => {
  return oldCircles.map<CircleData>((circle) => {
    return {
      ...circle,
      scale: circle.scale - circleShrinkSpeed,
    };
  });
};
export const cullingCircles = (oldCircles: CircleData[]) => {
  return oldCircles.filter(
    (circle) => circle.scale > CONFIG.CIRCLE_MININUM_SCALED_SIZE
  );
};
const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const drawCircles = (
  circles: CircleData[],
  options: CircleOptions = { backgroundColor: '', border: '' },
  clickedCircle: (id: number) => void = () => null
) => {
  return Array.from(circles).map((circle) => {
    return (
      <TargetsCircle
        key={circle.id}
        circle={circle}
        clickedCircle={() => {
          clickedCircle(circle.id);
        }}
        backgroundColor={options.backgroundColor}
        borderColor={options.border}
      />
    );
  });
};