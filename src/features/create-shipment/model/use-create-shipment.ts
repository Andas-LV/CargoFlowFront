import { useMutation, useQueryClient } from "@tanstack/react-query";

import { shipmentApi, shipmentQueries } from "@/entities/shipment";

export const useCreateShipment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: shipmentApi.create,
		onSuccess: (shipment) => {
			queryClient.setQueryData(
				shipmentQueries.detail(shipment.id).queryKey,
				shipment,
			);
			return queryClient.invalidateQueries({
				queryKey: shipmentQueries.lists(),
			});
		},
	});
};
