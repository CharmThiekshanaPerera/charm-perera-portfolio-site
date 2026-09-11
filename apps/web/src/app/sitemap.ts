import type { MetadataRoute } from "next";
import { getPosts, getProjects, getSiteSettings, getSiteUrl } from "@/lib/content";

/**
 * Generated from the database, so publishing a project or post in the admin
 * panel puts it in the sitemap automatically.
 *
 * The old static sitemap listed hash fragments (/#about, /#projects). Google
 * treats those as the same URL as the homepage, so they added nothing and
 * diluted the file. Every entry here is a distinct, crawlable page.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl(settings);
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1.0, lastModified: new Date() },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/projects`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/start`,
      changeFrequency: "monthly",
      priority: 0.9,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
      lastModified: new Date(),
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt || Date.now()),
    changeFrequency: "monthly",
    priority: project.featured ? 0.8 : 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: post.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
