# Hiero Identity Collaboration Hub

[![Commit activity](https://img.shields.io/github/commit-activity/m/hiero-ledger/identity-collaboration-hub)](https://github.com/hiero-ledger/identity-collaboration-hub/commits/main)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/hiero-ledger/identity-collaboration-hub/badge)](https://scorecard.dev/viewer/?uri=github.com/hiero-ledger/identity-collaboration-hub)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/10697/badge)](https://bestpractices.coreinfrastructure.org/projects/10697)
[![License](https://img.shields.io/github/license/hiero-ledger/identity-collaboration-hub)](https://github.com/hiero-ledger/identity-collaboration-hub/blob/main/LICENSE)

The Identity Collaboration Hub is the primary umbrella repository for specifications/standards, architecture documents, shared libraries, and reference implementations related to identity within the Hiero Ledger ecosystem.

Specifically, this repository goal is to be a common place to host following parts of the ecosystem:

#### Identity Standards
- DID method specifications 
- Interoperability proposals
- Architecture documentation
- Reference flows and diagrams

#### Identity-related source code (non-SDK)
- Shared libraries
- Utilities, templates, and tooling
- Proof-of-concept implementations
- Reference implementations and examples

Please note that identity-related SDKs and other libraries/tools that are meant to be used as direct dependencies are hosted in separate repositories.

## Hiero Identity ecosystem references

### Hiero Identity specifications

- DID Method specifications
  - There are currently two versions of Hedera DID spec, both are hosted in a separate repos
  - [Hedera DID Method v1.0](https://github.com/hashgraph/did-method/blob/master/hedera-did-method-specification.md)
  - [Hedera DID Method v2.0](https://github.com/Swiss-Digital-Assets-Institute/did-method/)
- [Hiero AnonCreds Method](https://hiero-ledger.github.io/identity-collaboration-hub/hiero-anoncreds-method/)
- [Hedera DID Host design for DID SCID Method](https://hashgraph.atlassian.net/wiki/external/Yjg3ZjU0ZjI4MGMyNDUzYWJiZGJmYzUxZDgwMzcyNmY)

### Hiero Decentralized Identity (DID) SDKs

Hiero currently provides robust SDKs designed to streamline the integration of Decentralized Identity within your applications on the Hedera ledger.
By adhering to the Hedera DID Method and Hedera AnonCreds Method specification, SDKs provide developers with a comprehensive suite of tools to create, manage, and resolve DIDs and AnonCreds objects using Hedera Consensus Service (HCS).

The following SDKs are currently available:
- [Hiero DID SDK JavaScript](https://github.com/hiero-ledger/hiero-did-sdk-js)
- [Hiero DID SDK Python](https://github.com/hiero-ledger/hiero-sdk-python)

### Hedera integration plugins for OWF projects

- [OWF Credo](https://github.com/openwallet-foundation/credo-ts/tree/main/packages/hedera)
- [OWF ACA-Py](https://github.com/openwallet-foundation/acapy)

## Join the community

Feel free to reach out for Hiero Identity Community to discuss existing projects, outstanding questions, and new contributions.

### Hiero Identity Community meetings

Hiero Identity Community organizes meetings to discuss the latest and greatest of decentralized identity on Hiero/Hedera.

The target audience includes operators of identity platforms supporting Hiero/Hedera and developers interested in using and contributing to Hiero identity repos.

The meeting is conducted monthly on Thursdays at 8:00 AM PST.
Please refer to [Hiero community calendar](https://zoom-lfx.platform.linuxfoundation.org/meetings/hiero?view=week) for the next meetings schedule and instructions to join.

### Discord

Join LFDT Discord channel by using [invitation link](https://discord.com/invite/hyperledger) and find `Hiero` section there.

At the moment, there are following-identity related text channels under this group:
- `hiero-identity-collaboration-hub` - channel dedicated to this repo and also a general collaboration channel for identity topics. If you're not sure where to ask or search for help, please do not hesitate to use this channel to reach out for community
- `hiero-did-sdk-js` - channel dedicated to Hiero DID SDK JS discussions
- `hiero-did-sdk-python` - channel dedicated to Hiero DID SDK Python discussions

Please note that topics related to integration plugins (OWF Credo, ACA-Py) can also be discussed in corresponding channels in OWF Discord ([invitation link](https://discord.com/invite/yjvGPd5FCU))
- `Growth projects` -> `credo` - channel dedicated to Credo framework
- `Impact projects` -> `acapy` - channel dedicated to ACA-Py agent

## Roadmap (short-term)

- Extending guides, adding new ones and other community materials
- Moving previously created identity specifications/standards into this repo
- Adding reference implementations for identity applications on Hiero


