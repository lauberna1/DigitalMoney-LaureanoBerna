export interface User {
  dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
}

export interface Account {
  id: number;
  alias: string;
  available_amount: number;
  cvu: string;
  user_id: number;
}

export interface Transaction {
  id: number;
  account_id: number;
  amount: number;
  dated: string;
  description: string;
  destination: string;
  origin: string;
  type: string;
}

export interface Card {
  id: number;
  account_id: number;
  number_id: number;
  first_last_name: string;
  cod: number;
  exporation_date: string;
}

export interface CardData {
  number: string;
  fullName: string;
  expiration: string;
  cvv: string;
}

export interface Service {
  id: number;
  name: string;
  date: string;
  invoice_value?: number;
}
