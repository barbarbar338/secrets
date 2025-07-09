# Infisical Secrets Manager Wrapper

A simple wrapper for Infisical Secrets Manager to manage secrets in a monorepo setup.

## Usage

- Add your secrets to Infisical.
- Create a `.env.example` file in the root of each app in monorepo with the example secrets. For example:

```env
# /backend/.env.example
PORT=3000
DB_PORT=5432
DB_NAME=
DB_HOST=
DB_PASSWORD=
DB_USER=
```

```env
# /frontend/.env.example
PORT=3000
```

- Add this repository as a submodule to your monorepo.
- Copy the `.env.example` file to `.env` file in secrets manager root directory and fill it with the secrets from Infisical.
- Run `yarn start` to fetch the secrets.
