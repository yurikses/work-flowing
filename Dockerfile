# Используем официальный образ Node.js
FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Экспорт порта
EXPOSE 3000

# Запуск приложения
CMD ["npm", "run", "dev", "--watch"]