# 베이스 이미지 설정
FROM node:14 AS build

# 작업 디렉토리 설정(docker에서 app이라는 디렉터리를 만듦)
WORKDIR /app

# package.json 및 package-lock.json 파일 복사
COPY package*.json ./

COPY .env ./
# 의존성 설치
RUN npm install

# 나머지 애플리케이션 코드 복사

COPY . .

# 실행 권한 부여
RUN chmod +x /app/node_modules/.bin/tsc && chmod +x /app/node_modules/.bin/vite

# React 애플리케이션 빌드
RUN npm run build

# 2단계: Nginx를 사용하여 애플리케이션 제공
FROM nginx:alpine

# 빌드된 파일들을 Nginx HTML 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 사용자 정의 Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 포트 3000 노출
EXPOSE 80
EXPOSE 443

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
