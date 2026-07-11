import { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";

/** Animates a numeric value towards `target`, easing between updates. */
export function useAnimatedNumber(target: number, duration = 0.6) {
  const [value, setValue] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    const from = prevRef.current;
    if (from === target) return;
    const controls = animate(from, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(v),
    });
    prevRef.current = target;
    return () => controls.stop();
  }, [target, duration]);

  return value;
}
