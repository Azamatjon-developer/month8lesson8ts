export interface CounterState {
  value: number;
}

export interface Product{
  id: number,
  title: string,
  price: number
  images: string[]
}

export interface User {
  full_name: string,
  email:string,
  username:string,
  password: string,
}