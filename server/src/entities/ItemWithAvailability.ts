import { Column, Connection, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from 'typeorm'
import { Item } from './Item'
import { Order } from './Order'

@ViewEntity({
	expression: (connection: Connection) => connection.createQueryBuilder()
		.select("item.*", "id")
		.from(Item, "item")
		.leftJoin('order', 'orders', 'orders."itemId" = item.id')
		.addSelect('COUNT(orders.id)', 'sold')
		.addGroupBy('item.id')
})
export class ItemWithAvailability {
	@ViewColumn()
	id!: string

	@ViewColumn()
	name!: string

	@ViewColumn()
	quantity!: number

	@ViewColumn()
	sold!: string
}