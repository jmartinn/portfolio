import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

import { sanitizeTitle } from "@/lib/validation";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const rawTitle = searchParams.get("title");

  // Validate and sanitize the title input
  // Limit to 100 characters to prevent abuse and ensure proper rendering
  const postTitle = sanitizeTitle(rawTitle, 100);

  const font = fetch(
    new URL("../../../public/fonts/Montserrat-Semibold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage: "url(https://www.jmartinn.com/og-bg.png)",
        }}
      >
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: "flex",
            fontSize: 130,
            fontFamily: "Montserrat",
            fontStyle: "normal",
            color: "white",
            lineHeight: "120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Montserrat",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
