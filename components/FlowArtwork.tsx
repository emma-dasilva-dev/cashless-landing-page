import styles from "@/styles/flowArtwork.module.css";

type FlowArtworkProps = {
  variant: "landing" | "investors";
};

export default function FlowArtwork({ variant }: FlowArtworkProps) {
  return (
    <div
      className={`${styles.artwork} ${
        variant === "landing" ? styles.landing : styles.investors
      }`}
      aria-hidden="true"
    >
      <svg
        className={styles.canvas}
        viewBox="0 0 1600 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <g className={`${styles.waveGroup} ${styles.waveTopRight}`}>
          {Array.from({ length: 13 }).map((_, index) => (
            <path
              key={`top-${index}`}
              d={`M 880 ${100 + index * 14}
                  C 1040 ${20 + index * 9},
                    1240 ${170 + index * 5},
                    1590 ${70 + index * 12}`}
            />
          ))}
        </g>

        <g className={`${styles.waveGroup} ${styles.waveMiddleLeft}`}>
          {Array.from({ length: 10 }).map((_, index) => (
            <path
              key={`middle-${index}`}
              d={`M 0 ${500 + index * 13}
                  C 220 ${410 + index * 8},
                    380 ${630 + index * 6},
                    720 ${500 + index * 11}`}
            />
          ))}
        </g>

        <g className={`${styles.waveGroup} ${styles.waveBottomRight}`}>
          {Array.from({ length: 9 }).map((_, index) => (
            <path
              key={`bottom-${index}`}
              d={`M 940 ${820 + index * 10}
                  C 1140 ${740 + index * 7},
                    1320 ${940 + index * 4},
                    1600 ${820 + index * 8}`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
