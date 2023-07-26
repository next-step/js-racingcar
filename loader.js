import { isBuiltin } from 'node:module';

export const resolve = (
  specifier,
  context,
  nextResolve // This function can be `async` too
) => nextResolve(isBuiltin(specifier) || specifier.endsWith('.js') ? specifier : `${specifier}.js`, context);
