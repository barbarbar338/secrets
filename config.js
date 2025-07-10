const { cleanEnv, str } = require("envalid");

const env = cleanEnv(process.env, {
	INFISICAL_HOST: str(),
	INFISICAL_CLIENT_ID: str(),
	INFISICAL_CLIENT_SECRET: str(),
	INFISICAL_PROJECT_ID: str(),
	APP_FOLDERS: str({
		default: "apps,services,shared",
	}),
	ENV_TYPES: str({
		default: "dev,stg,prod",
	}),
});

exports.CONFIG = {
	...env,
	APP_FOLDERS: env.APP_FOLDERS.split(","),
	ENV_TYPES: env.ENV_TYPES.split(","),
};
