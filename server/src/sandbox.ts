import { createConnection } from 'typeorm'
import { typeorm } from './TypeOrm'
import { Item } from './entities/Item'
import { Order } from './entities/Order'

async function func () {
	const connection = await createConnection(typeorm)

	const qb = connection.createQueryBuilder()
		.select('item.*')
		.from('item', 'item')
		.leftJoin('order', 'orders', 'orders."itemId" = item.id')
		.addSelect('COUNT(orders.id)', 'sold')
		.addGroupBy('item.id')


	const items = await qb.getRawMany()
	items //?
}

func()
