import { BillItem } from "./bill-item";

export class Bill {
    date: Date;
	items: BillItem[];
	get total(): number {
		let sum = 0;
		this.items.forEach(item => {
			sum += item.totalPrice;
		});
		return sum;
	}
}