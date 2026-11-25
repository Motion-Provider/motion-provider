import type { CoverSources } from "@examples/learn/thumbnail-gallery/covers";
import ThumbnailGallery from "@examples/learn/thumbnail-gallery/thumbnail-gallery";
import circuitRush from "../../../../docs/public/docs/learn/thumbnail-gallery/circuit-rush.webp";
import cloudCourier from "../../../../docs/public/docs/learn/thumbnail-gallery/cloud-courier.webp";
import duneSignal from "../../../../docs/public/docs/learn/thumbnail-gallery/dune-signal.webp";
import lanternKeep from "../../../../docs/public/docs/learn/thumbnail-gallery/lantern-keep.webp";
import mossMachine from "../../../../docs/public/docs/learn/thumbnail-gallery/moss-machine.webp";
import nightMarket from "../../../../docs/public/docs/learn/thumbnail-gallery/night-market.webp";
import orbitDive from "../../../../docs/public/docs/learn/thumbnail-gallery/orbit-dive.webp";
import silentPeak from "../../../../docs/public/docs/learn/thumbnail-gallery/silent-peak.webp";
import tidalRelay from "../../../../docs/public/docs/learn/thumbnail-gallery/tidal-relay.webp";

const coverSources = {
  "circuit-rush": circuitRush.src,
  "cloud-courier": cloudCourier.src,
  "dune-signal": duneSignal.src,
  "lantern-keep": lanternKeep.src,
  "moss-machine": mossMachine.src,
  "night-market": nightMarket.src,
  "orbit-dive": orbitDive.src,
  "silent-peak": silentPeak.src,
  "tidal-relay": tidalRelay.src,
} satisfies CoverSources;

export default function ThumbnailGalleryPreview() {
  return <ThumbnailGallery coverSources={coverSources} />;
}
