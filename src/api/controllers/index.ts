import type { AxiosInstance } from 'axios';
import UserController from './User.controller';
import TestController from './Test.controller';

class Controllers {
	/** API client instance */
	client: AxiosInstance = null!;
	User: UserController;
	Test: TestController;
	
	constructor(client: AxiosInstance) {
		this.client = client;
		this.User = new UserController(this.client);
		this.Test = new TestController(this.client);
	}
}

export default Controllers;
