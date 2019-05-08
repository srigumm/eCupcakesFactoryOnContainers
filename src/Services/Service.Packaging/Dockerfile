FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /src

COPY src/Common.Utils/ /src/Common.Utils/
COPY src/Services/Service.Packaging/BoxingService.csproj /src/Services/HostedService.Packaging/

RUN dotnet restore /src/Services/HostedService.Packaging/BoxingService.csproj

WORKDIR /src/Services/HostedService.Packaging
COPY src/Services/Service.Packaging/ .

RUN dotnet build ./BoxingService.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish ./BoxingService.csproj -c Release -o /app

#FROM build as unittest
#WORKDIR /src/src/Services/Ordering/Ordering.UnitTests

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "BoxingService.dll"]