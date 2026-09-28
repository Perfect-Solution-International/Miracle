import Image from "next/image";

import styles from "./page-background.module.css";

export function PageBackground({
  src,
  unoptimized = false,
}: {
  src: string;
  unoptimized?: boolean;
}) {
  return (
    <div aria-hidden="true" className={styles.background}>
      <Image
        alt=""
        className={styles.image}
        fill
        preload
        sizes="100vw"
        src={src}
        unoptimized={unoptimized}
      />
    </div>
  );
}
