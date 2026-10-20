import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HelloWorld = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animasi Teks 1
  const spring1 = spring({ frame, fps, config: { damping: 12 } });
  const scale1 = interpolate(spring1, [0, 1], [0.5, 1.2]);

  // Animasi Teks 2
  const frameText2 = frame - 105;
  const spring2 = spring({ frame: frameText2, fps, config: { damping: 12 } });
  const scale2 = interpolate(spring2, [0, 1], [0.5, 1.2]);

  // Animasi Teks 3
  const frameText3 = frame - 210;
  const spring3 = spring({ frame: frameText3, fps, config: { damping: 10 } });
  const scale3 = interpolate(spring3, [0, 1], [0.3, 1.4]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070b19",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Scene 1 */}
      {frame < 105 && (
        <div
          style={{
            transform: `scale(${scale1})`,
            color: "#38bdf8",
            fontSize: 90,
            fontWeight: 900,
            letterSpacing: -2,
            textAlign: "center",
          }}
        >
          AI BERKEMBANG CEPAT!
        </div>
      )}

      {/* Scene 2 */}
      {frame >= 105 && frame < 210 && (
        <div
          style={{
            transform: `scale(${scale2})`,
            color: "#ffffff",
            fontSize: 85,
            fontWeight: 900,
            textAlign: "center",
          }}
        >
          UPDATE DUNIA AI 🔥
        </div>
      )}

      {/* Scene 3 */}
      {frame >= 210 && (
        <div style={{ textAlign: "center", transform: `scale(${scale3})` }}>
          <div
            style={{
              color: "#38bdf8",
              fontSize: 130,
              fontWeight: 900,
              letterSpacing: 4,
            }}
          >
            WHUIDIH
          </div>
          <div
            style={{
              color: "#94a3b8",
              fontSize: 40,
              fontWeight: 600,
              marginTop: 10,
            }}
          >
            AI is everywhere
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
