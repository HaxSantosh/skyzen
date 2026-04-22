"use client";

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
};

export default function HighlightBox({
  x,
  y,
  width,
  height,
  label,
}: Props) {
  return (
    <div
      style={{
        position: "fixed",
        top: y,
        left: x,
        width,
        height,
        border: "2px solid red",
        zIndex: 9999,
        pointerEvents: "none",
        animation: "blink 1s infinite",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "-20px",
          left: "0",
          background: "red",
          color: "white",
          padding: "2px 6px",
          fontSize: "12px",
        }}
      >
        {label}
      </span>

      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}