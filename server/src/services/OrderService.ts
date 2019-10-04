import { Service } from '@tsed/di'
import { RepositoryService } from './RepositoryService'
import { Order } from '../entities/Order'
import { Except } from 'type-fest'

@Service()
export class OrderService {
	constructor(
		private readonly repoService: RepositoryService
	) {}

	private get orderRepo() {
		return this.repoService.getRepository(Order)
	}

	getOrders() {
		return this.orderRepo.find()
	}

	createOrder(customerName: string, pizzaId: string) {
		return this.orderRepo.insert({
			customerName,
			item: { id: pizzaId }
		})
	}

	updateOrder(order: Except<Order, "item">) {
		return this.orderRepo.update(order.id, order)
	}

	deleteOrder(orderId: string) {
		return this.orderRepo.delete(orderId)
	}
}