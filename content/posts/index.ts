import { body as esewaRemixBody } from "./esewa-remix";
import { body as bleInExpoBody } from "./ble-in-expo";
import { body as inRangeNotAllowedBody } from "./in-range-is-not-allowed";
import { body as regexOverMlBody } from "./regex-over-ml-for-pii";

export type Post = {
  slug: string;
  title: string;
  /** Meta description + listing blurb. Keep under ~155 chars for SERP display. */
  description: string;
  /** ISO date. Drives <time>, JSON-LD, and sitemap lastModified. */
  date: string;
  /** Human-readable date for display. */
  displayDate: string;
  readTime: string;
  tags: string[];
  body: string;
  /**
   * Drafts are excluded from the listing, the sitemap, and static generation.
   * Flip to false once the content has been reviewed.
   */
  draft?: boolean;
};

export const posts: Post[] = [
  {
    slug: "how-to-implement-esewa-payment-in-remix-app",
    title: "Integrating eSewa Payments in a Remix App",
    description:
      "A practical guide to integrating eSewa, Nepal's most widely used digital wallet, into a Remix application: form handling, signature generation, and the redirect flow.",
    date: "2024-11-01",
    displayDate: "November 2024",
    readTime: "5 min read",
    tags: ["Remix", "eSewa", "Payments", "Nepal"],
    body: esewaRemixBody,
  },
  {
    slug: "bluetooth-low-energy-in-an-expo-app",
    title: "Bluetooth Low Energy in an Expo App",
    description:
      "Seven things I ran into shipping BLE with react-native-ble-plx on Expo: dev clients, the simulator, version-dependent Android permissions, and the byte protocol behind a single characteristic.",
    date: "2025-03-18",
    displayDate: "March 2025",
    readTime: "11 min read",
    tags: ["React Native", "Expo", "BLE", "Bluetooth"],
    body: bleInExpoBody,
  },
  {
    slug: "in-range-is-not-the-same-as-allowed",
    title: "In Range Is Not the Same as Allowed",
    description:
      "BLE is a proximity protocol, so anyone near your hardware can talk to it. Splitting transport from authority, and being honest about what a client-side permission check is and is not.",
    date: "2025-06-17",
    displayDate: "June 2025",
    readTime: "9 min read",
    tags: ["BLE", "Architecture", "Security", "Offline-First"],
    body: inRangeNotAllowedBody,
  },
  {
    slug: "why-i-didnt-use-an-ml-model-to-detect-pii",
    title: "Why I Didn't Use an ML Model to Detect PII",
    description:
      "Building an LLM proxy that redacts PII in the request path, I chose regex over NER. The reasoning, and an honest account of where my own patterns get it wrong.",
    date: "2026-08-27",
    displayDate: "August 2026",
    readTime: "10 min read",
    tags: ["Go", "LLM", "Privacy", "Regex"],
    body: regexOverMlBody,
  },
];

/** Published posts only, newest first. Use this everywhere user-facing. */
export const publishedPosts = posts
  .filter((p) => !p.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const postBySlug = (slug: string) =>
  publishedPosts.find((p) => p.slug === slug);
