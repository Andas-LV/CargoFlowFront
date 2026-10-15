"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Autocomplete, type AutocompleteProps } from "@/shared/ui/autocomplete";
import { stationQueries } from "../api/station-queries";
import { getStationName } from "../model/station";
import type { Station } from "../model/types";
import { StationOption } from "./station-option";

const EMPTY_STATIONS: Station[] = [];

type StationAutocompleteProps = Omit<
	AutocompleteProps<Station>,
	| "items"
	| "isLoading"
	| "onSearchChange"
	| "getItemKey"
	| "getItemLabel"
	| "renderItem"
	| "emptyMessage"
>;

const getStationKey = (station: Station) => station.id;

const renderStation = (station: Station) => <StationOption station={station} />;

export function StationAutocomplete({
	placeholder = "Начните вводить название или код ЕСР",
	...props
}: StationAutocompleteProps) {
	const [query, setQuery] = useState("");
	const { data, isFetching } = useQuery({
		...stationQueries.search(query),
		placeholderData: keepPreviousData,
	});

	return (
		<Autocomplete<Station>
			{...props}
			placeholder={placeholder}
			items={query ? (data ?? EMPTY_STATIONS) : EMPTY_STATIONS}
			isLoading={isFetching}
			onSearchChange={setQuery}
			getItemKey={getStationKey}
			getItemLabel={getStationName}
			renderItem={renderStation}
			emptyMessage="Станция не найдена"
		/>
	);
}
