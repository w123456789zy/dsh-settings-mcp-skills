//#region lib/types/invariant.js
/**
* Package-owned invariant companion for `@deepseek-ai/dsh-client-ui-settings-tools`.
* @module @deepseek-ai/dsh-client-ui-settings-tools/invariant
*/
const PACKAGE_NAME = "@deepseek-ai/dsh-client-ui-settings-tools";
const name = "client-ui-settings-tools-invariant";
const inject = ["invariants"];
const install = () => {};
const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
//#endregion
export { apply, inject, name };
