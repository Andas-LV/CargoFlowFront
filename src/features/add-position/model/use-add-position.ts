import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	positionApi,
	positionQueries,
	type AddPositionPayload,
} from "@/entities/position";

export const useAddPosition = (shipmentId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: AddPositionPayload) =>
			positionApi.add(shipmentId, payload),
		onSuccess: (position) => {
			queryClient.setQueryData(
				positionQueries.route(shipmentId).queryKey,
				(route = []) => [...route, position],
			);
			toast.success(`Станция «${position.station}» отмечена`);
		},
	});
};
