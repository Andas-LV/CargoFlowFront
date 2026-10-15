"use client";

import { Search, X } from "lucide-react";
import {
	useEffect,
	useId,
	useRef,
	useState,
	type ChangeEvent,
	type ComponentProps,
	type FocusEvent,
	type KeyboardEvent,
	type ReactNode,
	type Ref,
} from "react";

import { useDebounce } from "@/shared/hooks/use-debounce";
import { pluralize } from "@/shared/lib/plural";
import { cn } from "@/shared/lib/utils";
import { Spinner } from "@/shared/ui/spinner";

type InputProps = Omit<
	ComponentProps<"input">,
	"value" | "defaultValue" | "onChange" | "type" | "ref"
>;

export interface AutocompleteProps<T> extends InputProps {
	ref?: Ref<HTMLInputElement>;
	value: T | null;
	onChange: (item: T | null) => void;
	onSearchChange: (query: string) => void;
	items: readonly T[];
	isLoading?: boolean;
	getItemKey: (item: T) => string;
	getItemLabel: (item: T) => string;
	renderItem?: (item: T) => ReactNode;
	isItemDisabled?: (item: T) => boolean;
	minQueryLength?: number;
	debounceMs?: number;
	emptyMessage?: ReactNode;
}

const DEFAULT_DEBOUNCE_MS = 300;
const DEFAULT_MIN_QUERY_LENGTH = 2;

const assignRef = <T,>(ref: Ref<T> | undefined, node: T | null) => {
	if (typeof ref === "function") ref(node);
	else if (ref) ref.current = node;
};

function Autocomplete<T>({
	ref,
	value,
	onChange,
	onSearchChange,
	items,
	isLoading = false,
	getItemKey,
	getItemLabel,
	renderItem = getItemLabel,
	isItemDisabled,
	minQueryLength = DEFAULT_MIN_QUERY_LENGTH,
	debounceMs = DEFAULT_DEBOUNCE_MS,
	emptyMessage = "Ничего не найдено",
	className,
	disabled,
	onBlur,
	onFocus,
	...inputProps
}: AutocompleteProps<T>) {
	const listboxId = useId();
	const inputRef = useRef<HTMLInputElement | null>(null);

	const [inputValue, setInputValue] = useState(() =>
		value ? getItemLabel(value) : "",
	);
	const [syncedValue, setSyncedValue] = useState(value);
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const [syncedItems, setSyncedItems] = useState(items);

	if (value !== syncedValue) {
		setSyncedValue(value);
		setInputValue(value ? getItemLabel(value) : "");
	}

	if (items !== syncedItems) {
		setSyncedItems(items);
		setActiveIndex(-1);
	}

	const query = inputValue.trim();
	const isQueryTooShort = query.length < minQueryLength;
	const searchQuery = value || isQueryTooShort ? "" : query;
	const debouncedSearchQuery = useDebounce(searchQuery, debounceMs);
	const isSearching = isLoading || searchQuery !== debouncedSearchQuery;

	useEffect(() => {
		onSearchChange(debouncedSearchQuery);
	}, [debouncedSearchQuery, onSearchChange]);

	const isListVisible = isOpen && !value && query.length > 0;
	const optionId = (index: number) => `${listboxId}-option-${index}`;

	const isEnabled = (index: number) => {
		const item = items[index];
		return item !== undefined && !isItemDisabled?.(item);
	};

	const moveActive = (step: 1 | -1) => {
		if (items.length === 0) return;

		let next = activeIndex;
		for (let attempt = 0; attempt < items.length; attempt += 1) {
			next = (next + step + items.length) % items.length;
			if (isEnabled(next)) break;
		}

		setActiveIndex(next);
		document
			.getElementById(optionId(next))
			?.scrollIntoView({ block: "nearest" });
	};

	const select = (item: T) => {
		setSyncedValue(item);
		setInputValue(getItemLabel(item));
		setIsOpen(false);
		onChange(item);
	};

	const clear = () => {
		setSyncedValue(null);
		setInputValue("");
		onChange(null);
		inputRef.current?.focus();
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		setIsOpen(true);
		setActiveIndex(-1);

		if (value) {
			setSyncedValue(null);
			onChange(null);
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		switch (event.key) {
			case "ArrowDown":
			case "ArrowUp":
				event.preventDefault();
				setIsOpen(true);
				moveActive(event.key === "ArrowDown" ? 1 : -1);
				break;
			case "Enter":
				if (isListVisible && isEnabled(activeIndex)) {
					event.preventDefault();
					select(items[activeIndex]);
				}
				break;
			case "Escape":
				if (isListVisible) {
					event.preventDefault();
					event.stopPropagation();
					setIsOpen(false);
				}
				break;
		}
	};

	const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
		setIsOpen(true);
		onFocus?.(event);
	};

	const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
		setIsOpen(false);
		onBlur?.(event);
	};

	const renderStatus = () => {
		if (isQueryTooShort) {
			return `Введите минимум ${minQueryLength} ${pluralize(minQueryLength, {
				one: "символ",
				few: "символа",
				many: "символов",
			})}`;
		}
		if (isSearching && items.length === 0) {
			return (
				<span className="inline-flex items-center gap-2">
					<Spinner className="size-3.5" />
					Поиск…
				</span>
			);
		}
		if (items.length === 0) return emptyMessage;
		return null;
	};

	const status = isListVisible ? renderStatus() : null;
	const hasClearButton = !disabled && (value !== null || inputValue !== "");

	return (
		<div className="relative">
			<Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<input
				{...inputProps}
				ref={(node) => {
					inputRef.current = node;
					assignRef(ref, node);
				}}
				type="text"
				role="combobox"
				autoComplete="off"
				aria-autocomplete="list"
				aria-expanded={isListVisible}
				aria-controls={listboxId}
				aria-activedescendant={
					isListVisible && activeIndex >= 0 ? optionId(activeIndex) : undefined
				}
				value={inputValue}
				disabled={disabled}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
				onBlur={handleBlur}
				className={cn(
					"placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent py-1 pr-9 pl-9 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
					className,
				)}
			/>
			{hasClearButton && (
				<button
					type="button"
					tabIndex={-1}
					aria-label="Очистить"
					onMouseDown={(event) => event.preventDefault()}
					onClick={clear}
					className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex w-9 items-center justify-center"
				>
					<X className="size-4" />
				</button>
			)}
			{isListVisible && (
				<div
					className="bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute top-full right-0 left-0 z-50 mt-1 overflow-hidden rounded-md border shadow-md"
					onMouseDown={(event) => event.preventDefault()}
				>
					{status ? (
						<p
							role="status"
							className="text-muted-foreground px-3 py-2.5 text-sm"
						>
							{status}
						</p>
					) : (
						<ul
							id={listboxId}
							role="listbox"
							className={cn(
								"max-h-64 overflow-y-auto p-1 transition-opacity",
								isSearching && "opacity-60",
							)}
						>
							{items.map((item, index) => {
								const isDisabled = isItemDisabled?.(item) ?? false;
								const isActive = index === activeIndex;

								return (
									<li
										key={getItemKey(item)}
										id={optionId(index)}
										role="option"
										aria-selected={isActive}
										aria-disabled={isDisabled}
										onMouseEnter={() => !isDisabled && setActiveIndex(index)}
										onClick={() => !isDisabled && select(item)}
										className={cn(
											"cursor-pointer rounded-sm px-2 py-1.5 text-sm select-none",
											isActive && "bg-accent text-accent-foreground",
											isDisabled && "cursor-not-allowed opacity-50",
										)}
									>
										{renderItem(item)}
									</li>
								);
							})}
						</ul>
					)}
				</div>
			)}
		</div>
	);
}

export { Autocomplete };
