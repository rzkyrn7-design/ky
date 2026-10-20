import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Audio,
} from "remotion";

// Helper Dubbing Suara AI Indonesia
const IndonesianVoice: React.FC<{ text: string }> = ({ text }) => {
  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=id&client=tw-ob&q=${encodeURIComponent(
    text
  )}`;
  return <Audio src={ttsUrl} volume={1.2} />;
};

const useJitter = (frame: number) => {
  const step = Math.floor(frame / 3);
  const rot = ((step * 7) % 5) - 2.5;
  const x = ((step * 11) % 4) - 2;
  const y = ((step * 13) % 4) - 2;
  return { rot, x, y };
};

// Scene 1: Detik 0 - 4 (Hutan & Awal Api)
const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const jitter = useJitter(frame);
  const intro = spring({ frame, fps, config: { damping: 12 } });
  const scale = interpolate(intro, [0, 1], [0.85, 1]);
  const fireScale = interpolate(frame, [45, 110], [0, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1b3a2b",
        overflow: "hidden",
        fontFamily: "'Impact', 'Arial Black', sans-serif",
      }}
    >
      <IndonesianVoice text="Indonesia berduka, hutan tropis kita kini terancam terbakar." />

      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          filter: "drop-shadow(0px -10px 15px rgba(0,0,0,0.4))",
        }}
      >
        <path d="M0,800 Q480,680 960,780 T1920,720 L1920,1080 L0,1080 Z" fill="#24513b" />
        <path d="M0,880 Q520,790 1100,860 T1920,830 L1920,1080 L0,1080 Z" fill="#163325" />
      </svg>

      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          filter: "drop-shadow(0 15px 12px rgba(0,0,0,0.5))",
          transform: `translate(${jitter.x}px, ${jitter.y}px)`,
        }}
      >
        {[420, 500, 460, 540, 430, 490].map((h, i) => (
          <svg key={i} width="160" height={h} viewBox="0 0 100 200">
            <polygon points="50,10 90,80 65,80 95,140 20,140" fill={i % 2 === 0 ? "#2d6a4f" : "#40916c"} />
            <polygon points="50,10 10,80 35,80 5,140 50,140" fill={i % 2 === 0 ? "#1e4d38" : "#2d6a4f"} />
            <rect x="42" y="140" width="16" height="60" fill="#582f0e" />
          </svg>
        ))}
      </div>

      {frame >= 40 && (
        <div
          style={{
            position: "absolute",
            bottom: 140,
            left: "48%",
            transform: `scale(${fireScale}) rotate(${jitter.rot * 2}deg)`,
            filter: "drop-shadow(0 0 35px #ff5400)",
          }}
        >
          <svg width="220" height="260" viewBox="0 0 100 120">
            <path d="M50,5 Q75,45 85,75 Q95,110 50,115 Q5,110 15,75 Q25,45 50,5 Z" fill="#ff4800" />
            <path d="M50,30 Q65,60 70,80 Q75,105 50,110 Q25,105 30,80 Q35,60 50,30 Z" fill="#ffb703" />
          </svg>
        </div>
      )}

      <div style={{ position: "absolute", top: "12%", width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            backgroundColor: "#f4f1de",
            padding: "24px 60px",
            border: "4px solid #3d405b",
            boxShadow: "14px 14px 0px rgba(0,0,0,0.6)",
            transform: `scale(${scale}) rotate(${jitter.rot}deg)`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 30, color: "#e63946", letterSpacing: 3, fontWeight: 900 }}>INDONESIA BERDUKA</div>
          <div style={{ fontSize: 62, color: "#1d3557", marginTop: 4 }}>HUTAN TROPIS TERBAKAR</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Detik 4 - 8 (Api Meluas)
const Scene2 = () => {
  const frame = useCurrentFrame();
  const jitter = useJitter(frame);
  const smokeMove = interpolate(frame, [0, 120], [100, -50]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#6a040f",
        overflow: "hidden",
        fontFamily: "'Impact', 'Arial Black', sans-serif",
      }}
    >
      <IndonesianVoice text="Darurat karhutla, api meluas membakar ribuan hektar lahan." />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          filter: "drop-shadow(0 -15px 30px #d00000)",
          transform: `translate(${jitter.x * 2}px, 0)`,
        }}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <svg key={item} width="400" height="650" viewBox="0 0 100 150">
            <polygon points="50,0 90,90 75,90 100,150 0,150 25,90 10,90" fill="#dc2f02" />
            <polygon points="50,25 80,95 65,95 85,145 15,145 35,95 20,95" fill="#f48c06" />
          </svg>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: smokeMove,
          width: "120%",
          left: "-10%",
          opacity: 0.85,
        }}
      >
        <svg viewBox="0 0 1000 350">
          <circle cx="150" cy="200" r="140" fill="#343a40" />
          <circle cx="350" cy="160" r="160" fill="#495057" />
          <circle cx="580" cy="180" r="150" fill="#212529" />
          <circle cx="820" cy="150" r="170" fill="#343a40" />
        </svg>
      </div>

      <div style={{ position: "absolute", top: "40%", width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            backgroundColor: "#212529",
            color: "#ffb703",
            padding: "30px 60px",
            border: "5px solid #d00000",
            boxShadow: "14px 14px 0px #000",
            transform: `rotate(${jitter.rot}deg)`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 36, color: "#fff" }}>DARURAT KARHUTLA</div>
          <div style={{ fontSize: 68, color: "#e85d04" }}>API MELUAS TANPA KENDALI</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Detik 8 - 12 (Kabut Asap & Bahaya Udara)
const Scene3 = () => {
  const frame = useCurrentFrame();
  const jitter = useJitter(frame);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#2b2d42",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Impact', 'Arial Black', sans-serif",
      }}
    >
      <IndonesianVoice text="Kabut asap pekat menyelimuti permukiman, kualitas udara sangat berbahaya." />

      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px 70px",
          border: "6px solid #d90429",
          boxShadow: "16px 16px 0px rgba(0,0,0,0.7)",
          transform: `scale(1.05) rotate(${jitter.rot}deg)`,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 34, color: "#d90429", letterSpacing: 2 }}>KONDISI UDARA BERBAHAYA</div>
        <div style={{ fontSize: 66, color: "#2b2d42", marginTop: 8 }}>KABUT ASAP PEKAT</div>
        <div style={{ fontSize: 28, color: "#6c757d", marginTop: 12 }}>
          Masyarakat Terancam ISPA & Aktivitas Lumpuh
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Detik 12 - 16 (Habitat Hancur)
const Scene4 = () => {
  const frame = useCurrentFrame();
  const jitter = useJitter(frame);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1c1917",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Impact', 'Arial Black', sans-serif",
      }}
    >
      <IndonesianVoice text="Ekosistem hancur, ribuan satwa kehilangan rumah tinggal mereka." />

      <div
        style={{
          backgroundColor: "#292524",
          color: "#fff",
          padding: "36px 60px",
          borderLeft: "14px solid #ef4444",
          boxShadow: "14px 14px 0px #000",
          transform: `rotate(${jitter.rot}deg)`,
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 32, color: "#f87171" }}>KERUSAKAN LINGKUNGAN</div>
        <div style={{ fontSize: 62, color: "#f5f5f4", marginTop: 6 }}>HABITAT SATWA MUSNAH</div>
        <div style={{ fontSize: 26, color: "#a8a29e", marginTop: 10 }}>Tanah Menghitam & Butuh Puluhan Tahun Pulih</div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Detik 16 - 20 (Harapan & Cegah Karhutla)
const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const jitter = useJitter(frame);
  const grow = spring({ frame, fps, config: { damping: 9 } });
  const scale = interpolate(grow, [0, 1], [0.3, 1.2]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#283618",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Impact', 'Arial Black', sans-serif",
      }}
    >
      <IndonesianVoice text="Karhutla mengancam kita semua. Mari cegah sebelum terlambat!" />

      <div
        style={{
          position: "absolute",
          top: "16%",
          transform: `scale(${scale}) rotate(${jitter.rot}deg)`,
          filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.5))",
        }}
      >
        <svg width="220" height="240" viewBox="0 0 100 100">
          <path d="M50,90 Q48,50 50,30" stroke="#606c38" strokeWidth="6" fill="none" />
          <path d="M50,45 Q75,30 70,55 Q50,60 50,45 Z" fill="#dda15e" />
          <path d="M50,35 Q25,20 30,45 Q50,50 50,35 Z" fill="#bc6c25" />
          <circle cx="50" cy="24" r="14" fill="#dda15e" />
        </svg>
      </div>

      <div
        style={{
          backgroundColor: "#fefae0",
          padding: "44px 70px",
          border: "5px solid #606c38",
          boxShadow: "16px 16px 0px rgba(0,0,0,0.6)",
          textAlign: "center",
          marginTop: 220,
          transform: `rotate(${jitter.rot}deg)`,
        }}
      >
        <div style={{ fontSize: 56, color: "#283618", lineHeight: 1.2 }}>
          KARHUTLA MENGANCAM KITA SEMUA
        </div>
        <div style={{ fontSize: 44, color: "#bc6c25", marginTop: 14 }}>
          Cegah Sebelum Terlambat!
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const HelloWorld = () => {
  return (
    <AbsoluteFill>
      {/* Background Music Sinematik Online Otomatis */}
      <Audio
        src="https://actions.google.com/sounds/v1/weather/fire_burning.ogg"
        volume={0.35}
      />

      <Sequence from={0} durationInFrames={120}>
        <Scene1 />
      </Sequence>
      <Sequence from={120} durationInFrames={120}>
        <Scene2 />
      </Sequence>
      <Sequence from={240} durationInFrames={120}>
        <Scene3 />
      </Sequence>
      <Sequence from={360} durationInFrames={120}>
        <Scene4 />
      </Sequence>
      <Sequence from={480} durationInFrames={120}>
        <Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
