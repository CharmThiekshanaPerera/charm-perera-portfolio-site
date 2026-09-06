/**
 * Seeds MongoDB with the content migrated from the original Vite site.
 *
 *   npm run seed              # idempotent upsert — safe to re-run
 *   npm run seed -- --reset   # wipe the content collections first
 *
 * `messages` and `adminUsers` are never touched: the first holds real enquiries
 * and the second holds credentials.
 */
import { config as loadEnv } from "dotenv";
import path from "node:path";
import process from "node:process";

// Load env from the repo root and from apps/web, so one .env.local works for both.
loadEnv({ path: path.resolve(process.cwd(), "../../.env.local") });
loadEnv({ path: path.resolve(process.cwd(), "../../.env") });
loadEnv({ path: path.resolve(process.cwd(), "../../apps/web/.env.local") });

import { connectToDatabase, disconnectFromDatabase } from "../src/connect";
import {
  AddOn,
  Experience,
  Post,
  Project,
  ServicePackage,
  SiteSettings,
  SkillCategory,
  Testimonial,
} from "../src/models";
import { siteSettings } from "./seed-data/settings";
import { addOns, experiences, servicePackages, skillCategories, testimonials } from "./seed-data/profile";
import { projects } from "./seed-data/projects";
import { posts } from "./seed-data/posts";

const RESET = process.argv.includes("--reset");

function log(step: string, detail: string) {
  process.stdout.write(`  ${step.padEnd(18)} ${detail}\n`);
}

async function main() {
  console.log("\n Seeding charm-portfolio database\n");

  await connectToDatabase();
  log("connected", process.env.MONGODB_DB || "charm_portfolio");

  if (RESET) {
    await Promise.all([
      Project.deleteMany({}),
      Post.deleteMany({}),
      Testimonial.deleteMany({}),
      ServicePackage.deleteMany({}),
      AddOn.deleteMany({}),
      Experience.deleteMany({}),
      SkillCategory.deleteMany({}),
      SiteSettings.deleteMany({}),
    ]);
    log("reset", "content collections cleared");
  }

  // Site settings — a true singleton keyed on "default".
  await SiteSettings.updateOne(
    { key: "default" },
    { $set: { ...siteSettings, key: "default" } },
    { upsert: true },
  );
  log("settings", "1 document");

  // Slug-keyed collections upsert cleanly, so re-running never duplicates.
  for (const project of projects) {
    await Project.updateOne({ slug: project.slug }, { $set: project }, { upsert: true });
  }
  log("projects", `${projects.length} documents`);

  for (const post of posts) {
    await Post.updateOne({ slug: post.slug }, { $set: post }, { upsert: true });
  }
  log("posts", `${posts.length} documents`);

  for (const pkg of servicePackages) {
    await ServicePackage.updateOne({ slug: pkg.slug }, { $set: pkg }, { upsert: true });
  }
  log("packages", `${servicePackages.length} documents`);

  // These have no natural unique key, so match on the field that identifies them.
  for (const addOn of addOns) {
    await AddOn.updateOne({ title: addOn.title }, { $set: addOn }, { upsert: true });
  }
  log("add-ons", `${addOns.length} documents`);

  for (const experience of experiences) {
    await Experience.updateOne(
      { role: experience.role, company: experience.company },
      { $set: experience },
      { upsert: true },
    );
  }
  log("experience", `${experiences.length} documents`);

  for (const category of skillCategories) {
    await SkillCategory.updateOne(
      { title: category.title },
      { $set: category },
      { upsert: true },
    );
  }
  log("skills", `${skillCategories.length} documents`);

  for (const testimonial of testimonials) {
    await Testimonial.updateOne(
      { name: testimonial.name, company: testimonial.company },
      { $set: testimonial },
      { upsert: true },
    );
  }
  log("testimonials", `${testimonials.length} documents`);

  console.log("\n Seed complete.");
  console.log(" Next: npm run create-admin -- you@example.com '<strong password>'\n");

  await disconnectFromDatabase();
}

main().catch(async (error) => {
  console.error("\n Seed failed:", error instanceof Error ? error.message : error);
  await disconnectFromDatabase().catch(() => {});
  process.exit(1);
});
