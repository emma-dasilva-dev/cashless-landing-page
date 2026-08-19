"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./CashlessMotion.module.css";

export default function CashlessMotion() {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const tilt = tiltRef.current;

    if (!stage || !tilt) {
      return;
    }

    const precisePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (!precisePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    let animationFrameId: number | null = null;

    let targetRotateX = 0;
    let targetRotateY = 0;

    let currentRotateX = 0;
    let currentRotateY = 0;

    const MAX_ROTATION = 5;
    const SMOOTHING = 0.12;

    const animateTilt = () => {
      currentRotateX +=
        (targetRotateX - currentRotateX) * SMOOTHING;

      currentRotateY +=
        (targetRotateY - currentRotateY) * SMOOTHING;

      tilt.style.transform = `
        rotateX(${currentRotateX.toFixed(3)}deg)
        rotateY(${currentRotateY.toFixed(3)}deg)
      `;

      const stillMoving =
        Math.abs(targetRotateX - currentRotateX) > 0.01 ||
        Math.abs(targetRotateY - currentRotateY) > 0.01;

      if (stillMoving) {
        animationFrameId = window.requestAnimationFrame(animateTilt);
      } else {
        animationFrameId = null;
      }
    };

    const requestTiltFrame = () => {
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(animateTilt);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();

      const pointerX = event.clientX - bounds.left;
      const pointerY = event.clientY - bounds.top;

      const normalizedX = pointerX / bounds.width - 0.5;
      const normalizedY = pointerY / bounds.height - 0.5;

      targetRotateY = normalizedX * MAX_ROTATION * 2;
      targetRotateX = normalizedY * MAX_ROTATION * -2;

      requestTiltFrame();
    };

    const handlePointerLeave = () => {
      targetRotateX = 0;
      targetRotateY = 0;

      requestTiltFrame();
    };

    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", handlePointerLeave);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className={styles.cardStage}
      aria-label="Cashless virtual Visa card"
    >
      <div className={styles.cardFloat}>
        <div ref={tiltRef} className={styles.cardTilt}>
          <Image
            src="/images/cashless-virtual-card.png"
            alt="Cashless virtual Visa card"
            width={1536}
            height={1024}
            priority
            className={styles.cardImage}
          />
        </div>
      </div>

      <div className={styles.cardShadow} aria-hidden="true" />
    </div>
  );
}