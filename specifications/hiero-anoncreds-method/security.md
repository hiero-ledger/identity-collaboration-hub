## Security Considerations

The security model for Hiero AnonCreds Method relies on the inherent security properties of [Hedera DID Method](https://github.com/hashgraph/did-method/blob/master/hedera-did-method-specification.md) and Hedera network (specifically HCS consensus and finality).
Key considerations include:

- It's mandatory to apply strict control over DID and signing keys by following [DID Security Guidelines](https://www.w3.org/TR/did-core/#security-considerations) and [Hedera DID Method Security section](https://github.com/hashgraph/did-method/blob/master/hedera-did-method-specification.md#4-security-considerations)
- Object resolvers **MUST** validate identifiers and signatures against the Issuer’s DID Document
- The use of identifiers, particularly public and persistent identifiers like [[ref: Schema]] and [[ref: CredDef]] identifiers, can create risks of correlation. When the same [[ref: CredDef]] identifier is used across multiple contexts or interactions, it allows observing parties (including websites, applications, and resolvers) to link those activities together. This correlation can potentially reveal sensitive information about the behavior or relationships of the party (Issuer/Holder/Verifier) without consent
- To mitigate DoS risks associated with open topics or compromised `submitKeys`, operators **SHOULD** consider:
  - Setting an appropriate `submitKey` on the [[ref: HCS Topic]] and managing it securely
  - Rotating the [[ref: HCS Topic]] `submitKey` periodically, if feasible within their operational model
  - Implementing monitoring on [[ref: HCS Topics]] (e.g., via mirror nodes) to detect unusual activity or spam volume
  - Designing resolvers to be resilient to invalid messages (efficiently filtering them out based on proof validation)
- It's recommended to use official mirror nodes for resolving [[ref: HCS]] messages ([Mirror Node Guide](https://docs.hedera.com/hedera/core-concepts/mirror-nodes))
- Since [[ref: HCS-1 Files]] are immutable, creating a new version of AnonCreds object requires a new [[ref: HCS-1 file]] to be published in a separate [[ref: HCS Topic]]. This means that different versions of the same AnonCreds object (for example, [[ref: AnonCreds Schema]]) are not linked to each other and can be resolved only via unique identifiers