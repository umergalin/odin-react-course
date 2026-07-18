const cache = new Map();

async function fetchImage(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Can't get image: ${response.status}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob); // CREATING MEMORY LEAK
  } catch (e) {
    cache.delete(url);
    console.error(e.message);
    throw e;
  }
}

/**
 * Fetches an image and caches the resulting Object URL promise.
 * @param {string} url - The image source URL.
 * @returns {Promise<string>} A promise that resolves to the object URL.
 */
export function getImage(url) {
  if (cache.has(url)) return cache.get(url);

  const imagePromise = fetchImage(url);
  cache.set(url, imagePromise);

  return imagePromise;
}

export async function deleteImage(url) {
  if (!cache.has(url)) return;

  try {
    const imgObjUrl = await cache.get(url);
    URL.revokeObjectURL(imgObjUrl);
  } catch (e) {
  } finally {
    cache.delete(url);
  }
}
