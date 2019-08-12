import { Province } from "./province";

export class Customer {
	constructor() {
		this.id = 0;
		this.name = "";
		this.address = "";
	}

    id: number;
	name: string;
	address: string;
	provinceId: number;
	province: Province;
}
