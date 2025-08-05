// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
	// punctuation
	trailingComma: "es5",
	semi: true,
	// whitespace
	tabWidth: 4,
	useTabs: true,
	printWidth: 100,
	experimentalTernaries: true,
	// quotes
	singleQuote: false,
	jsxSingleQuote: false,
	bracketSameLine: false,
	quoteProps: "as-needed",
	// brackets/parentheses
	bracketSpacing: true,
	arrowParens: "avoid",
};

export default config;
