/**
 * Yellowtail centerline data — trimmed to a single "J" glyph.
 * Source: tegaki generator (https://gkurt.com/tegaki/generator/).
 *
 * Each stroke `s[i]` is a polyline in font units with:
 *   - p: array of [x, y, pressure] points. Pressure is ignored here.
 *   - d: delay in seconds before the stroke starts drawing.
 *   - a: duration in seconds to draw the stroke.
 */

export interface GlyphStroke {
  p: number[][];
  d: number;
  a: number;
}

export interface Glyph {
  w: number;
  t: number;
  s: GlyphStroke[];
}

export const YELLOWTAIL_UNITS_PER_EM = 2048;

export const YELLOWTAIL_J: Glyph = {
  w: 1314,
  t: 2.298,
  s: [
    {
      p: [
        [716.97, -527.59],
        [654.48, -448.04],
        [569.25, -408.27],
        [421.54, -396.91],
        [319.27, -459.41],
        [290.86, -533.27],
        [307.9, -669.62],
        [364.72, -760.53],
        [444.26, -851.43],
        [614.71, -1004.83],
        [745.38, -1095.74],
        [1052.18, -1254.82],
        [1154.45, -1294.59],
        [1398.75, -1357.08],
        [1597.61, -1374.13],
        [1614.65, -1374.13],
        [1626.01, -1357.08],
        [1586.24, -1209.37],
        [1415.8, -987.79],
        [995.37, -385.55],
        [972.64, -283.28],
        [949.91, -249.19],
        [722.65, -67.38],
        [569.25, -44.66],
        [518.12, -16.25],
        [256.77, 165.56],
        [120.42, 290.55],
        [74.96, 392.82],
        [80.64, 478.04],
        [148.82, 512.13],
        [239.73, 500.77],
        [296.54, 478.04],
        [506.76, 296.23],
        [614.71, 165.56],
        [682.88, 68.97],
        [716.97, -67.38],
      ],
      d: 0,
      a: 1.898,
    },
    {
      p: [
        [961.28, -260.55],
        [1001.05, -254.87],
        [1109, -283.28],
        [1211.26, -357.14],
      ],
      d: 2.048,
      a: 0.093,
    },
    {
      p: [
        [1626.01, -1351.4],
        [1643.06, -1362.77],
      ],
      d: 2.291,
      a: 0.007,
    },
  ],
};

const PAD = 70;
const bx1 = 74.96;
const bx2 = 1643.06;
const by1 = -1374.13;
const by2 = 512.13;

export const YELLOWTAIL_J_BBOX = {
  x: bx1 - PAD,
  y: by1 - PAD,
  w: bx2 - bx1 + PAD * 2,
  h: by2 - by1 + PAD * 2,
};
export const YELLOWTAIL_J_ASPECT =
  YELLOWTAIL_J_BBOX.w / YELLOWTAIL_J_BBOX.h;
