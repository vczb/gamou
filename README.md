# Gamou

## Requirements

- docker
- nodejs 16.x

## Stack

- [TypeScript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [KnexJS](https://knexjs.org/)

## Envirovment variables

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
TOKEN_SECRET=GAMOU
```

## (localhost) Install & run

```bash
$ docker compose build
```

```bash
$ docker compose up db -d
```

```bash
$ npm ci
```

```bash
$ npx knex migrate:latest
```

```bash
$ npm run dev
```

```
http://localhost:3000/
```

## Tips

open psql on localhost

```bash
$ docker exec -it gamou_db psql -U gamou_user -d gamou_db
```

stop docker container

```bash
$ docker stop gamou_app
```

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial (CC BY-NC) license](./LICENSE).
