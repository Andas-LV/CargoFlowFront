const pluralRules = new Intl.PluralRules("ru-RU");

type PluralForms = Record<"one" | "few" | "many", string>;

export const pluralize = (count: number, forms: PluralForms) => {
	const rule = pluralRules.select(count);
	return forms[rule as keyof PluralForms] ?? forms.many;
};
