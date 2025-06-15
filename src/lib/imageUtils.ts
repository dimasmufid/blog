// Utility functions for handling blog post images

// Get appropriate image for a blog post
export function getBlogPostImage(customImage?: string): string {
  // If custom image is provided, use it (local or external URL)
  if (customImage) {
    return customImage;
  }
  
  // Default fallback to placeholder
  return '/placeholder.jpg';
}