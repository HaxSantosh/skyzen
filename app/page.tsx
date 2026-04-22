"use client";

import { useDomScanner } from "@/hooks/useDomScanner";
import HighlightBox from "@/components/HighlightBox";

export default function Home() {
  const { elements } = useDomScanner();

  return (
    <div className="p-10">
      <h1>DOM Scanner Test</h1>

      <button>Login</button>
      <button>Signup</button>
      <input placeholder="Enter name" />

      {elements.map((item) => {
        const rect = item.element.getBoundingClientRect();

        return (
          <HighlightBox
            key={item.id}
            x={rect.left}
            y={rect.top}
            width={rect.width}
            height={rect.height}
            label={`${item.id}`}
          />
        );
      })}
    </div>
  );
}