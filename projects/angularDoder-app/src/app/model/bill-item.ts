export class BillItem {
    id: number;
	quantity: number;
	unitPrice: number;
	description: string;
	get totalPrice(): number {
		return this.quantity * this.unitPrice;
	}
}