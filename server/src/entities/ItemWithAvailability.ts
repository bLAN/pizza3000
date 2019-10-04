import { Column, Connection, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from 'typeorm'
import { Item } from './Item'
import { Order } from './Order'

@ViewEntity({
	expression: (connection: Connection) => connection.createQueryBuilder()
		.select("item.*", "id")
		.from(Item, "item")
		.leftJoin(Order, 'orders', 'orders."itemId" = item.id')
		.addGroupBy('item.id')
		.addSelect('COUNT(item.id)', 'sold')
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