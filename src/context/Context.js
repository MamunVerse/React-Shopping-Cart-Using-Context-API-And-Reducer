import { createContext, useContext, useReducer } from "react";
import faker from "faker";
import { productReducer, filterReducer } from "./Reducers";

const ContextAPI = createContext();


const Context = ({ children }) => {

  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [productState, productDispatch] = useReducer(productReducer, {
    products: products,
    cart: [],
  });

  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <ContextAPI.Provider value={{ productState, productDispatch, filterState, filterDispatch }}>
      {children}
    </ContextAPI.Provider>
  );
};

export const MainStore = () => {
  return useContext(ContextAPI);
};

export default Context;
