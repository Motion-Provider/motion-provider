import { cliPackage } from "../../../lib/cli-package";

export const dynamic = "force-static";

export function GET() {
  return new Response(Uint8Array.from(cliPackage()), {
    headers: {
      "Content-Type": "application/gzip",
      "Content-Disposition": 'attachment; filename="motion-playground-cli.tgz"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
