import { isNil } from 'lodash';

export enum ENV_KEYS {
	JWT_SECRET = 'JWT_SECRET',
	NODE_ENV = 'NODE_ENV',
	PORT = 'PORT',
	MONGO_URI = 'MONGO_URI',
}

export let ENV: any;

export function loadEnv() {
	ENV = {
		[ENV_KEYS.JWT_SECRET]: process.env.JWT_SECRET || '',
		[ENV_KEYS.NODE_ENV]: process.env.NODE_ENV || '',
		[ENV_KEYS.PORT]: process.env.PORT || '',
		[ENV_KEYS.MONGO_URI]: process.env.MONGO_URI || '',
	};
	return ENV;
}

export function getEnvKey(envKey: ENV_KEYS): string {
	if (isNil(ENV[envKey])) {
		throw new Error('ENV Key does not exists');
	}

	return ENV[envKey];
}

interface env {
	[ENV_KEYS.JWT_SECRET]: string;
	[ENV_KEYS.NODE_ENV]: string;
	[ENV_KEYS.PORT]: string;
	[ENV_KEYS.MONGO_URI]: string;
}

export class envHandler {
	private env: env;

	constructor() {
		this.env = {
			[ENV_KEYS.JWT_SECRET]: process.env.JWT_SECRET || '',
			[ENV_KEYS.NODE_ENV]: process.env.NODE_ENV || '',
			[ENV_KEYS.PORT]: process.env.PORT || '',
			[ENV_KEYS.MONGO_URI]: process.env.MONGO_URI || '',
		};
	}

	public get(key: ENV_KEYS) {
		const value = this.env[key];
		if (value === '') throw new Error(`${key} not set in env`);
		return value;
	}
}
