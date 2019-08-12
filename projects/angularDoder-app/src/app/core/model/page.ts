export class Pager{
	constructor() {
		this.offset = 0;
		this.limit = 10;
		this.count = 0;
	}
	
	offset: number;
	limit: number;
	count: number;
	
	public get pageNumber() : number {
		return (this.offset / this.limit) + 1;
	}

	public get pageCount(): number {
		return Math.ceil(this.count / this.limit);
	}	
	
}

export class Page<T> {
	constructor(){
		this.pager = new Pager();
	}
	
	pager: Pager;
	results: T[];
}