FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /src

COPY src/Common.Utils/ /src/Common.Utils/
COPY src/Services/Service.Baking/BakingService.csproj /src/Services/HostedService.Baking/

RUN dotnet restore /src/Services/HostedService.Baking/BakingService.csproj

WORKDIR /src/Services/HostedService.Baking
COPY src/Services/Service.Baking/ .

RUN dotnet build ./BakingService.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish ./BakingService.csproj -c Release -o /app

#FROM build as unittest
#WORKDIR /src/src/Services/Ordering/Ordering.UnitTests

FROM base AS final

RUN mkdir -p /usr/local/etc/openssl
RUN cd /usr/local/etc/openssl
WORKDIR /usr/local/etc/openssl
RUN curl https://curl.haxx.se/ca/cacert.pem -o cert.pem

WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "BakingService.dll"]