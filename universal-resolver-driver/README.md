# Universal Resolver Driver for Hedera DID

This is a [Universal Resolver](https://github.com/decentralized-identity/universal-resolver/) driver for **did:hedera** identifiers.

## Specifications

* [Decentralized Identifiers](https://w3c.github.io/did-core/)
* [Hedera DID](https://github.com/hashgraph/did-method/blob/master/hedera-did-method-specification.md)

## Example DIDs

```
did:hedera:testnet:23g2MabDNq3KyB7oeH9yYZsJTRVeQ24DqX8o6scB98e3_0.0.5217215
did:hedera:testnet:ChQreHtT3MgjuVchee9kimLxsWXxjQRzeTuCjcXvkh7j_0.0.7232365
```

## Build and Run (Docker)

```
docker build --platform linux/amd64 -f ./Dockerfile . -t uni-resolver-driver-did-hedera
docker run -p 8080:8080 uni-resolver-driver-did-hedera
curl -X GET http://localhost:8080/1.0/identifiers/did:hedera:testnet:23g2MabDNq3KyB7oeH9yYZsJTRVeQ24DqX8o6scB98e3_0.0.5217215
```

## Build and Run (Bun)

```
bun index.ts
```


## Driver Metadata

The driver returns the following metadata in addition to a DID document:

* `created`: The date and time the DID document was created.
* `updated`: The date and time the DID document was last updated.
* `deactivated`: Whether the DID is deactivated.

```
{
    "created": "2024-12-05T18:26:11.125Z",
    "updated": "2024-12-05T18:26:11.125Z",
    "deactivated": false
}
```