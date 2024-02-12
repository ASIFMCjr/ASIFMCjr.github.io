import { axiosInstance } from 'shared/api';

export interface PrimitiveCart {
	book_id: number;
	amount: number;
}

export interface CartItem extends PrimitiveCart {
	city: string;
	address: string;
	zipcode: string;
	id: number;
	state: string;
	user_id: number;
	warranty_days: number;
	orders_id: string;
	orders_time: string | Date;
}

export interface CartList {
	persons_discounted_price: number;
	products: Array<CartItem>;
	total: number;
}

export interface CartAddress {
	city: string;
	address: string;
	zipcode: string;
}

export interface Order {
	order_id: string;
	total: number;
	persons_discounted_price: number;
	products: Array<CartItem>;
	status: string;
}

export const getCartList = async (): Promise<CartList> =>
	(await axiosInstance.get('api/cart/')).data;
export const getCartItem = async (id: number): Promise<CartItem> =>
	(await axiosInstance.get(`api/cart/${id}`)).data;
export const checkValidZipcode = async (zipcode: number): Promise<boolean> =>
	(await axiosInstance.get('api/cart/check_zipcode/', { params: { zipcode } }))
		.data.is_valid;
export const updateCart = async (item: PrimitiveCart): Promise<CartItem> =>
	(await axiosInstance.patch('api/cart/update_cart/', { cart: [item] })).data;
export const makeOrder = async (address: CartAddress): Promise<Order> =>
	(await axiosInstance.post('api/cart/make_order/', address)).data;
