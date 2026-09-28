import styles from "./animated-circuit-background.module.css";

const traces = [
  "M-80 130 H220 V245 H430 V170 H680",
  "M-60 430 H135 V345 H310 V525 H570",
  "M-70 730 H250 V650 H475 V810 H710",
  "M100 1060 V845 H330 V720 H505",
  "M310 -70 V110 H520 V305 H780 V385 H1010",
  "M620 -60 V145 H815 V255 H1050 V100 H1410",
  "M805 1070 V850 H1030 V665 H1290 V760 H1660",
  "M900 -80 V100 H1140 V325 H1380 V440 H1680",
  "M1180 1060 V880 H1410 V625 H1680",
  "M1610 160 H1325 V260 H1110 V480 H825",
  "M1650 570 H1425 V480 H1190 V595 H955",
  "M1540 -60 V85 H1290 V195 H1100",
  "M450 1060 V920 H635 V710 H850 V590 H1080",
  "M-40 255 H160 V180 H355 V70 H595",
  "M-40 555 H235 V455 H450 V350 H690",
  "M1720 900 H1490 V805 H1240 V950 H995",
];

const signals = [
  { path: traces[0], duration: 11.3, delay: -3.2 },
  { path: traces[3], duration: 14.7, delay: -9.1 },
  { path: traces[5], duration: 12.9, delay: -6.8 },
  { path: traces[7], duration: 16.1, delay: -1.7 },
  { path: traces[10], duration: 10.9, delay: -7.4 },
  { path: traces[12], duration: 13.7, delay: -4.6 },
];

const nodes = [
  [220, 130],
  [430, 245],
  [135, 430],
  [310, 525],
  [250, 730],
  [475, 810],
  [520, 110],
  [780, 305],
  [815, 145],
  [1050, 255],
  [1030, 850],
  [1290, 665],
  [1140, 100],
  [1380, 325],
  [1410, 880],
  [1325, 160],
  [1110, 260],
  [1425, 570],
  [1190, 480],
  [1290, 85],
  [635, 920],
  [850, 710],
  [160, 255],
  [450, 455],
  [1240, 805],
] as const;

const blocks = [
  { x: 80, y: 65, width: 165, height: 110, type: "chip" },
  { x: 385, y: 205, width: 148, height: 112, type: "server" },
  { x: 645, y: 75, width: 190, height: 130, type: "chip" },
  { x: 1080, y: 185, width: 180, height: 116, type: "network" },
  { x: 1370, y: 45, width: 170, height: 118, type: "server" },
  { x: -25, y: 495, width: 175, height: 130, type: "network" },
  { x: 270, y: 570, width: 180, height: 125, type: "chip" },
  { x: 690, y: 385, width: 205, height: 142, type: "network" },
  { x: 990, y: 560, width: 165, height: 130, type: "server" },
  { x: 1375, y: 480, width: 180, height: 132, type: "chip" },
  { x: 500, y: 790, width: 170, height: 120, type: "server" },
  { x: 1130, y: 810, width: 175, height: 125, type: "network" },
] as const;

function CircuitBlock({
  x,
  y,
  width,
  height,
  type,
  index,
}: (typeof blocks)[number] & { index: number }) {
  const active = index === 2 || index === 7 || index === 9;

  return (
    <g
      className={active ? styles.activeBlock : styles.block}
      style={{
        animationDelay: `${-index * 1.73}s`,
        animationDuration: `${7.1 + index * 0.43}s`,
      }}
      transform={`translate(${x} ${y})`}
    >
      <rect
        x="7"
        y="13"
        width={width}
        height={height}
        rx="19"
        fill="#aebbc9"
        opacity="0.5"
      />
      <rect x="4" y="8" width={width} height={height} rx="19" fill="#d8dee8" />
      <rect
        width={width}
        height={height}
        rx="18"
        fill="#fff"
        stroke="#b8c4d1"
        strokeWidth="2"
      />
      <rect
        x="12"
        y="12"
        width={width - 24}
        height={height - 24}
        rx="12"
        fill="#f1f4f7"
        stroke="#d8dee8"
      />
      {type === "chip" ? (
        <>
          <rect
            x={width * 0.28}
            y={height * 0.23}
            width={width * 0.44}
            height={height * 0.54}
            rx="10"
            fill="#fff"
            stroke="#b8c4d1"
            strokeWidth="2"
          />
          <rect
            x={width * 0.36}
            y={height * 0.34}
            width={width * 0.28}
            height={height * 0.32}
            rx="5"
            fill="#e5e9ef"
          />
          {[0.32, 0.44, 0.56, 0.68].map((part) => (
            <g key={part} stroke="#b8c4d1" strokeWidth="3" strokeLinecap="round">
              <path d={`M${width * part} 15 V${height * 0.23}`} />
              <path d={`M${width * part} ${height * 0.77} V${height - 15}`} />
            </g>
          ))}
        </>
      ) : type === "server" ? (
        <>
          {[0.25, 0.45, 0.65].map((part) => (
            <g key={part}>
              <rect
                x="25"
                y={height * part}
                width={width - 50}
                height="12"
                rx="6"
                fill="#fff"
                stroke="#b8c4d1"
              />
              <circle cx={width - 38} cy={height * part + 6} r="3" fill="#b8c4d1" />
            </g>
          ))}
        </>
      ) : (
        <>
          <path
            d={`M${width * 0.25} ${height * 0.64} L${width * 0.48} ${height * 0.34} L${width * 0.74} ${height * 0.62}`}
            fill="none"
            stroke="#b8c4d1"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle
            cx={width * 0.25}
            cy={height * 0.64}
            r="9"
            fill="#fff"
            stroke="#aebbc9"
            strokeWidth="2"
          />
          <circle
            cx={width * 0.48}
            cy={height * 0.34}
            r="9"
            fill="#fff"
            stroke="#aebbc9"
            strokeWidth="2"
          />
          <circle
            cx={width * 0.74}
            cy={height * 0.62}
            r="9"
            fill="#fff"
            stroke="#aebbc9"
            strokeWidth="2"
          />
        </>
      )}
    </g>
  );
}

export function AnimatedCircuitBackground() {
  return (
    <div aria-hidden="true" className={styles.background}>
      <svg
        className={styles.board}
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="it-circuit-grid"
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            <path d="M72 0 H0 V72" fill="none" stroke="#d8dee8" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="#b8c4d1" />
          </pattern>
        </defs>
        <rect width="1600" height="1000" fill="#f1f4f7" />
        <rect width="1600" height="1000" fill="url(#it-circuit-grid)" opacity="0.72" />
        <g className={styles.distantLayer} fill="none" stroke="#d8dee8" strokeWidth="4">
          <path d="M-80 45 H460 V-60 M1650 340 H1460 V95 H1050 M-50 920 H290 V1040 M1670 965 H1120 V1070" />
        </g>
        <g
          fill="none"
          stroke="#b8c4d1"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {traces.map((path) => (
            <path d={path} key={path} />
          ))}
        </g>
        <g fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
          {traces.map((path) => (
            <path d={path} key={path} />
          ))}
        </g>
        {signals.map(({ path, duration, delay }) => (
          <path
            className={styles.signal}
            d={path}
            fill="none"
            key={`${path}-signal`}
            pathLength="100"
            stroke="#60a5fa"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
          />
        ))}
        {nodes.map(([x, y], index) => (
          <g
            className={styles.node}
            key={`${x}-${y}`}
            style={{
              animationDelay: `${-index * 1.19}s`,
              animationDuration: `${5.3 + (index % 5) * 1.47}s`,
            }}
          >
            <circle cx={x} cy={y} r="12" fill="#d8dee8" />
            <circle cx={x} cy={y} r="7" fill="#fff" stroke="#aebbc9" strokeWidth="2" />
            <circle className={styles.nodeLight} cx={x} cy={y} r="3" fill="#60a5fa" />
          </g>
        ))}
        {blocks.map((block, index) => (
          <CircuitBlock {...block} index={index} key={`${block.x}-${block.y}`} />
        ))}
      </svg>
    </div>
  );
}
