# Hiero Identity Specifications

This folder serves as a home for Hiero Identity specifications.

Specifications are using [Spec-Up] format.
For details on Spec-Up features and functionality please see [Spec-Up Documentation].

[Spec-Up]: https://github.com/decentralized-identity/spec-up
[Spec-Up Documentation]: https://identity.foundation/spec-up/

## Editing the specifications locally

Editing the spec locally requires `npm` and `node` installed.

- Run `npm install`
- Edit the contents in the spec folder (for example, `hiero-anoncreds-method`)
- Run `npm run render`
    - Alternatively, you can use `npm run edit` to enable interactive editing (rendered spec will be updated automatically as you apply changes)
- Open the resulting `index.html` file in a browser

## How to contribute a new specification

In order to add new specification to the repo, please do the following:

- Create new sub-folder in `specifications`
  - It's recommended to use folder name that corresponds to specification name/title
- Add specification content as Markdown files to new sub-folder
- Add a new specification entry to `specs.json` file, pointing to a new sub-folder and defining rendering options and external spec references
  - Specification URL can be inferred from common GH pages URL by appending `output_path` from specification entry: `https://hiero-ledger.github.io/identity-collaboration-hub/<output_path>/`

Please refer to [Spec-Up Documentation] for general guidance on content structure/formatting and available options for `specs.json` configuration.

## Specifications

### Hiero AnonCreds Method

The Hiero AnonCreds Method specification defines how AnonCreds objects should be registered (written) and resolved when rooting them in a Hedera DID.
This specification parallels other DID-specific AnonCreds methods that are registered in the [AnonCreds Methods Registry](https://hyperledger.github.io/anoncreds-methods-registry/).

The specification leverages [HCS-1 standard](https://hashgraphonline.com/docs/standards/hcs-1/) for storing immutable files on Hedera Consensus Service (HCS).
All the published AnonCreds objects except for RevRegEntry are treated as HCS-1 files in this AnonCreds method (Schema, CredDef, RevRegDef).

For details about Hedera DIDs and how to write/read them, please see [Hedera DID Method specification](https://github.com/hashgraph/did-method).

Read the spec: https://hiero-ledger.github.io/identity-collaboration-hub/hiero-anoncreds-method/

Available implementations of Hiero AnonCreds:

- TypeScript: [Hiero DID SDK JS](https://github.com/hiero-ledger/hiero-did-sdk-js)
- Python: [Hiero DID SDK Python](https://github.com/hiero-ledger/hiero-did-sdk-python)