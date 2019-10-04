import { Service } from '@tsed/di'
import { RepositoryService } from './RepositoryService'
import { ItemWithAvailability } from '../entities/ItemWithAvailability'

@Service()
export class ItemService {
	constructor(
		private readonly repoService: RepositoryService
	) {}

	private get itemWithAvailabilityRepo() {
		return this.repoService.getRepository(ItemWithAvailability)
	}

	getItems() {
		return this.itemWithAvailabilityRepo.find()
	}

	async canOrderItem(itemId: string) {
		const item = await this.itemWithAvailabilityRepo.findOne({ id: itemId })
		if (!item) return false

		const sold = parseInt(item.sold)
		return sold < item.quantity
	}
}