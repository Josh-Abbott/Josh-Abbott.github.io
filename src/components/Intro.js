import React, { useRef, useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import "../styles/Intro.css";

const GRID_WIDTH = 40;
const GRID_HEIGHT = 30;
const CELL_SIZE = 40;
const SPEED = 75;
const INITIAL_SNAKE = [[10, 10], [9, 10], [8, 10]];

const generateRandomTarget = () => {
  const buffer = 6;
  return [
    Math.floor(Math.random() * (GRID_WIDTH - 2 * buffer)) + buffer,
    Math.floor(Math.random() * (GRID_HEIGHT - 2 * buffer)) + buffer,
  ];
};

function Intro({ setShowNavbar, autoCompleteIntro }) {
  const canvasRef = useRef(null);
  const snakeRef = useRef([...INITIAL_SNAKE]);
  const targetRef = useRef(generateRandomTarget());
  const pathRef = useRef([]);
  const growAmountRef = useRef(0);
  const offsetRef = useRef({ x: 0, y: 0 });

  const textRef = useRef(null);
  const introRef = useRef(null);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [zoomStarted, setZoomStarted] = useState(false);
  const prevScrollY = useRef(0);

  const lastUpdateTimeRef = useRef(0);
  const animationFrameIdRef = useRef();

  const [introComplete, setIntroComplete] = useState(false);
  const [enableSnake, setEnableSnake] = useState(true);

  const getTarget = () => targetRef.current;

  useEffect(() => {
    setEnableSnake(!introComplete);
  }, [introComplete]);

  // breadth first search algorithm for pathfinding
  const bfs = (start, goal, body) => {
    const queue = [[start]];
    const visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0) {
      const path = queue.shift();
      const [x, y] = path[path.length - 1];

      if (x === goal[0] && y === goal[1]) return path;

      const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];

      for (const [nx, ny] of neighbors) {
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

  // performance testing, might add for zoom
  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();

    const fpsCheck = (now) => {
      frameCount++;
      if (now - startTime < 1000) {
        requestAnimationFrame(fpsCheck);
      } else {
        const fps = (frameCount * 1000) / (now - startTime);

        const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        const lowThreads =
          navigator.hardwareConcurrency &&
          navigator.hardwareConcurrency < 4;

        if (fps < 40 || lowMemory || lowThreads) {
          setEnableSnake(false);
        } else {
          setEnableSnake(true);
        }
      }
    };

    requestAnimationFrame(fpsCheck);
  }, []);

  // Snake game loop
  useEffect(() => {
    if (!enableSnake) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let targetsEaten = 0;
    let isResetting = false;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const gridWidthPx = GRID_WIDTH * CELL_SIZE;
      const gridHeightPx = GRID_HEIGHT * CELL_SIZE;

      offsetRef.current = {
        x: (canvas.width - gridWidthPx) / 2,
        y: (canvas.height - gridHeightPx) / 2,
      };
    };

    const fadeCanvas = async (fadeOut = true) => {
      return new Promise((resolve) => {
        const duration = 600;
        canvas.style.transition = `opacity ${duration}ms ease-in-out`;
        canvas.style.opacity = fadeOut ? 0 : 1;
        setTimeout(() => resolve(), duration);
      });
    };

     const moveSnake = async () => {
      if (isResetting) return;

      const snake = snakeRef.current;
      const head = snake[0];
      const target = getTarget();

      if (
        pathRef.current.length === 0 ||
        !pathRef.current.some(([x, y]) => x === target[0] && y === target[1])
      ) {
        const path = bfs(head, target, snake.slice(0, -1));
        if (path) pathRef.current = path.slice(1);
        else return;
      }

      const [nextX, nextY] = pathRef.current.shift();
      snake.unshift([nextX, nextY]);

      if (growAmountRef.current > 0) {
        growAmountRef.current -= 1;
      } else {
        snake.pop();
      }

      if (nextX === target[0] && nextY === target[1]) {
        growAmountRef.current = 2;
        targetsEaten++;

        let newTarget;
        do {
          newTarget = generateRandomTarget();
        } while (
          snake.some(([sx, sy]) => sx === newTarget[0] && sy === newTarget[1])
        );

        targetRef.current = newTarget;

        const newPath = bfs([nextX, nextY], newTarget, snake.slice(0, -1));
        if (newPath) pathRef.current = newPath.slice(1);
      }

      if (targetsEaten >= 6) {
        isResetting = true;
        await fadeCanvas(true);

        snakeRef.current = [...INITIAL_SNAKE];
        targetRef.current = generateRandomTarget();
        pathRef.current = [];
        growAmountRef.current = 0;
        targetsEaten = 0;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // redraw (fading in)
        const offset = offsetRef.current;
        for (let [x, y] of snakeRef.current) {
          ctx.fillStyle = "rgba(79, 103, 150, 0.6)";
          ctx.fillRect(
            offset.x + x * CELL_SIZE,
            offset.y + y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
        }
        const [tx, ty] = getTarget();
        ctx.strokeStyle = "#4f6796";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          offset.x + tx * CELL_SIZE,
          offset.y + ty * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );

        await fadeCanvas(false);
        isResetting = false;
        return;
      }

      // drawing the snake
      const offset = offsetRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let [x, y] of snake) {
        ctx.fillStyle = "rgba(79, 103, 150, 0.6)";
        ctx.fillRect(
          offset.x + x * CELL_SIZE,
          offset.y + y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }

      const [tx, ty] = getTarget();
      ctx.strokeStyle = "#4f6796";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        offset.x + tx * CELL_SIZE,
        offset.y + ty * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    };

    const gameLoop = (timestamp) => {
      if (timestamp - lastUpdateTimeRef.current >= SPEED) {
        lastUpdateTimeRef.current = timestamp;
        moveSnake();
      }
      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    canvas.style.opacity = 1;
    canvas.style.transition = "opacity 0.5s ease-in-out";

    animationFrameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [enableSnake]);

  useEffect(() => {
    // intro animation
    let fakeScrollY = 0;
    let touchStartY = 0;
    const introEl = introRef.current;
    const textEl = textRef.current;

    const targetScrollDistance = 1000;

    const updateZoom = (scrollFraction, scrollDirection) => {
      const easedFraction = scrollFraction ** 5;
      const scale = 1 + easedFraction * 200;

      if (textEl) {
        textEl.style.transform = `scale(${scale})`;
        textEl.style.transition = "transform 0.1s ease-out";
      }

      if (scrollFraction > 0 && !zoomStarted) {
        setZoomStarted(true);
      }

      if (scrollFraction >= 1 && scrollLocked) {
        const element = document.getElementById("about");
        if (element) element.scrollIntoView({ behavior: "smooth" });

        setShowNavbar(true);

        introRef.current.classList.add("intro-complete");

        setTimeout(() => {
          setIntroComplete(true);
        }, 250); // enough to trigger transition

        setTimeout(() => {
          document.body.style.overflow = "";
          setScrollLocked(false);
        }, 1000);

        window.removeEventListener("wheel", handleFakeScroll, { passive: false });
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
      }

      if (scrollDirection === "up" && scrollFraction < 0.1 && zoomStarted) {
        setZoomStarted(false);
      }
    };

    let ticking = false;

    const handleFakeScroll = (e) => {
      if (!introEl || !scrollLocked) return;
      e.preventDefault();

      fakeScrollY = Math.max(0, fakeScrollY + e.deltaY);
      const scrollFraction = Math.min(fakeScrollY / targetScrollDistance, 1);
      const scrollDirection =
        fakeScrollY < prevScrollY.current ? "up" : "down";
      prevScrollY.current = fakeScrollY;

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
      fakeScrollY = Math.max(0, fakeScrollY + deltaY);
      touchStartY = currentY;

      const scrollFraction = Math.min(fakeScrollY / targetScrollDistance, 1);
      updateZoom(scrollFraction);
    };

    if (autoCompleteIntro && scrollLocked) {
      if (textEl) {
        textEl.style.transform = "scale(1000)";
        textEl.style.transition = "transform 0.1s ease-out";
      }

      setShowNavbar(true);
      setScrollLocked(false);
      setZoomStarted(true);
      setIntroComplete(true);
      document.body.style.overflow = "";

      window.removeEventListener("wheel", handleFakeScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    }

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

  useEffect(() => {
    // intro animation reset when scrolling back up
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
        setIntroComplete(false);
        setEnableSnake(true);
      }
    };
    window.addEventListener("scroll", handleScrollBack);
    return () => window.removeEventListener("scroll", handleScrollBack);
  }, [zoomStarted, setShowNavbar, setScrollLocked, setIntroComplete, setEnableSnake]);

  useEffect(() => {
    // resolve mid page loading intro issue
    const timeout = setTimeout(() => {
      if (scrollLocked && window.scrollY > 100) {
        const textEl = textRef.current;

        setShowNavbar(true);
        setScrollLocked(false);
        setZoomStarted(true);
        setIntroComplete(true);
        setEnableSnake(false);
        document.body.style.overflow = "";
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`intro-container ${introComplete ? "intro-complete" : ""}`}
      ref={introRef}
    >
      <div className="snake-background">
        {enableSnake && <canvas ref={canvasRef} />}
        <div className="glass-overlay" />
      </div>

      {!introComplete && (
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
      )}
    </div>
  );
}

export default Intro;