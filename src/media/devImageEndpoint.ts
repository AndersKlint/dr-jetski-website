import type { APIRoute } from 'astro';
import { GET as serveDevImage } from 'astro/assets/endpoint/dev';
import { GET as serveRuntimeImage } from 'astro/assets/endpoint/generic';

// Dev image URLs stay stable across same-name byte changes, so the default year-long cache can serve stale images.
const serveUncachedDevImage: APIRoute = async (context) => {
  const response = await serveDevImage(context);
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'no-store');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export const GET: APIRoute = import.meta.env.DEV ? serveUncachedDevImage : serveRuntimeImage;
