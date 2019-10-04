import { Controller, Get } from '@tsed/common'
import { ItemService } from '../services/ItemService'

@Controller('/items')
export class ItemsController {
	constructor(
		private readonly itemService: ItemService
	) {}

	@Get('/')
	async index() {
		return this.itemService.getItems()
	}
}