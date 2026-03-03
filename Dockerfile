FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /app

# Copia arquivos de dependência primeiro (melhora cache)
COPY package*.json ./
RUN npm ci

# Copia o restante do código
COPY . .

# Compila TypeScript
RUN npm run build

# Railway usa PORT
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]