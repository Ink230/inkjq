## InkJQ Side-Projects

A presented collection of side-projects I use to learn and have fun with in React/NextJS. Below are some brief descriptions of the side-projects.

### Targets

Click the circles before they disappear and get a high score!

The challenge was to produce a responsive DOM-based game with high interaction frequency without using canvas or WebGL. Further, keeping the game logic independent of the browser FPS was also required. The approach for these two objectives was to use useEffect with setInterval, which after configuring, seemed to provide a natural game-like development environment as a 'pseudo game engine'.

v2 Roadmap:

- User configurable options for spawn speed, shrink speed and radius sizing
- Powerups like score multipliers, misclick-no-more and freeze states
- Buffed circles with different HP levels and special behaviours
