import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	SHIPMENT_STATUS_LABEL,
	shipmentApi,
	shipmentQueries,
	type ShipmentStatus,
} from "@/entities/shipment";
import { getErrorMessage } from "@/shared/api";

export const useChangeShipmentStatus = (shipmentId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (status: ShipmentStatus) =>
			shipmentApi.updateStatus(shipmentId, status),
		onSuccess: (shipment) => {
			queryClient.setQueryData(
				shipmentQueries.detail(shipment.id).queryKey,
				shipment,
			);
			toast.success(
				`Статус изменён: ${SHIPMENT_STATUS_LABEL[shipment.status]}`,
			);
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
			return queryClient.invalidateQueries({
				queryKey: shipmentQueries.detail(shipmentId).queryKey,
			});
		},
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: shipmentQueries.lists() }),
	});
};
