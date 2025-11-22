import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
  const siteTitle = 'Recipy - Share Your Culinary Art';
  const defaultDescription = 'Discover and share thousands of recipes with a community of food lovers. Join Recipy today!';
  const defaultImage = 'https://placehold.co/1200x630/10b981/ffffff?text=Recipy'; // Replace with actual OG image
  const siteUrl = 'http://localhost:5173'; // Replace with actual production URL

  const fullTitle = title ? `${title} | Recipy` : siteTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet defer={false}>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />
    </Helmet>
  );
};

export default SEO;
