import { storeDataToStorage } from "@utils/helper";
import { StateCreator } from "zustand";

export interface ICartState {
  cart: Cart[] | [];
  addToCart: (item: Cart) => void;
  removeFromCart: (item: Cart) => void;
  clearCart: () => void;
}

export interface Cart {
  id: string;
  name: string;
  price: number;
  friendPhone?: string;
}

export const createCartSlice: StateCreator<ICartState> = (set) => ({
  cart: [],
  addToCart: (item) => {
    set((state) => {
      const cartItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (cartItem) {
        const newCartItem = state.cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                price: cartItem.price + item.price,
                friendPhone: item.friendPhone,
              }
            : cartItem
        );
        return {
          cart: newCartItem,
        };
      }
      return {
        cart: [...state.cart, item],
      };
    });
  },

  removeFromCart: (item) =>
    set((state) => ({
      cart: state.cart.filter((cartItem) => cartItem !== item),
    })),
  clearCart: () =>
    set(() => ({
      cart: [],
    })),
});

// cartItem.id === item.id
// ? {
//     ...cartItem,
//     price: cartItem.price + item.price,
//     friendPhone: item.friendPhone,
//   }
// : cartItem;

// return {
//   cart: state.cart.map((cartItem) =>
//     cartItem.id === item.id
//       ? {
//           ...cartItem,
//           price: cartItem.price + item.price,
//           friendPhone: item.friendPhone,
//         }
//       : cartItem
//   ),
// };
