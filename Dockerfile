# Install dependencies and build the Next.js app
FROM node:22.13.0 AS build
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Create the runtime container
FROM node:22.13.0 AS runtime
WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
