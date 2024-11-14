import type { AxiosInstance, AxiosResponse } from 'axios';
import type { CreateUserRequestType, IUser } from '../models';

class UserController {
	private client: AxiosInstance = null!;

	constructor(client: AxiosInstance) {
		this.client = client;
	}

	async getUsers(): Promise<AxiosResponse<Array<IUser>>> {
		return this.client.get(`/users`);
	}

	async deleteUser(id: string) {
		return this.client.delete(`/users/${id}`);
	}

	async addUser(dto: CreateUserRequestType) {
		return this.client.post('/users', dto);
	}

	async updateUser(id: string, dto: IUser) {
		return this.client.patch(`/users/${id}`, dto);
	}

	async addUsers(users: Array<IUser>) {
		return this.client.post(`/usersCollections`, users);
	}
}

export default UserController;
