# AlgoSpark Deep Dive Guide

This document presents a technical deep dive into the specialized feature mechanics, AI prompting strategies, micro-interaction design, and user streak computation algorithms implemented in **AlgoSpark (DSA-Ditcher)**.

---

## 🔥 1. Real-Time Active Streak Tracking Mechanics

AlgoSpark gamifies coding practice by tracking continuous daily practice streaks across both logged-in full-stack users and guest sessions.

### Backend Mongoose User Model Schema
In [`backend/models/User.js`](file:///c:/Users/91836/Downloads/Mern-Ai-Projects/Dsa-Ditcher/backend/models/User.js):
```javascript
{
  streak: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: null }
}
```

### Controller Recalculation Algorithm (`userController.js`)
When a user updates problem stats or logs activity:
1. **Same-Day Action**: If `lastActiveDate` falls on today's calendar date, `streak` remains untouched (prevents double-counting).
2. **Consecutive-Day Action**: If `lastActiveDate` was yesterday, `streak` increments by `1` and `lastActiveDate` updates to `now`.
3. **Missed-Day Action**: If `lastActiveDate` is prior to yesterday, `streak` resets to `1` and `lastActiveDate` updates to `now`.

### Guest LocalStorage Fallback
Client-side state mirrors this logic in `localStorage` under `algospark_guest_streak`, allowing unauthenticated users to start building active streak flames immediately.

---

## 🌲 2. Connected SVG Roadmap & Dynamic Filtering System

The roadmap architecture connects DSA learning modules via dynamic vector trackways in [`frontend/src/components/CustomRoadmap.tsx`](file:///c:/Users/91836/Downloads/Mern-Ai-Projects/Dsa-Ditcher/frontend/src/components/CustomRoadmap.tsx).

### SVG Path Calculation Engine
For every pair of connected nodes:
```typescript
const dx = endX - startX;
const dy = endY - startY;
const path = `M ${startX} ${startY} C ${startX + dx / 2} ${startY}, ${endX - dx / 2} ${endY}, ${endX} ${endY}`;
```
- **Filter Matrix**: Toggle filters dynamically hide or show node classes (Required, Alternative, Optional).
- **Mastery Calculation**: Calculates the completion percentage:
  $$\text{Mastery \%} = \left( \frac{\text{Solved Nodes}}{\text{Total Curriculum Nodes}} \right) \times 100$$
  This feeds the dynamic SVG circular progress widget in the header.

---

## 💻 3. Code Playground & Big O Complexity Finder

The code playground couples Monaco Editor with an AST-like complexity detector in [`frontend/src/components/CodePlayground.tsx`](file:///c:/Users/91836/Downloads/Mern-Ai-Projects/Dsa-Ditcher/frontend/src/components/CodePlayground.tsx).

### AST Regex Loop & Recursion Detection
When code is submitted to `/api/ai/complexity`:
- **Nested Loops**: Regex scans `for`/`while` occurrences. Multiple nested blocks trigger quadratic time $O(n^2)$ warnings.
- **Logarithmic Patterns**: Scans for binary division keywords (`mid = Math.floor((low + high) / 2)`), identifying $O(\log n)$ efficiency.
- **Recursive Branching**: Identifies recursive call signatures or graph traversals (`dfs`, `bfs`, `recursion`), highlighting $O(2^n)$ or $O(V+E)$ complexities and proposing Memoization/Dynamic Programming optimizations.

---

## 🍿 4. 3D Flashcard Deck & Interactive Complexity Matrix

In [`frontend/src/components/DsaCheatSheet.tsx`](file:///c:/Users/91836/Downloads/Mern-Ai-Projects/Dsa-Ditcher/frontend/src/components/DsaCheatSheet.tsx):

### CSS 3D Perspective Transform
Cards flip on a smooth 3D axis using standard CSS transforms:
```css
.flashcard-inner {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}
.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}
```

### Big O Complexity Matrix
An interactive table color-codes algorithm space/time complexities:
- 🟢 **Green Badge**: $O(1)$, $O(\log n)$ (Optimal)
- 🟡 **Yellow Badge**: $O(n)$, $O(n \log n)$ (Acceptable)
- 🔴 **Red Badge**: $O(n^2)$, $O(2^n)$ (Suboptimal)

---

## 🎬 5. High-Fidelity Algorithm Visualizer State Machines

In [`frontend/src/components/VisualizationsFixed.tsx`](file:///c:/Users/91836/Downloads/Mern-Ai-Projects/Dsa-Ditcher/frontend/src/components/VisualizationsFixed.tsx):
- **Sorting Visualizer**: Generates an array of bar heights, recording each comparison/swap operation as a discrete animation frame step. Play, pause, step forward, step backward, and speed controls step through the recorded frame timeline.
- **Graph Traversal Visualizer**: Renders tree/graph nodes with SVG elements, highlighting active queue/stack nodes in real-time during BFS/DFS step execution.
- **Hash Table Collisions**: Visualizes key hashing into bucket index arrays and simulates linked-list chaining upon hash collision events.
