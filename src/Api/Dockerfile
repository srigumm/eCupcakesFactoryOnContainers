FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /src

COPY src/Common.Utils/ /src/Common.Utils/
COPY src/Api/Api.csproj /src/OrderMicroService/

RUN dotnet restore /src/OrderMicroService/Api.csproj

WORKDIR /src/OrderMicroService
COPY src/Api/ .

RUN dotnet build ./Api.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish ./Api.csproj -c Release -o /app

#FROM build as unittest
#WORKDIR /src/src/Services/Ordering/Ordering.UnitTests

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Api.dll"]