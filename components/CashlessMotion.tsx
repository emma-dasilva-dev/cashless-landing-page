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

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    let frameId: number | null = null;

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    const MAX_ROTATION = 5;
    const EASING = 0.13;

    const updateTilt = () => {
      currentX += (targetX - currentX) * EASING;
      currentY += (targetY - currentY) * EASING;

      tilt.style.transform = `
        rotateX(${currentX.toFixed(3)}deg)
        rotateY(${currentY.toFixed(3)}deg)
      `;

      const unsettled =
        Math.abs(targetX - currentX) > 0.01 ||
        Math.abs(targetY - currentY) > 0.01;

      if (unsettled) {
        frameId = window.requestAnimationFrame(updateTilt);
      } else {
        frameId = null;
      }
    };

    const requestUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateTilt);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();

      const x =
        (event.clientX - bounds.left) / bounds.width - 0.5;

      const y =
        (event.clientY - bounds.top) / bounds.height - 0.5;

      targetY = x * MAX_ROTATION * 2;
      targetX = -y * MAX_ROTATION * 2;

      requestUpdate();
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;

      requestUpdate();
    };

    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stage.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      stage.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className={styles.cardStage}
      aria-label="Cashless virtual Visa card"
    >
      <div className={styles.cardEntrance}>
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
      </div>

      <div
        className={styles.cardShadow}
        aria-hidden="true"
      />
    </div>
  );
}