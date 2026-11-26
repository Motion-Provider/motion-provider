const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8", { fatal: true });

function base64url(bytes: Uint8Array) {
  let binary = "";
  for (let start = 0; start < bytes.length; start += 8192) {
    binary += String.fromCharCode(...bytes.subarray(start, start + 8192));
  }
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}

export async function pack(source: string) {
  const raw = encoder.encode(source);
  const compressed = new Blob([raw])
    .stream()
    .pipeThrough(new CompressionStream("gzip"));
  const payload = base64url(
    new Uint8Array(await new Response(compressed).arrayBuffer()),
  );
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", raw));
  const hash = Array.from(digest, (value) =>
    value.toString(16).padStart(2, "0"),
  ).join("");
  return `${hash}.${payload}`;
}

export async function unpack(code: string) {
  const [hash = "", payload, extra] = code.split(".");
  if (
    !/^[a-f0-9]{64}$/.test(hash) ||
    !payload ||
    extra !== undefined ||
    !/^[A-Za-z0-9_-]{1,12000}$/.test(payload)
  ) {
    throw new Error("This shared project code is invalid.");
  }
  const bytes = Uint8Array.from(
    atob(payload.replaceAll("-", "+").replaceAll("_", "/")),
    (character) => character.charCodeAt(0),
  );
  const decompressed = new Blob([bytes])
    .stream()
    .pipeThrough(new DecompressionStream("gzip"));
  const reader = decompressed.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 240_000) throw new Error("This shared project is too large.");
      chunks.push(value);
    }
  } finally {
    await reader.cancel();
  }
  const raw = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    raw.set(chunk, offset);
    offset += chunk.length;
  }
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", raw));
  const actual = Array.from(digest, (value) =>
    value.toString(16).padStart(2, "0"),
  ).join("");
  if (hash !== actual)
    throw new Error("This shared project code is incomplete or has changed.");
  return decoder.decode(raw);
}

export async function copyText(value: string) {
  await navigator.clipboard.writeText(value);
}

export function downloadText(name: string, value: string) {
  const url = URL.createObjectURL(
    new Blob([value], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
