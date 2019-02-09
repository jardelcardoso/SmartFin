export class UserResponse {
	
	constructor(
		public type?: boolean,
		public usuario?: any,
        public token?: string,
        public config?: any,
        public msg?:string ) {}
}

