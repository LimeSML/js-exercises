export function sum(numbers?: number[]): number {
	if (!numbers) {
		return 0;
	}
	return numbers.reduce((sum, number) => sum + number, 0);
}

export function join(
	elements?: (string | number | null)[],
	separator: string | null = ",",
): string {
	if (!elements) {
		throw new Error("elements is required");
	}
	if (separator === null) {
		separator = "null";
	}

	return elements.reduce((joined: string, element, i) => {
		const str = element === null ? "" : String(element);
		return i === 0 ? str : joined + separator + str;
	}, "");
}

export function reverse(elements?: (string | number)[]): (string | number)[] {
	if (!elements) {
		throw new Error("elements is required");
	}
	return elements.reduce(
		(reversed, element) => {
			reversed.unshift(element);
			return reversed;
		},
		[] as (string | number)[],
	);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function every(
	numbers: (number | undefined)[],
	predicate: (elem: any, index: number, arr: any[]) => boolean,
): boolean {
	return numbers.reduce((acc, current, index, arr) => {
		if (!acc) {
			return false;
		}
		return predicate(current, index, arr);
	}, true);
}

export function some(
	numbers: (number | undefined | null)[],
	predicate: (elem: any, index: number, arr: any[]) => boolean,
): boolean {
	return numbers.reduce((acc, current, index, arr) => {
		if (acc) {
			return true;
		}
		return predicate(current, index, arr);
	}, false);
}
