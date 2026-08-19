import styles from "@/styles/flowArtwork.module.css";

type FlowArtworkProps = {
  variant: "landing" | "investors";
};

function WaveLines() {
  return (
    <svg
      viewBox="0 0 520 240"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {Array.from({ length: 11 }).map((_, index) => {
        const y = 26 + index * 14;

        return (
          <path
            key={index}
            d={`M -20 ${y}
                C 90 ${y - 56},
                  180 ${y + 48},
                  290 ${y}
                S 460 ${y - 42},
                  550 ${y + 6}`}
          />
        );
      })}
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
      <div className={`${styles.wave} ${styles.waveTop}`}>
        <WaveLines />
      </div>

      <div className={`${styles.wave} ${styles.waveBottom}`}>
        <WaveLines />
      </div>
    </div>
  );
}
