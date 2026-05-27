
import { useState } from "react";

export interface SimUser {
  level: number;
  xp: number;
}

export function useSimulatedUser(startLevel = 1, startXP = 0) {
  const [user, setUser] = useState<SimUser>({ level: startLevel, xp: startXP });

  const updateXP = (xpDelta: number) => {
    setUser((prev) => {
      const newXP = prev.xp + xpDelta;
      const newLevel = prev.level + Math.floor(newXP / 1000);
      return { xp: newXP % 1000, level: newLevel };
    });
  };

  return { user, updateXP };
}
