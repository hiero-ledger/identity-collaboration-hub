## Definitions

[[def: Schema, AnonCreds Schema, Schemas, AnonCreds Schemas]]

~ A JSON object that defines the schema for an AnonCreds verifiable credential. A schema for a given verifiable credential type rooted to a Hedera DID can be resolved as a [[ref: HCS-1 File]]. The AnonCreds schema is defined in the [Schema publishing section](https://hyperledger.github.io/anoncreds-spec/#schema-publisher-publish-schema-object) of the [[spec: AnonCreds]] specification.

[[def: CredDef, AnonCreds CredDef, CredDefs, AnonCreds CredDefs]]

~ A JSON object that contains the public keys that enables verification of an AnonCreds verifiable presentation derived from a verifiable credential from a specific Issuer. A CredDef for a given verifiable credential type rooted to a Hedera DID can be resolved as a [[ref: HCS-1 File]]. An AnonCreds CredDef object is defined in the [CredDef generation section](https://hyperledger.github.io/anoncreds-spec/#generating-a-credential-definition-without-revocation-support) of the [[spec: AnonCreds]] specification.

[[def: RevRegDef, AnonCreds RevRegDef, RevRegDefs, AnonCreds RevRegDefs]]

~ A JSON object that contains the metadata and public key published by the Issuer that enables verification of an AnonCreds [non-revocation proof](https://hyperledger.github.io/anoncreds-spec/#collecting-data-for-generating-the-non-revocation-proof) that a holder includes in a presentation of a revocable credential. A RevRegDef for a given [[ref: AnonCreds CredDef]] rooted to a Hedera DID can be resolved as a [[ref: HCS-1 File]]. An AnonCreds RevRegDef object is defined in the [RevRegDef creation section](https://hyperledger.github.io/anoncreds-spec/#issuer-create-and-publish-revocation-registry-objects) of the [[spec: AnonCreds]] specification.

[[def: RevRegEntry, AnonCreds RevRegEntry, RevRegEntries, AnonCreds RevRegEntries]]

~ A JSON object that contains the accumulator and state "delta" (indexes of revoked and issued credentials) in scope of a single update within an AnonCreds revocation registry. The RevRegEntry data is used by the Holder to create a [non-revocation proof](https://hyperledger.github.io/anoncreds-spec/#collecting-data-for-generating-the-non-revocation-proof). A verifier must get the accumulator from the same RevRegEntry used by the holder to verify the non-revocation proof. A RevRegEntry for a given [[ref: AnonCreds RevRegDef]] rooted to a Hedera DID can be resolved as HCS message from a separate "entries topic" (topic ID is included in "hcsMetadata" property in RevRegDef). An AnonCreds RevRegEntry object is defined in the [RevRegEntry creation section](https://hyperledger.github.io/anoncreds-spec/#creating-the-initial-revocation-status-list-object) of the [[spec: AnonCreds]] specification.

[[def: HCS-1 File, HCS-1 Files]]

~ An arbitrary data managed on HCS in accordance with [[spec: HCS-1]] standard.
The data is compressed, encoded and chunked before publishing (with vice versa process for resolution) and resolvable via HCS Topic ID.
Separate HCS Topics are created for each HCS-1 File and include a memo with metadata for integrity checks (payload hash, compression algorithm and encoding). Cryptographic integrity checks are based on guarantees provided by HCS.
HCS-1 Files are immutable due to HCS Topic control restrictions defined in HCS-1 standard - no topic admin key is specified, so topic memo cannot be changed along with a payload hash.

[[def: Hedera Consensus Service, HCS]]
~ A service provided by Hedera ledger that provides convenient functionality for publishing arbitrary messages (by topics) for consensus, giving each of them trusted timestamp and ordering.
High throughput, scalability and low cost are significant advantages of HCS, however the message size is hard-limited to 1024 bytes.
HCS is used in various production environments to track provenance across supply chains, log asset transfers between blockchain networks, count votes in a DAO, monitor IoT devices, and more.

[[def: HCS Topic, HCS Topics]]
~ An entity created in [[ref: HCS]] to manage the stream of messages.

[[def: DID Controller, DID Controller's, DID Controllers]]

~ The entity that controls (create, updates, deletes) a given DID, as defined
in the [[spec:DID-CORE]].
