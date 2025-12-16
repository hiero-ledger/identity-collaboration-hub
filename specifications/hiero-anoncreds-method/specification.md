# Hiero AnonCreds Method Specification

## Overview

The Hiero AnonCreds Method defines how AnonCreds objects ([[ref: Schemas]], [[ref: CredDefs]], [[ref: RevRegDefs]], and [[ref: RevRegEntries]]) are registered (published, written) by a [[ref: DID Controller]] using a Hedera DID, and how others can resolve those objects.

The method leverages [[ref: HCS-1 Files]], resources (objects, files) managed on [[ref: Hedera Consensus Service]]. For details on how these resources are managed please see [[spec: HCS-1]].

Initial discussions and proposals for Hiero AnonCreds Method were done in scope of [HIP-762: AnonCreds Verifiable Data Registry](https://hips.hedera.com/hip/hip-762).
While the initial proposal provides a significant part of the general concept for using [[ref: HCS]] as Verifiable Data Registry (VDR) for AnonCreds, this specification contradicts with it in several ways as a result of further considerations.

### Contradictions with HIP-762

- Initial proposal for HIP-762 references [Cardano AnonCreds Method](https://github.com/roots-id/cardano-anoncreds/blob/main/cardano-anoncred-methods.md) as a base
- This includes implementation of [DID-Linked Resources](https://wiki.trustoverip.org/display/HOME/DID-Linked+Resources+Specification) approach for identifiers and objects metadata
- In further discussion of HIP proposal, it was suggested to exclude DID-Linked resources usage from Hiero Anoncreds Method
  - There is a good amount of conceptual reasoning for such decision, but it can be summarized as redundancy comparing to more straightforward use of [[ref: HCS]]
- An Indy-like identifier format was proposed as alternative: `<did>/<object-family>/<object-family-version>/<object-type>/<object-type-identifier>`

## Hedera Consensus Service (HCS) Overview

[[ref: Hedera Consensus Service]] (HCS) provides a decentralized solution for publishing ordered, immutable messages with guaranteed timestamps. See the [Hedera HCS documentation](https://hedera.com/consensus-service) for technical details.

Used for:

- Publishing AnonCreds objects as [[ref: HCS-1 Files]]
- Maintaining immutable records with verifiable integrity
- Distributing messages via public ledger through [Hedera Mirror Nodes](https://docs.hedera.com/hedera/networks/mirror-node)

Key HCS features:

- **Ordered Consensus:** Guaranteed timestamps and ordering ([Hedera Docs](https://docs.hedera.com/hedera/services/consensus/introduction))
- **Immutable Records:** Messages are immutable once published
- **Mirror Node Access:** Historical data available via public APIs
- **Submit Key Control:** SubmitKey enforces publishing rights ([SubmitKey Reference](https://docs.hedera.com/hedera/sdks-and-apis/consensus-service/submit-messages))

## AnonCreds Objects

The identifier for each resource has the following format - `<publisher-did>/anoncreds/<anoncreds-version>/<object-type>/<hcs-topic-id>`:

- `<publisher-did>`: The Hedera DID
- `<anoncreds-version>`: AnonCreds specification version. For AnonCreds objects published according to this version of specification, this value **MUST** be `v1`
- `<object-type>`: AnonCreds object type identifier - `SCHEMA`, `PUBLIC_CRED_DEF` or `REV_REG`
- `<hcs-topic-id>`: ID of [[ref: HCS Topic]] that should be used to resolve the AnonCreds object, **MUST** be equal to [[ref: HCS-1 File]] Topic ID

Each Hiero AnonCreds object created by an AnonCred Issuer, except for [[ref: AnonCreds RevRegEntry]], is used to build and publish [[ref: HCS-1 File]] payload.
[[ref: HCS Topic]] is created in a process of publishing [[ref: HCS-1 File]] and its Topic ID then used to build a complete object identifier in above-mentioned format.
That identifier is embedded into other objects (such as issued verifiable credentials) available to other parties (Holders, Verifiers) that need to resolve the object.

**Choosing Hedera network:**

- Hedera network specified in Issuer DID **MUST** be used for publishing [[ref: HCS-1 File]] and creating [[ref: HCS Topics]] associated with an object
- Hedera network specified in `<publisher-did>` **MUST** be used for resolving [[ref: HCS-1 File]] associated with an object
- Hedera network used to resolve [[ref: HCS-1 File]] **MUST** be assumed for [[ref: HCS Topic]] IDs specified in corresponding [[ref: HCS-1 File]] content

The following sections define how each AnonCreds object type is published and resolved.

### AnonCreds Schema

An [[ref: AnonCreds Schema]] is published to Hiero as [[ref: HCS-1 File]]. The resulting [[ref: Schema]] identifier becomes a part of [[ref: AnonCreds CredDef]] based on this particular [[ref: Schema]].
Holders and Verifiers retrieve the [[ref: Schema]] identifier retrieved from a resolved [[ref: AnonCreds CredDef]].

For [[ref: AnonCreds Schema]] identifier:

- `<publisher-did>` **MUST** be DID of [[ref: Schema]] Issuer
- `<object-type>` **MUST** be `SCHEMA`

#### Schema creation and publishing

The following process **MUST** be followed to create and publish [[ref: AnonCreds Schema]] rooted to a Hedera DID:

1. As Issuer, create [[ref: AnonCreds Schema]] object
2. Publish [[ref: Schema]] object to HCS as [[ref: HCS-1 File]]
3. Use [[ref: HCS-1 File]] Topic ID to build [[ref: Schema]] identifier: `<issuer-did>/anoncreds/v1/SCHEMA/<hcs1-file-topic-id>`

#### Schema resolution

The following process **MUST** be followed to resolve [[ref: AnonCreds Schema]] rooted to a Hedera DID:

1. Parse [[ref: Schema]] identifier and retrieve [[ref: HCS-1 File]] Topic ID
2. Use retrieved Topic ID to resolve [[ref: Schema]] object as [[ref: HCS-1 File]]

#### Schema example

The following is an example [[ref: AnonCreds Schema]] [[ref: HCS-1 File]] resolved with the identifier: `did:hedera:testnet:z59hbwYATdKtDQHb15rq6wj7BABcToWF4nTA8GH9X6Kf6_0.0.5422052/anoncreds/v1/SCHEMA/0.0.5422053`

HCS Topic Memo: `5f42ece40f0151f78f752380fea10b130f50008b181f3319cb262706b6e7baee:zstd:base64`

Resolved HCS Messages (raw HCS-1 chunks):

```json
[
  {
    "o": 0,
    "c": "data:application/json;base64,KLUv/SCr7QQA0skjIzDFbAOAv0fuuyVwMoLWjIybWL1fKGTV0nsC2VtBalLQUFCBBf0apzk25TZbP6CZgfRPvJl5cGz70xX1Xn/gex4INq95kUhiRQ2pQhCmi0IHBndl1EQNKF10qdDBqkXhWvKaHB2mSXAg3qfX/o1eX74W5SZloj6AtVsz0z5fyyxz8yV/xTJdwNAc+6fTJggDAAybZ74QJyZQeg=="
  }
]
```

Resolved HCS-1 content:

```json
{
  "name": "Example demo schema",
  "issuerId": "did:hedera:testnet:z59hbwYATdKtDQHb15rq6wj7BABcToWF4nTA8GH9X6Kf6_0.0.5422052",
  "attrNames": [
    "name",
    "age"
  ],
  "version": "1.0"
}
```

### AnonCreds CredDef

An [[ref: AnonCreds CredDef]] is published to Hiero as [[ref: HCS-1 File]]. The resulting [[ref: CredDef]] identifier is placed in the verifiable credentials issued by that Issuer.
Holders retrieve the [[ref: CredDef]] identifier embedded in an AnonCreds verifiable credential and place the [[ref: CredDef]] identifier into verifiable presentations sent to Verifiers.
Verifiers retrieve the [[ref: CredDef]] identifier from the presentation to resolve the [[ref: CredDef]].

For [[ref: AnonCreds CredDef]] identifier:

- `<publisher-did>` **MUST** be DID of [[ref: CredDef]] Issuer
- `<object-type>` **MUST** be `PUBLIC_CRED_DEF`

#### CredDef creation and publishing

The following process **MUST** be followed to create and publish [[ref: AnonCreds CredDef]] rooted to a Hedera DID:

1. As Issuer, create [[ref: AnonCreds CredDef]] object
2. Publish [[ref: CredDef]] object to HCS as [[ref: HCS-1 File]]
3. Use [[ref: HCS-1 File]] Topic ID to build [[ref: CredDef]] identifier: `<issuer-did>/anoncreds/v1/PUBLIC_CRED_DEF/<hcs1-file-topic-id>`

#### CredDef resolution

The following process **MUST** be followed to resolve [[ref: AnonCreds CredDef]] rooted to a Hedera DID:

1. Parse [[ref: CredDef]] identifier and retrieve [[ref: HCS-1 File]] Topic ID
2. Use retrieved Topic ID to resolve [[ref: CredDef]] object as [[ref: HCS-1 File]]

#### CredDef example

The following is an example [[ref: AnonCreds CredDef]] [[ref: HCS-1 File]] (with long values truncated with ellipses) resolved with the identifier: `did:hedera:testnet:z59hbwYATdKtDQHb15rq6wj7BABcToWF4nTA8GH9X6Kf6_0.0.5422052/anoncreds/v1/PUBLIC_CRED_DEF/0.0.5422058`

HCS Topic Memo: `b22489d9d28adc5bc334a34a09bfa72d04f500ca62fce9afa096317c6971d884:zstd:base64`

Resolved HCS Messages (raw HCS-1 chunks):

```json
[
  {
    "o": 0,
    "c": "data:application/json;base64,KLUv/WCNHa1yAModSSYqAI22tA2cVM0Y..."
  },
  {
    "o": 1,
    "c": "CBbp/9tenWriJ+dOa+WfTaXFvq3iltrZ6Ke7Z1t4v2rDWbkqb5lNTUyRFOyQW..."
  },
  ...
  (6 chunks in total)
]
```

Resolved HCS-1 content:

```json
{
  "issuerId": "did:hedera:testnet:z59hbwYATdKtDQHb15rq6wj7BABcToWF4nTA8GH9X6Kf6_0.0.5422052",
  "schemaId": "did:hedera:testnet:z59hbwYATdKtDQHb15rq6wj7BABcToWF4nTA8GH9X6Kf6_0.0.5422052/anoncreds/v1/SCHEMA/0.0.5422053",
  "type": "CL",
  "tag": "default",
  "value": {
    "primary": {
      "n": "10069...",
      "s": "32198...",
      "r": {
        "name": "17428...",
        "age": "10037...",
        "master_secret": "18481..."
      },
      "rctxt": "70839...",
      "z": "52601..."
    },
    "revocation": {
      "g": "1 07435...",
      "g_dash": "1 232F7...",
      "h": "1 19001...",
      "h0": "1 188DC...",
      "h1": "1 0D668...",
      "h2": "1 1111A...",
      "htilde": "1 16C12...",
      "h_cap": "1 15562...",
      "u": "1 03D74...",
      "pk": "1 14C3F...",
      "y": "1 20C8C..."
    }
  }
}
```

### AnonCreds RevRegDef

An [[ref: AnonCreds RevRegDef]] is published to Hiero as [[ref: HCS-1 File]]. The [[ref: RevRegDef]] identifier is placed in the revocable verifiable credentials issued by its Issuer.
Holders retrieve the [[ref: RevRegDef]] identifier embedded in an AnonCreds verifiable credential issued to them.
Holders place the [[ref: RevRegDef]] identifier into verifiable presentations sent to Verifiers, who retrieve the [[ref: RevRegDef]] identifier to resolve the [[ref: RevRegDef]].

For [[ref: AnonCreds RevRegDef]] identifier:

- `<publisher-did>` **MUST** be DID of [[ref: RevRegDef]] Issuer
- `<object-type>` **MUST** be `REV_REG_DEF`

Unlike other AnonCreds objects published as [[ref: HCS-1 Files]], the [[ref: RevRegDef]] [[ref: HCS-1 File]] content does not represent the AnonCreds object itself, but contains following fields:

- `revRegDef` - [[ref: RevRegDef]] object itself
- `hcsMetadata` - additional HCS-related metadata that needs to be stored outside the [[ref: RevRegDef]]

The `hcsMetadata` field contains `entriesTopicId` which specifies ID of [[ref: HCS Topic]] that can be used to resolve all [[ref: RevRegEntries]] associated with the [[ref: RevRegDef]] (see the example below).
Each new [[ref: RevRegEntry]] is published by the Issuer as HCS message in corresponding entries Topic. This approach is described in details in [a next section dedicated to RevRegEntries](#anoncreds-revregentry).
Notably, since [[ref: RevRegEntries]] are stored in a separate [[ref: HCS Topic]], [[ref: RevRegDef]] remains unchanged and works well with [[ref: HCS-1 File]] immutability concept.

#### RevRegDef creation and publishing

The following process **MUST** be followed to create and publish [[ref: AnonCreds RevRegDef]] rooted to a Hedera DID:

1. As Issuer, create [[ref: AnonCreds RevRegDef]] object
2. Create [[ref: HCS Topic]] that will be used to store associated [[ref: RevRegEntries]]
   - Use key from Issuer DID Document as Topic `submitKey`
   - Do not set Topic `adminKey`
3. Build [[ref: HCS-1 File]] content as following (JSON representation): `{ "revRegDef": <rev-reg-def-object>, "hcsMetadata": { "entriesTopicId": "<entries-topic-id>" } }`
4. Publish the content as [[ref: HCS-1 File]]
5. Use [[ref: HCS-1 File]] Topic ID to build [[ref: RevRegDef]] identifier: `<issuer-did>/anoncreds/v1/REV_REG_DEF/<hcs1-file-topic-id>`

#### RevRegDef resolution

The following process **MUST** be followed to resolve [[ref: AnonCreds RevRegDef]] rooted to a Hedera DID:

1. Parse [[ref: RevRegDef]] identifier and retrieve [[ref: HCS-1 File]] Topic ID
2. Use retrieved Topic ID to resolve corresponding [[ref: HCS-1 File]]
3. Retrieve [[ref: RevRegDef]] object from `revRegDef` field of [[ref: HCS-1 File]] content

#### RevRegDef example

The following is an example [[ref: AnonCreds RevRegDef]] [[ref: HCS-1 File]] (with long values truncated with ellipses), with the identifier: `did:hedera:testnet:z59hbwYATdKtDQHb15rq6wj7BABcToWF4nTA8GH9X6Kf6_0.0.5422052/anoncreds/v1/REV_REG_DEF/0.0.5422060`

HCS Topic Memo: `58fecf1d37955c058b5015f151d3b7c001e900062541f6a939f6529c2f0020b3:zstd:base64`

Resolved HCS Messages (raw HCS-1 chunks):

```json
[
  {
    "o": 0,
    "c": "data:application/json;base64,KLUv/WBBBA0aAApErAspEI2oDdySWov/..."
  },
  {
    "o": 1,
    "c": "lxpi5LyaGeCXS9PRZYlVOUxvb51xVtYepzi01Ws83eWH71YzSkaV0+sjMij3k..."
  }
]
```

Resolved HCS-1 content:

```json
{
  "revRegDef": {
    "issuerId": "did:hedera:testnet:z59hbwYATdKtDQHb15rq6wj7BABcToWF4nTA8GH9X6Kf6_0.0.5422052",
    "type": "CL_ACCUM",
    "credDefId": "did:hedera:testnet:z59hbwYATdKtDQHb15rq6wj7BABcToWF4nTA8GH9X6Kf6_0.0.5422052/anoncreds/v1/PUBLIC_CRED_DEF/0.0.5422058",
    "tag": "0",
    "value": {
      "publicKeys": {
        "accumKey": {
          "z": "1 1D014..."
        }
      },
      "maxCredNum": 1000,
      "tailsLocation": "http://tails:6543/hash/UHfhXnK27vdYML9jgHvb6tPwa5HfDnARgmEFbxNC3cQ",
      "tailsHash": "UHfhXnK27vdYML9jgHvb6tPwa5HfDnARgmEFbxNC3cQ"
    }
  },
  "hcsMetadata": {
    "entriesTopicId": "0.0.5422059"
  }
}
```

### AnonCreds RevRegEntry

An [[ref: AnonCreds RevRegEntry]] is published to Hiero as HCS message in a separate [[ref: HCS Topic]] linked to corresponding [[ref: RevRegDef]].

[[ref: RevRegEntry]] is an object that contains the "delta" of the revocation registry state (indexes of revoked and/or issued credentials) and the associated accumulator values (previous and current).
Each [[ref: RevRegEntry]], being a separate HCS message, has a consensus timestamp that can be used for restoring revocation registry state for certain moment in time.

Unlike other AnonCreds objects, [[ref: RevRegEntries]] are not stored as [[ref: HCS-1 Files]], do not have an identifiers and discovered through associated [[ref: RevRegDef]] object.
An Issuer publishes [[ref: RevRegEntry]] messages to entries [[ref: HCS Topic]] specified in the [[ref: RevRegDef] [[ref: HCS-1 File]]. As noted earlier, since the [[ref: RevRegDef]] object does not change, it's [[ref: HCS-1 File]] remains the same.

Holders, when generating a presentation using the revocable verifiable credential, retrieve the [[ref: RevRegDef]] identifier from an AnonCreds verifiable credential issued to them.
The Holder/Verifier party then resolves [[ref: RevRegEntries]] published before appropriate timestamp (based on the requirements in the presentation request) and builds the revocation list state based on state "deltas" from resolved [[ref: RevRegEntries]].

#### RevRegEntry creation and publishing

The following process **MUST** be followed to create and publish [[ref: AnonCreds RevRegEntry]] associated with [[ref: RevRegDef]] rooted to a Hedera DID:

1. As Issuer, create [[ref: AnonCreds RevRegEntry]] object containing revocation registry state "delta" and corresponding accumulator values
   - Depending on AnonCreds implementation, it may be required to calculate state "delta" from current and previous revocation status lists (as revoked/issued indexes diff)
2. Resolve associated [[ref: RevRegDef]] [[ref: HCS-1 File]] using given identifier
   - In relevant AnonCreds implementations, [[ref: AnonCreds RevRegDef]] identifier is provided for both registration and update operations on revocation list
3. Retrieve entries [[ref: HCS Topic]] ID from `hcsMetadata.entriesTopicId` value from resolved [[ref: HCS-1 File]]
4. Serialize [[ref: RevRegEntry]] object and compress it using `zstd` compression algorithm
5. Build [[ref: RevRegEntry]] HCS message content as following (JSON representation): `{ "payload": <compressed-entry-data-base64> }`
6. Publish HCS message to entries [[ref: HCS Topic]]

#### RevRegEntry resolution

The following process **MUST** be followed to resolve [[ref: AnonCreds RevRegEntries]] associated with [[ref: RevRegDef]] rooted to a Hedera DID:

1. Resolve associated [[ref: RevRegDef]] [[ref: HCS-1 File]] using given identifier
2. Retrieve entries [[ref: HCS Topic]] ID from `hcsMetadata.entriesTopicId` value from resolved [[ref: HCS-1 File]]
3. Use retrieved Topic ID to resolve [[ref: RevRegEntries]] HCS messages (all or for a given timestamp)
4. Decompress (using `zstd` compression algorithm) and parse `payload` fields of HCS messages to get [[ref: RevRegEntries]] objects
5. Use state "deltas" to build revocation list state (current or for a given timestamp)

#### RevRegEntry example

The following is an example [[ref: AnonCreds RevRegEntry]] associated with [[ref: AnonCreds RevRegDef]] with identifier `did:hedera:testnet:zDeiGABWuBLu9bbw4NFLSYbB8p14ZPRwTNefow18w7mvC_0.0.6236034/anoncreds/v1/REV_REG_DEF/0.0.6236039`

Entry HCS Message:

```json
{
  "payload": "KLUv/WB0AtUJADYcSRtwS9IB5vkHky5rCgEfkYnQ0qRlZDMPQuv/fyVGADwAP..."
}
```

Entry content:

```json
{
  "ver": "1.0",
  "value": {
    "accum": "21 12001...",
    "prevAccum": "21 12001...",
    "revoked": [
      0,
      9
    ]
  }
}
```
