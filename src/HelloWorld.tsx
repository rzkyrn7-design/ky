import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

// Komponen Pembantu: Layer Kertas
const PaperCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      boxShadow: "0 14px 28px rgba(0,0,0,0.28), 0 10px 10px rgba(0,0,0,0.22)",
      borderRadius: 16,
      ...style,
    }}
  >
    {children}
  </div>
);

// SCENE 1: Hutan Tropis & Awal Api (Detik 0 - 4 | Frame 0 - 120)
const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleEntry = spring({ frame, fps, config: { damping: 12 } });
  const scale = interpolate(titleEntry, [0, 1], [0.8, 1]);
  const fireGrowth = interpolate(frame, [60, 120], [0, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1b4332",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Trebuchet MS', sans-serif",
      }}
    >
      {/* Siluet Lapisan Pohon Kertas */}
      <div
        style={{
          position: "absolute",
          bottom: -50,
          display: "flex",
          gap: 20,
          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.4))",
        }}
      >
        {[300, 420, 360, 480, 320, 400].map((h, i) => (
          <div
            key={i}
            style={{
              width: 140,
              height: h,
              backgroundColor: i % 2 === 0 ? "#2d6a4f" : "#40916c",
              borderTopLeftRadius: "50%",
              borderTopRightRadius: "50%",
            }}
          />
        ))}
      </div>

      {/* Titik Api Awal */}
      {frame >= 50 && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            transform: `scale(${fireGrowth})`,
            display: "flex",
            gap: 15,
          }}
        >
          <div
            style={{
              width: 70,
              height: 110,
              backgroundColor: "#ff6b35",
              borderRadius: "50% 50% 20% 20%",
              transform: "rotate(-10deg)",
              boxShadow: "0 0 35px #ff4800",
            }}
          />
          <div
            style={{
              width: 90,
              height: 140,
              backgroundColor: "#f7a072",
              borderRadius: "50% 50% 20% 20%",
              transform: "rotate(10deg)",
              boxShadow: "0 0 40px #ff7b00",
            }}
          />
        </div>
      )}

      {/* Teks Informasi */}
      <PaperCard
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "#fefae0",
          padding: "36px 64px",
          textAlign: "center",
          transform: `scale(${scale})`,
        }}
      >
        <div style={{ fontSize: 32, color: "#283618", fontWeight: 700, letterSpacing: 2 }}>
          INDONESIA
        </div>
        <div style={{ fontSize: 68, color: "#bc6c25", fontWeight: 900 }}>
          HUTAN TROPIS KITA TERANCAM
        </div>
      </PaperCard>
    </AbsoluteFill>
  );
};

// SCENE 2: Api Meluas & Asap Tebal (Detik 4 - 8 | Frame 120 - 240)
const Scene2 = () => {
  const frame = useCurrentFrame();
  const smokeOpacity = interpolate(frame, [0, 80], [0.2, 0.85]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#b02a37",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Trebuchet MS', sans-serif",
      }}
    >
      {/* Kobaran Api Besar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          filter: "drop-shadow(0 -10px 30px #ff6b35)",
        }}
      >
        {[500, 650, 580, 700, 620].map((h, i) => (
          <div
            key={i}
            style={{
              width: 240,
              height: h,
              backgroundColor: i % 2 === 0 ? "#dc2f02" : "#f48c06",
              borderRadius: "60% 40% 10% 10%",
              transform: `rotate(${i % 2 === 0 ? -8 : 8}deg)`,
            }}
          />
        ))}
      </div>

      {/* Layer Asap Tebal */}
      <AbsoluteFill
        style={{
          backgroundColor: "#343a40",
          opacity: smokeOpacity,
        }}
      />

      <PaperCard
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "#212529",
          border: "4px solid #f48c06",
          padding: "36px 60px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 34, color: "#f8f9fa", fontWeight: 700 }}>
          API MELUAS CEPAT
        </div>
        <div style={{ fontSize: 62, color: "#faa307", fontWeight: 900, marginTop: 10 }}>
          RIBUAN HEKTAR LAHAN TERBAKAR
        </div>
      </PaperCard>
    </AbsoluteFill>
  );
};

// SCENE 3: Dampak Kualitas Udara & Permukiman (Detik 8 - 12 | Frame 240 - 360)
const Scene3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 10 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#495057",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Trebuchet MS', sans-serif",
      }}
    >
      {/* Siluet Rumah Kertas Tertutup Kabut Asap */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          gap: 60,
          opacity: 0.35,
        }}
      >
        {[240, 320, 260].map((w, i) => (
          <div
            key={i}
            style={{
              width: w,
              height: 200,
              backgroundColor: "#212529",
              borderRadius: "12px 12px 0 0",
            }}
          />
        ))}
      </div>

      <PaperCard
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "#f8f9fa",
          padding: "40px 70px",
          textAlign: "center",
          transform: `scale(${interpolate(pop, [0, 1], [0.8, 1])})`,
        }}
      >
        <div style={{ fontSize: 30, color: "#c92a2a", fontWeight: 800 }}>
          KUALITAS UDARA BERBAHAYA
        </div>
        <div style={{ fontSize: 64, color: "#212529", fontWeight: 900, marginTop: 8 }}>
          KABUT ASAP MENYELIMUTI KOTA
        </div>
        <div style={{ fontSize: 26, color: "#6c757d", fontWeight: 600, marginTop: 14 }}>
          Jutaan Warga Terancam Penyakit ISPA
        </div>
      </PaperCard>
    </AbsoluteFill>
  );
};

// SCENE 4: Kerusakan Habitat & Tanah Menghitam (Detik 12 - 16 | Frame 360 - 480)
const Scene4 = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Trebuchet MS', sans-serif",
      }}
    >
      {/* Pohon Gersang Kertas */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {[30, 45, 35, 50].map((w, i) => (
          <div
            key={i}
            style={{
              width: w,
              height: 380,
              backgroundColor: "#2b2b2b",
              borderRadius: 6,
            }}
          />
        ))}
      </div>

      <PaperCard
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "#2d2d2d",
          borderLeft: "10px solid #e03131",
          padding: "36px 54px",
          textAlign: "left",
        }}
      >
        <div style={{ fontSize: 28, color: "#adb5bd", fontWeight: 700 }}>
          KERUSAKAN EKOSISTEM
        </div>
        <div style={{ fontSize: 58, color: "#f1f3f5", fontWeight: 900, marginTop: 8 }}>
          SATWA KEHILANGAN RUMAH
        </div>
        <div style={{ fontSize: 26, color: "#ff8787", fontWeight: 700, marginTop: 10 }}>
          Lahan Gambut Butuh Puluhan Tahun Memulih
        </div>
      </PaperCard>
    </AbsoluteFill>
  );
};

// SCENE 5: Harapan & Penanaman Kembali (Detik 16 - 20 | Frame 480 - 600)
const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const plantSpring = spring({ frame, fps, config: { damping: 10 } });
  const plantScale = interpolate(plantSpring, [0, 1], [0.2, 1.1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#2d6a4f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Trebuchet MS', sans-serif",
      }}
    >
      {/* Simbol Bibit Pohon Kertas Tumbuh */}
      <div
        style={{
          position: "absolute",
          top: 180,
          transform: `scale(${plantScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 110,
            backgroundColor: "#74c69d",
            borderRadius: "50% 50% 10% 10%",
            boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
          }}
        />
        <div style={{ width: 14, height: 80, backgroundColor: "#52b788" }} />
      </div>

      {/* Slogan Penutup */}
      <PaperCard
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "#fefae0",
          padding: "44px 72px",
          textAlign: "center",
          marginTop: 260,
        }}
      >
        <div style={{ fontSize: 54, color: "#1b4332", fontWeight: 900, lineHeight: 1.2 }}>
          KARHUTLA MENGANCAM KITA SEMUA
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#d9480f",
            fontWeight: 900,
            marginTop: 14,
            letterSpacing: 1,
          }}
        >
          Cegah Sebelum Terlambat!
        </div>
      </PaperCard>
    </AbsoluteFill>
  );
};

// Komponen Utama HelloWorld (Total 600 Frame / 20 Detik)
export const HelloWorld = () => {
  return (
    <AbsoluteFill>
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
