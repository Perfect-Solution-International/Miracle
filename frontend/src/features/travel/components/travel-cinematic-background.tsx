import Image from "next/image";

import styles from "./travel-cinematic-background.module.css";

/** Decorative background for the Travel & Tourism landing hero only. */
export function TravelCinematicBackground() {
  return (
    <div aria-hidden="true" className={styles.background}>
      <Image
        src="/images/travel/travel-hero-cinematic.png"
        alt=""
        fill
        preload
        unoptimized
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.haze} />
    </div>
  );
}
