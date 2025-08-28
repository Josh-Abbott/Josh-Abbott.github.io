import React, { useRef, useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import "../styles/Intro.css";

const GRID_WIDTH = 40;
const GRID_HEIGHT = 30;
const CELL_SIZE = 40;
const SPEED = 75;
const INITIAL_SNAKE = [[10, 10], [9, 10], [8, 10]]; // can randomize?

const generateRandomTarget = () => {
  const buffer = 6;
  return [
    Math.floor(Math.random() * (GRID_WIDTH - 2 * buffer)) + buffer,
    Math.floor(Math.random() * (GRID_HEIGHT - 2 * buffer)) + buffer,
  ];
};

// breadth first search algorithm for pathfinding
const bfs = (start, goal, body) => {
  const queue = [[start]];
  const visited = new Set([start.toString()]);

  while (queue.length > 0) {
    const path = queue.shift();
    const [x, y] = path[path.length - 1];

    if (x === goal[0] && y === goal[1]) return path;

    for (const [nx, ny] of [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]) {
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < GRID_WIDTH &&
        ny < GRID_HEIGHT &&
        !body.some(([bx, by]) => bx === nx && by === ny) &&
        !visited.has([nx, ny].toString())
      ) {
        visited.add([nx, ny].toString());
        queue.push([...path, [nx, ny]]);
      }
    }
  }
  return null;
};

function useSnakeCanvas(canvasRef) {
  const snakeRef = useRef([...INITIAL_SNAKE]);
  const targetRef = useRef(generateRandomTarget());
  const pathRef = useRef([]);
  const growAmountRef = useRef(0);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let targetsEaten = 0;
    let isResetting = false;
    let lastTime = 0;
    let rafId;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const gridWidthPx = GRID_WIDTH * CELL_SIZE;
      const gridHeightPx = GRID_HEIGHT * CELL_SIZE;

      // store offset to center grid in canvas
      offsetRef.current = {
        x: (canvas.width - gridWidthPx) / 2,
        y: (canvas.height - gridHeightPx) / 2,
      };
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCanvasSize, 150);
    };

    updateCanvasSize();
    window.addEventListener("resize", handleResize);

    const renderSnake = (snake, target) => {
      const offset = offsetRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // snake
      ctx.fillStyle = "rgba(79, 103, 150, 0.6)";
      for (let [x, y] of snake) {
        ctx.fillRect(offset.x + x * CELL_SIZE, offset.y + y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }

      // target
      const [tx, ty] = target;
      ctx.strokeStyle = "#4f6796";
      ctx.lineWidth = 2;
      ctx.strokeRect(offset.x + tx * CELL_SIZE, offset.y + ty * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    };

    const updateSnake = () => {
      if (isResetting) return;
      const snake = snakeRef.current;
      const head = snake[0];
      const target = targetRef.current;

      if (pathRef.current.length === 0) {
        const path = bfs(head, target, snake.slice(0, -1));
        if (path) pathRef.current = path.slice(1);
        else return;
      }

      const [nextX, nextY] = pathRef.current.shift();
      snake.unshift([nextX, nextY]);

      if (growAmountRef.current > 0) growAmountRef.current -= 1;
      else snake.pop();

      // when target eaten (grow + new target)
      if (nextX === target[0] && nextY === target[1]) {
        growAmountRef.current = 2;
        targetsEaten++;
        let newTarget;
        do {
          newTarget = generateRandomTarget();
        } while (snake.some(([sx, sy]) => sx === newTarget[0] && sy === newTarget[1]));
        targetRef.current = newTarget;
        const newPath = bfs([nextX, nextY], newTarget, snake.slice(0, -1));
        if (newPath) pathRef.current = newPath.slice(1);
      }

      // RESETTING WHEN 6 EATEN
      if (targetsEaten >= 6) {
        isResetting = true;
        snakeRef.current = [...INITIAL_SNAKE];
        targetRef.current = generateRandomTarget();
        pathRef.current = [];
        growAmountRef.current = 0;
        targetsEaten = 0;
        isResetting = false;
      }

      renderSnake(snake, targetRef.current);
    };

    const loop = (time) => {
      if (time - lastTime > SPEED) {
        updateSnake();
        lastTime = time;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);
}

function Intro({ setShowNavbar, autoCompleteIntro }) {
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const introRef = useRef(null);

  const [scrollLocked, setScrollLocked] = useState(true);
  const [zoomStarted, setZoomStarted] = useState(false);

  const fakeScrollYRef = useRef(0);
  const prevFakeScrollYRef = useRef(0);

  useSnakeCanvas(canvasRef);

  useEffect(() => {
    const introEl = introRef.current;
    const textEl = textRef.current;
    if (!textEl || !introEl) return;

    const targetScrollDistance = 1000;
    let ticking = false;
    let touchStartY = 0;

    const updateZoom = (scrollFraction, scrollDirection) => {
      const easedFraction = scrollFraction ** 5;
      const scale = 1 + easedFraction * 200;
      textEl.style.transition = "transform 0.1s ease-out";
      textEl.style.transform = `scale(${scale})`;

      if (scrollFraction > 0 && !zoomStarted) setZoomStarted(true);

       // finished zoom
      if (scrollFraction >= 1 && scrollLocked) {
        const element = document.getElementById("about");
        if (element) element.scrollIntoView({ behavior: "smooth" });

        setShowNavbar(true);
        textEl.style.transform = "scale(1000)";

        setTimeout(() => {
          document.body.style.overflow = "";
          setScrollLocked(false);
          setZoomStarted(true);
        }, 1000);

        window.removeEventListener("wheel", handleFakeScroll, { passive: false });
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
      }

      if (scrollDirection === "up" && scrollFraction < 0.1 && zoomStarted) {
        setZoomStarted(false);
      }
    };

    const handleFakeScroll = (e) => {
      if (!scrollLocked) return;
      e.preventDefault();
      fakeScrollYRef.current = Math.max(0, fakeScrollYRef.current + e.deltaY);
      const scrollFraction = Math.min(fakeScrollYRef.current / targetScrollDistance, 1);
      const scrollDirection = fakeScrollYRef.current < prevFakeScrollYRef.current ? "up" : "down";
      prevFakeScrollYRef.current = fakeScrollYRef.current;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateZoom(scrollFraction, scrollDirection);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleTouchStart = (e) => {
      if (!scrollLocked) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!scrollLocked) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      fakeScrollYRef.current = Math.max(0, fakeScrollYRef.current + deltaY);
      touchStartY = currentY;
      const scrollFraction = Math.min(fakeScrollYRef.current / targetScrollDistance, 1);
      updateZoom(scrollFraction);
    };

    // if page loaded while outside of intro, auto complete intro
    if (autoCompleteIntro && scrollLocked) {
      textEl.style.transform = "scale(1000)";
      textEl.style.transition = "transform 0.1s ease-out";
      setShowNavbar(true);
      setScrollLocked(false);
      setZoomStarted(true);
      document.body.style.overflow = "";
      return;
    }

    // when locked, prevent page scroll and use fake scroll listeners
    if (scrollLocked) {
      document.body.style.overflow = "hidden";
      window.addEventListener("wheel", handleFakeScroll, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: false });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", handleFakeScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [scrollLocked, zoomStarted, setShowNavbar, autoCompleteIntro]);

  // reset intro when user scrolls back up near top after zoom played
  useEffect(() => {
    if (!zoomStarted) return;

    let lastScrollY = window.scrollY;

    const handleScrollBack = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      lastScrollY = currentScrollY;
      const isNearTop = currentScrollY < 75;

      if (scrollingUp && isNearTop) {
        const textEl = textRef.current;
        if (textEl) {
          textEl.style.transition = "none";
          textEl.style.transform = "scale(201)";

          requestAnimationFrame(() => {
            textEl.style.transition = "transform 0.3s ease-out";
            textEl.style.transform = "scale(1)";
          });
        }

        setScrollLocked(true);
        setZoomStarted(false);
        setShowNavbar(false);

        document.body.style.overflow = "hidden";
      }
    };

    window.addEventListener("scroll", handleScrollBack);
    return () => window.removeEventListener("scroll", handleScrollBack);
  }, [zoomStarted, setShowNavbar]);

  return (
    <div className="intro-container" ref={introRef}>
      <div className="snake-background">
        <canvas ref={canvasRef} />
        <div className="glass-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <h1 className="intro-text zooming-text" ref={textRef}>
          {zoomStarted ? (
            "Hello, I'm Josh."
          ) : (
            <ReactTyped
              strings={["Hello, I'm Josh.", ""]}
              typeSpeed={80}
              backSpeed={50}
              backDelay={2000}
              loop
            />
          )}
        </h1>
      </motion.div>
    </div>
  );
}

export default Intro;
