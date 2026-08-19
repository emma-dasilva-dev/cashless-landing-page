import styles from "@/styles/flowArtwork.module.css";

type FlowArtworkProps = {
  variant: "landing" | "investors";
};

function DigitalField() {
  const nodes = [
    [34,42],[61,32],[91,51],[122,37],[151,62],[184,43],[216,68],[247,49],
    [278,76],[310,55],[343,84],[375,63],[408,91],[441,70],[472,99],
    [48,91],[80,111],[112,86],[145,121],[177,98],[210,132],[242,108],
    [274,143],[307,119],[340,151],[372,126],[405,160],[438,137],[468,169],
    [69,157],[102,177],[135,151],[168,187],[201,164],[234,196],[267,171],
    [300,204],[333,178],[366,211],[399,185],[432,218]
  ];

  return (
    <svg viewBox="0 0 520 250" fill="none" aria-hidden="true" focusable="false">
      <g className={styles.connections}>
        <path d="M34 42L91 51L145 121L210 132L274 143L340 151L405 160L468 169" />
        <path d="M61 32L122 37L184 43L247 49L310 55L375 63L441 70" />
        <path d="M48 91L112 86L177 98L242 108L307 119L372 126L438 137" />
        <path d="M69 157L135 151L201 164L267 171L333 178L399 185" />
        <path d="M102 177L168 187L234 196L300 204L366 211L432 218" />
        <path d="M91 51L112 86L135 151L168 187" />
        <path d="M184 43L177 98L201 164L234 196" />
        <path d="M278 76L274 143L267 171L300 204" />
        <path d="M343 84L340 151L333 178L366 211" />
        <path d="M408 91L405 160L399 185L432 218" />
      </g>
      <g className={styles.nodes}>
        {nodes.map(([cx, cy], index) => (
          <circle key={index} cx={cx} cy={cy} r={index % 7 === 0 ? 2.2 : 1.45} />
        ))}
      </g>
    </svg>
  );
}

export default function FlowArtwork({ variant }: FlowArtworkProps) {
  return (
    <div
      className={`${styles.artwork} ${
        variant === "landing" ? styles.landing : styles.investors
      }`}
      aria-hidden="true"
    >
      <div className={`${styles.field} ${styles.fieldTop}`}>
        <DigitalField />
      </div>
      <div className={`${styles.field} ${styles.fieldBottom}`}>
        <DigitalField />
      </div>
    </div>
  );
}
