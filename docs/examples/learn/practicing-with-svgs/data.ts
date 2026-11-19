export const shapeDefinitions = [
  {
    id: "circle-1",
    elementType: "circle",
    props: { pathLength: 1, cx: 100, cy: 100, r: 80 },
  },
  {
    id: "line-1",
    elementType: "line",
    props: { pathLength: 1, x1: 220, y1: 30, x2: 360, y2: 170 },
  },
  {
    id: "line-2",
    elementType: "line",
    props: { pathLength: 1, x1: 220, y1: 170, x2: 360, y2: 30 },
  },
  {
    id: "rect-1",
    elementType: "rect",
    props: { pathLength: 1, x: 410, y: 30, width: 140, height: 140, rx: 20 },
  },
  {
    id: "circle-2",
    elementType: "circle",
    props: { pathLength: 1, cx: 100, cy: 300, r: 80 },
  },
  {
    id: "line-3",
    elementType: "line",
    props: { pathLength: 1, x1: 220, y1: 230, x2: 360, y2: 370 },
  },
  {
    id: "line-4",
    elementType: "line",
    props: { pathLength: 1, x1: 220, y1: 370, x2: 360, y2: 230 },
  },
  {
    id: "rect-2",
    elementType: "rect",
    props: { pathLength: 1, x: 410, y: 230, width: 140, height: 140, rx: 20 },
  },
  {
    id: "circle-3",
    elementType: "circle",
    props: { pathLength: 1, cx: 100, cy: 500, r: 80 },
  },
  {
    id: "line-5",
    elementType: "line",
    props: { pathLength: 1, x1: 220, y1: 430, x2: 360, y2: 570 },
  },
  {
    id: "line-6",
    elementType: "line",
    props: { pathLength: 1, x1: 220, y1: 570, x2: 360, y2: 430 },
  },
  {
    id: "rect-3",
    elementType: "rect",
    props: { pathLength: 1, x: 410, y: 430, width: 140, height: 140, rx: 20 },
  },
] as const;
