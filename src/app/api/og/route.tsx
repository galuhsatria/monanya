// src/app/api/og/route.tsx
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "user";

  // Fetch fonts
  const manropeRegular = await fetch(
    new URL("../../../assets/fonts/Manrope-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const manropeBold = await fetch(
    new URL("../../../assets/fonts/Manrope-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Manrope",
          backgroundImage: `
              linear-gradient(to bottom, #ffffff 0%, #f7fbfa 50%, #eef7f5 100%),
              linear-gradient(#e8e8e8 1px, transparent 1px),
              linear-gradient(90deg, #e8e8e8 1px, transparent 1px)
            `,
          backgroundSize: "100% 100%, 120px 120px, 120px 120px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://monanya.vercel.app/monanya-logo-black.png"
          width="200"
          height="60"
          alt="Monanya Logo"
          style={{ marginBottom: "30px" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: 400,
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Ada yang ingin kamu tanyakan?
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: 400,
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Yuk, kirim pertanyaanmu secara anonim.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            padding: "16px 40px",
            border: "2px solid #2DA86D",
            borderRadius: "50px",
            fontSize: "24px",
            fontWeight: 400,
            color: "#2DA86D",
            fontFamily: "Manrope",
          }}
        >
          monanya.vercel.app/{username}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Manrope",
          data: manropeRegular,
          weight: 400,
        },
        {
          name: "Manrope",
          data: manropeBold,
          weight: 700,
        },
      ],
    },
  );
}
