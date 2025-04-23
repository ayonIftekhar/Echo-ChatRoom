FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .  # Copy everything inside EchoRoom/
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
