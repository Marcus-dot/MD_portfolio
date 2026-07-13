/* Single edit point for real-world values — mirrors CONFIG in the prototype. */
export const CONFIG = {
  email: "madalitsomarcus@gmail.com",
  // TODO: replace with the final production domain once the Vercel project exists
  siteUrl: "https://md-portfolio.vercel.app",
  links: {
    // TODO: replace with the direct App Store listing URL once known
    appStore: "https://www.nexvenue.app/",
    googlePlay:
      "https://play.google.com/store/apps/details?id=co.gralix.nexvenue",
    web: "https://tech.gralix.co/products/nexvenue",
  },
} as const;
