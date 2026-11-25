const artwork = "/docs/learn/thumbnail-gallery";

export const COVERS = (
  [
    ["cloud-courier", "Cloud Courier", "An orange biplane above the clouds."],
    ["circuit-rush", "Circuit Rush", "A turquoise racer on a banked track."],
    ["silent-peak", "Silent Peak", "A climber below a snowy summit."],
    ["lantern-keep", "Lantern Keep", "An adventurer at a moonlit fortress."],
    ["moss-machine", "Moss Machine", "A green robot covered in plants."],
    ["orbit-dive", "Orbit Dive", "A deep-space diver tethered to a capsule."],
    ["dune-signal", "Dune Signal", "An antenna-equipped rover on a dune."],
    ["tidal-relay", "Tidal Relay", "A hydrofoil cutting across a wave."],
    ["night-market", "Night Market", "A midnight street of glowing stalls."],
  ] as const
).map(([id, title, description]) => ({
  id,
  title,
  description,
  src: `${artwork}/${id}.webp`,
}));

export type CoverSources = Record<(typeof COVERS)[number]["id"], string>;

export const COUNT = COVERS.length;

export function wrap(position: number) {
  return ((position % COUNT) + COUNT) % COUNT;
}
