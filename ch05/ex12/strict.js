// strict モードでは、先頭に0が付く数値を許容しない
console.log(01);

// console.log(01);
//             ^^

// SyntaxError: Octal literals are not allowed in strict mode.
//     at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:169:18)
//     at callTranslator (node:internal/modules/esm/loader:272:14)
//     at ModuleLoader.moduleProvider (node:internal/modules/esm/loader:278:30)
//     at async link (node:internal/modules/esm/module_job:78:21)
