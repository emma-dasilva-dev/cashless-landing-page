"use client";

import { useState } from "react";
import styles from "@/styles/landing.module.css";

export default function LogoAnimation() {
  const [hasVideoError, setHasVideoError] = useState(false);

  return (
    <div className={styles.animationStage} aria-label="Cashless brand animation">
      {!hasVideoError ? (
        <video
          className={styles.animationVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setHasVideoError(true)}
        >
          <source src="/animation/cashless-logo-animation.webm" type="video/webm" />
          <source src="/animation/cashless-logo-animation.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className={styles.animationFallback} aria-hidden="true">
          <span className={styles.fallbackShapeOne} />
          <span className={styles.fallbackShapeTwo} />
          <span className={styles.fallbackShapeThree} />
          <strong>cashless</strong>
        </div>
      )}
    </div>
  );
}
