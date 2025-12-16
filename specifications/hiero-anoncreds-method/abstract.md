## Abstract

The Hiero AnonCreds Method specification defines how [[spec: AnonCreds]] objects should be registered (written) and resolved when rooting them in a Hedera DID.
This specification parallels other DID-specific AnonCreds methods that are registered in the [AnonCreds Methods Registry](https://hyperledger.github.io/anoncreds-methods-registry/).

The specification leverages [[spec: HCS-1]] standard for storing immutable files on Hedera Consensus Service (HCS).
All the published AnonCreds objects except for [[ref: RevRegEntry]] are treated as [[ref: HCS-1 files]] in this AnonCreds method ([[ref: Schema]], [[ref: CredDef]], [[ref: RevRegDef]]).

For details about Hedera DIDs and how to write/read them, please see [Hedera DID Method specification](https://github.com/hashgraph/did-method).
