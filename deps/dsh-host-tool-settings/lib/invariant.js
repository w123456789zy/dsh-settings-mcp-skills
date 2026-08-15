//#region lib/types/invariant.js
/**
* Package-owned invariant companion for `@deepseek-ai/dsh-host-tool-settings`.
* @module @deepseek-ai/dsh-host-tool-settings/invariant
*/
const PACKAGE_NAME = "@deepseek-ai/dsh-host-tool-settings";
const name = "host-tool-settings-invariant";
const inject = ["invariants"];
/**
* No runtime invariant: this package owns settings namespaces and a
* filesystem projection, both asserted by the settings seam and the
* filesystem I/O respectively. The namespace uniqueness rule is enforced
* by the settings service; the file write is checked by the filesystem
* service's observation policy.
*/
const install = () => {};
const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
//#endregion
export { apply, inject, name };
