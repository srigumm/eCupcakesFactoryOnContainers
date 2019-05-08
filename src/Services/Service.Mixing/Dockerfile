FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /src

COPY src/Common.Utils/ /src/Common.Utils/
COPY src/Services/Service.Mixing/MixingService.csproj /src/Services/HostedService.Mixer/

RUN dotnet restore /src/Services/HostedService.Mixer/MixingService.csproj

WORKDIR /src/Services/HostedService.Mixer
COPY src/Services/Service.Mixing/ .

RUN dotnet build ./MixingService.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish ./MixingService.csproj -c Release -o /app

#FROM build as unittest
#WORKDIR /src/src/Services/Ordering/Ordering.UnitTests

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "MixingService.dll"]