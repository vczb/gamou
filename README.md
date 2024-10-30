# Gamou

## Requirements

- docker
- nodejs 18.x

## Stack

- [TypeScript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [KnexJS](https://knexjs.org/)

## Envirovment variables

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
TOKEN_SECRET=GAMOU
NEXT_PUBLIC_GTM_ID=
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

docker migrations

```bash
$ docker exec -it gamou_app npx knex migrate:latest
```

stop docker container

```bash
$ docker stop gamou_app
```

docker cleanup

```bash
$ docker system prune
```

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial (CC BY-NC) license](./LICENSE).
