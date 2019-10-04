export interface AfterDBInit {
	$afterDBInit(): void | Promise<any>
}
