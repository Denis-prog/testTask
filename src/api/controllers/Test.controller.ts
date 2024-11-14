import type { AxiosInstance, AxiosResponse } from 'axios';

class TestController {
	private client: AxiosInstance = null!;

	constructor(client: AxiosInstance) {
		this.client = client;
	}

	async resetDb(): Promise<AxiosResponse> {
		return this.client.post(`/reloadDB`);
	}

	
}

export default TestController;
