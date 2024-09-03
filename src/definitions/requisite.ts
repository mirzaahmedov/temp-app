export type RequisiteType = {
  user: UserType;
  bank: BankType;
  shot: ShotType;
  account_number: AccountNumberType;
};

export type UserType = {
  id: string;
  name: string;
  inn: string;
  budget: string;
  user_id: number;
  createdat: string;
  updatedat: string;
};

export type BankType = {
  id: string;
  name: string;
  mfo: string;
  user_id: number;
  createdat: string;
  updatedat: string;
  default_value: boolean;
};

export type ShotType = {
  id: string;
  shot_number: string;
  shot_balance: string;
  user_id: number;
  createdat: string;
  updatedat: string;
  default_value: boolean;
};

export type AccountNumberType = {
  id: string;
  account_number: string;
  user_id: number;
  createdat: string;
  updatedat: string;
  default_value: boolean;
};
