import { PermissionCheckType } from "./permission-check-type.enum";

export class SecurityConfig {
	constructor(public allowAnonymous: boolean = false, 
				public permissions: string[] = [], 
				public permissionCheckType: PermissionCheckType = PermissionCheckType.atLeastOne) {
	}
}