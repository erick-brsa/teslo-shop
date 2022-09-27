import { IUser } from './';

export interface IOrder {
	_id?: string;
	user?: IUser | string;
	orderItems: IOrderItem[];
	ShippingAddress: ShippingAddress;
	paymentResult?: string;
    
	numberOfItems: number;
	subTotal: number;
	total: number;
	tax: number;
    
    isPaid: boolean;
    paidAt?: string;
}

export interface IOrderItem {
	_id: string;
	title: string;
	size: string;
	quantity: number;
	slug: string;
	image: string;
	price: string;
}

export interface ShippingAddress {
	firstName: string;
	lastName: string;
	address: string;
	address2?: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
}
