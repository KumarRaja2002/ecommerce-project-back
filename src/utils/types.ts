import { NewProduct, Product, ProductTable } from "../schemas/product";
import { NewUser, User, UserTable } from "../schemas/user";

export type DBRecord = User | Product
export type NewDBRecord = NewUser | NewProduct
export type DBTable = UserTable | ProductTable
