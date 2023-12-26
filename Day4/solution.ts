type Address = { address: string; city: string };

type PresentDeliveryList<Object> = Record<keyof Object, Address>;

export { PresentDeliveryList, Address };
