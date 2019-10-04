import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Res } from '@tsed/common'
import { RepositoryService } from '../services/RepositoryService'
import { OrderService } from '../services/OrderService'
import { Docs, Summary } from '@tsed/swagger'
import { ItemService } from '../services/ItemService'
import { BadRequest, Gone, InternalServerError } from 'ts-httpexceptions'
import { Order } from '../entities/Order'
import { Except } from 'type-fest'
import { Response } from 'express'

@Controller('/orders')
@Docs()
export class OrderController {
	constructor(
		private readonly orderService: OrderService,
		private readonly itemService: ItemService
	) {}

	@Get('/')
	@Summary('Get orders')
	async index() {
		return this.orderService.getOrders()
	}

	@Post('/')
	async create(@BodyParams() {customerName, itemId}: { customerName: string, itemId: string }) {
		if (customerName.trim().length === 0) {
			throw new BadRequest('CustomerName must not be blank')
		}
		const canOrder = await this.itemService.canOrderItem(itemId)
		if (!canOrder) {
			throw new Gone('The item you requested is not available')
		}

		return this.orderService.createOrder(customerName, itemId)
	}

	@Put('/:id')
	async update(@PathParams('id') id: string, @BodyParams() order: Except<Order, 'item'>) {
		if (id !== order.id) {
			throw new BadRequest('Cannot change the id of a resource')
		}

		return this.orderService.updateOrder(order)
	}

	@Delete('/:id')
	async delete(@PathParams('id') id: string, @Res() response: Response) {
		const { affected } = await this.orderService.deleteOrder(id)
		if (typeof affected === 'undefined' || affected < 1) {
			throw new InternalServerError('Couldn\'t delete the record')
		}
		response
			.status(204)
			.send()
	}
}