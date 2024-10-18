# Use a imagem base oficial do Node.js
FROM node:16-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se houver) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
#RUN npm install --frozen-lockfile
RUN npm ci

# Copie o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Construa a aplicação Next.js
RUN npm run build

RUN chmod -R 755 /app/public/uploads

# Exponha a porta onde o Next.js rodará
EXPOSE 3000

# Comando para iniciar a aplicação Next.js
CMD ["npm", "start"]
