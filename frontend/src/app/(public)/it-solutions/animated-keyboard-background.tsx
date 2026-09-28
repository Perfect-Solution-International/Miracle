"use client";

import { useEffect, useState } from "react";

import styles from "./animated-keyboard-background.module.css";

type Key = { label: string; width?: number };

const rows: readonly (readonly Key[])[] = [
  [
    { label: "Esc", width: 1.3 },
    ...["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].map(
      (label) => ({ label }),
    ),
    { label: "Del", width: 1.3 },
  ],
  [
    { label: "~" },
    ..."1234567890".split("").map((label) => ({ label })),
    { label: "-" },
    { label: "=" },
    { label: "Backspace", width: 2 },
  ],
  [
    { label: "Tab", width: 1.6 },
    ..."QWERTYUIOP".split("").map((label) => ({ label })),
    { label: "[" },
    { label: "]" },
    { label: "\\", width: 1.6 },
  ],
  [
    { label: "Caps", width: 1.9 },
    ..."ASDFGHJKL".split("").map((label) => ({ label })),
    { label: ";" },
    { label: "'" },
    { label: "Enter", width: 2.3 },
  ],
  [
    { label: "Shift", width: 2.4 },
    ..."ZXCVBNM".split("").map((label) => ({ label })),
    { label: "," },
    { label: "." },
    { label: "/" },
    { label: "Shift", width: 2.8 },
  ],
  [
    { label: "Ctrl", width: 1.4 },
    { label: "Alt", width: 1.4 },
    { label: "Cmd", width: 1.5 },
    { label: "Space", width: 7.2 },
    { label: "Cmd", width: 1.5 },
    { label: "Alt", width: 1.4 },
    { label: "Ctrl", width: 1.4 },
  ],
];

const keyIds = rows.flatMap((row, rowIndex) =>
  row.map((_, keyIndex) => `${rowIndex}-${keyIndex}`),
);

export function AnimatedKeyboardBackground() {
  const [pressedKeys, setPressedKeys] = useState<ReadonlySet<string>>(() => new Set());

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers = new Set<number>();
    let lastKeys: string[] = [];

    function schedule(callback: () => void, delay: number) {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
    }

    function pressKeys() {
      if (motionPreference.matches) return;

      const count =
        Math.random() < 0.65
          ? 1
          : Math.random() < 0.8
            ? 2
            : 3 + Math.floor(Math.random() * 2);
      const available = keyIds.filter((id) => !lastKeys.includes(id));
      const nextKeys: string[] = [];

      for (let index = 0; index < count; index += 1) {
        const choice = Math.floor(Math.random() * available.length);
        nextKeys.push(available.splice(choice, 1)[0]!);
      }

      lastKeys = nextKeys;
      setPressedKeys((current) => new Set([...current, ...nextKeys]));
      schedule(
        () => {
          setPressedKeys((current) => {
            const remaining = new Set(current);
            nextKeys.forEach((id) => remaining.delete(id));
            return remaining;
          });
        },
        130 + Math.random() * 90,
      );
      schedule(pressKeys, 190 + Math.random() * 320);
    }

    function handleMotionPreference() {
      timers.forEach(window.clearTimeout);
      timers.clear();
      setPressedKeys(new Set());
      if (!motionPreference.matches) schedule(pressKeys, 350);
    }

    motionPreference.addEventListener("change", handleMotionPreference);
    handleMotionPreference();

    return () => {
      motionPreference.removeEventListener("change", handleMotionPreference);
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <div aria-hidden="true" className={styles.background}>
      <div className={styles.keyboard}>
        {rows.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex}>
            {row.map((key, keyIndex) => {
              const id = `${rowIndex}-${keyIndex}`;
              return (
                <span
                  className={`${styles.key} ${pressedKeys.has(id) ? styles.pressed : ""}`}
                  key={id}
                  style={{ flexGrow: key.width ?? 1 }}
                >
                  {key.label}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
