import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;

// Wire the OpenNext Cloudflare adapter into `next dev` so `getCloudflareContext()`
// returns real bindings locally. Safe to call unconditionally.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
