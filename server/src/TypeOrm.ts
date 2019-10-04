import { ConnectionOptions } from 'typeorm'
import * as path from 'path'

export const type : any = process.env.DB_TYPE || 'postgres'
export const host : any = process.env.DB_HOST || 'localhost'
export const port : number = parseInt(process.env.DB_PORT || '5432')
export const username : string = process.env.DB_USERNAME || 'postgres'
export const password : string = process.env.DB_PASSWORD || 'postgres'
export const database : string = process.env.DB_DATABASE || 'pizza'

const entities = path.join(__dirname, '/entities') + '/**/*.{js,ts}'
const migrations = path.join(__dirname, '/../migrations') + '/**/*.{js,ts}'

export const typeorm : ConnectionOptions = {
	name: 'default',
	type,
	host,
	port,
	username,
	password,
	database,
	synchronize: false,
	migrationsRun: true,
	entities: [ entities ],
	migrations: [ migrations ],
	cli: {
		entitiesDir: 'src/entities',
		migrationsDir: 'migrations'
	}
}
