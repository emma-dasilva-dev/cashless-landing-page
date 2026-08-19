type AfricaMarkProps = {
  className?: string;
};

export default function AfricaMark({
  className,
}: AfricaMarkProps) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      role="img"
      aria-label="Africa"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="
          M46 5
          C37 5 30 7 24 11
          L16 16
          L10 24
          L5 34
          L3 43
          L7 51
          L14 56
          L19 63
          L23 72
          L29 78
          L32 88
          L38 99
          L43 111
          L49 115
          L54 109
          L58 99
          L64 91
          L67 81
          L72 73
          L77 65
          L84 59
          L96 53
          L88 47
          L78 46
          L73 40
          L70 31
          L64 24
          L60 15
          L54 8
          C51 6 49 5 46 5
          Z
        "
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}