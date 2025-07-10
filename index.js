const { InfisicalSDK } = require("@infisical/sdk");
const { parse } = require("@dotenvx/dotenvx");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const { CONFIG } = require("./config.js");

const client = new InfisicalSDK({
	siteUrl: CONFIG.INFISICAL_HOST,
});

const getEnv = async (envType, app) => {
	console.info(`Fetching ${app} ${envType} secrets from Infisical...`);

	const { secrets } = await client.secrets().listSecrets({
		environment: envType,
		projectId: CONFIG.INFISICAL_PROJECT_ID,
		secretPath: `/${app}`,
	});

	console.info(`Fetched ${secrets.length} ${app} ${envType} secrets.`);

	const env = secrets.reduce((acc, secret) => {
		acc[secret.secretKey] = secret.secretValue;
		return acc;
	}, {});

	const appFolder = join(__dirname, "..", app);
	const exampleEnv = parse(
		readFileSync(join(appFolder, ".env.example")),
		"utf-8",
	);

	Object.keys(env).forEach((key) => {
		exampleEnv[key] = env[key];
	});

	const envString = Object.entries(exampleEnv)
		.map(([key, value]) => `${key}="${value}"`)
		.join("\n");

	console.info(
		`Writing ${app} ${envType} secrets to .env.${envType} file...`,
	);

	writeFileSync(join(appFolder, `.env.${envType}`), envString, "utf-8");

	console.info(`${app} ${envType} secrets written to .env.${envType} file.`);
};

const main = async () => {
	await client.auth().universalAuth.login({
		clientId: CONFIG.INFISICAL_CLIENT_ID,
		clientSecret: CONFIG.INFISICAL_CLIENT_SECRET,
	});

	for (const appType of CONFIG.APP_FOLDERS) {
		for (const envType of CONFIG.ENV_TYPES) {
			await getEnv(envType, appType);
		}
	}

	console.log("Environment variables updated successfully in .env files.");
};

main();
