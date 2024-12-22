export default function sitemap() {
  const baseUrl = "https://jsonstruct.com";
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
