export interface ICreate {
  name: string;
  email: string;
  password: string;
}

export interface IEmailUser {
  email: string;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IPagination {
  pageNumber: number;
  pageSize: number;
}
