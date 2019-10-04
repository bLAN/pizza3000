import * as path from 'path'
import '@tsed/swagger'
import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from '@tsed/common'
import * as cookieParser from 'cookie-parser'
import * as compress from 'compression'
import * as methodOverride from 'method-override'
import * as bodyParser from 'body-parser'
import * as history from 'connect-history-api-fallback'
import { typeorm } from './TypeOrm'
import * as Express from 'express'
import * as cors from 'cors'
import { v4 } from 'uuid'

const rootDir = __dirname
const publicDir = path.join(
	rootDir,
	process.env.NODE_ENV === 'production' ? '/../../../public/' : '/../public/'
)

const jwtSecret = v4()

@ServerSettings({
	rootDir,
	publicDir,
	httpPort: 8081,
	httpsPort: false,
	acceptMimes: ['application/json', 'multipart/form-data'],
	componentsScan: [
		'${rootDir}/middlewares/**/*.{js,ts}',
		'${rootDir}/services/**/*.{js,ts}',
		'${rootDir}/extensions/**/*.{js,ts}',
	],
	mount: {
		'/api': [
			'${rootDir}/controllers/**/*.{js,ts}'
		]
	},
	statics: {
		'/': `${rootDir}/uploads/**/*`
	},
	typeorm: [typeorm],
	swagger: [
		{
			path: "/docs"
		}
	]
})
export class Server extends ServerLoader {
	constructor() {
		super()
	}

	public $onMountingMiddlewares() {
		this.use(GlobalAcceptMimesMiddleware)
			.use(history())
			.use(cookieParser())
			.use(compress())
			.use(methodOverride())
			.use(bodyParser.json())
			.use(
				bodyParser.urlencoded({
					extended: true
				})
			)
			.use(cors())
			.use(Express.static(publicDir, { fallthrough: true }))

		return null
	}

	public $onReady() {
		console.log('Server started...')
	}

	public $onServerInitError(error: any): any {
		console.error(error)
	}
}
