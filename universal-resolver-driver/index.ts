import { Elysia } from 'elysia';
import { dereferenceDID, resolveDID } from '@hiero-did-sdk/resolver';
import { isHederaDIDUrl, isHederaDID } from '@hiero-did-sdk/core';

const app = new Elysia()
  .get('/1.0/identifiers/:identifier', async ({ params: { identifier }, request: { url } }) => {
    const urlSegments = url.split('/');
    const identifierIndex = urlSegments.indexOf(identifier);
    const didUrl = urlSegments.slice(identifierIndex).join('/');

    try {
      if (isHederaDID(didUrl)) {
        console.log(`Resolving DID: ${identifier}`);
        const { didDocument, didResolutionMetadata, didDocumentMetadata } = await resolveDID(
          identifier,
          'application/ld+json;profile="https://w3id.org/did-resolution"'
        );
        if (didDocument) {
          console.log(`Resolved ${didDocument.id}`);
          return Response.json(
            {
              didDocument,
              didResolutionMetadata: {
                ...didResolutionMetadata,
                contentType: 'application/ld+json',
              },
              didDocumentMetadata,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        }
      } else if (isHederaDIDUrl(didUrl)) {
        console.log(`Dereferencing DID URL: ${identifier}`);
        const { contentStream, dereferencingMetadata, contentMetadata } = await dereferenceDID(
          didUrl,
          'application/ld+json;profile="https://w3id.org/did-resolution"'
        );
        return Response.json(
          {
            contentStream,
            dereferencingMetadata,
            contentMetadata,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );
      }
      return new Response('Not Found', { status: 404 });
    } catch (e: any) {
      console.log(`Failed to resolve ${identifier}: ${e.message}`);
      return new Response(e.message, { status: 400 });
    }
  })
  .listen(Bun.env.PORT || 8080);

console.log(`did:hedera resolver is running on port ${app.server?.port}`);
