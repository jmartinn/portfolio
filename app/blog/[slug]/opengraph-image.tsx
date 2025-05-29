import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { getMDXMetadata } from "@/lib/db/blog";

// Image metadata
export const size = {
  width: 1920,
  height: 1080,
};

export const contentType = "image/png";

// Image generation
// @ts-expect-error: Implicit type 'any'
export default async function Image({ params }) {
  const metadata = await getMDXMetadata(params.slug);
  const montserratSemibold = await readFile(
    join(process.cwd(), "public/fonts/Montserrat-Semibold.ttf")
  );

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
          {metadata.title}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Montserrat",
          data: montserratSemibold,
          style: "normal",
        },
      ],
    }
  );
}
