import { MetadataRoute } from "next";
import { PRODUCTS_DATA } from "@/data/products";
import { CATEGORIES_DATA } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://smcfabrication.com";

  const staticRoutes = [
    "",
    "/products",
    "/projects",
    "/about",
    "/contact",
    "/request-quote",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const categoryRoutes = CATEGORIES_DATA.map((cat) => ({
    url: `${baseUrl}/products?category=${cat.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
