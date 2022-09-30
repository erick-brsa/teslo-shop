import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';

interface ContextProps {
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
	isLoaded: boolean;

	shippingAddress?: ShippingAddress | undefined;

	// Methods
	addProductToCart: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
    updateAddress: (address: ShippingAddress) => void;

	// Orders
	createOrder: () => Promise<void>;
}

export const CartContext = createContext({} as ContextProps);
