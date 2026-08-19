import styles from "@/styles/flowArtwork.module.css";

type FlowArtworkProps = {
  variant: "landing" | "investors";
};

function DotField() {
  const columns = 26;
  const rows = 14;

  const dots = Array.from({ length: columns * rows }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);

    const x = column * 20 + 10;
    const baseY = row * 16 + 14;

    /*
     * Smooth wave distortion.
     * This keeps the field organic instead of looking
     * like a boring perfect grid.
     */
    const wave =
      Math.sin(column * 0.42) * 13 +
      Math.cos(row * 0.58) * 5;

    const y = baseY + wave;

    /*
     * Slight size variation creates depth.
     */
    const radius =
      1.15 +
      ((column + row) % 4) * 0.18;

    return {
      x,
      y,
      radius,
    };
  });

  return (
    <svg
      viewBox="0 0 530 250"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className={styles.dotGroup}>
        {dots.map((dot, index) => (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r={dot.radius}
          />
        ))}
      </g>
    </svg>
  );
}

export default function FlowArtwork({
  variant,
}: FlowArtworkProps) {
  return (
    <div
      className={`${styles.artwork} ${
        variant === "landing"
          ? styles.landing
          : styles.investors
      }`}
      aria-hidden="true"
    >
      <div
        className={`${styles.field} ${styles.fieldTop}`}
      >
        <DotField />
      </div>

      <div
        className={`${styles.field} ${styles.fieldBottom}`}
      >
        <DotField />
      </div>
    </div>
  );
}