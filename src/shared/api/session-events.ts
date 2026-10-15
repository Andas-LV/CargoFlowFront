type Listener = () => void;

const listeners = new Set<Listener>();

export const sessionEvents = {
	onExpired: (listener: Listener) => {
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	},
	emitExpired: () => {
		listeners.forEach((listener) => listener());
	},
};
