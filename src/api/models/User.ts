export interface IUser {
	id: string,
	phone: string,
	mail: string,
	name: string,
}

export type CreateUserRequestType = Omit<IUser, 'id'> & {
	id?: string
};
