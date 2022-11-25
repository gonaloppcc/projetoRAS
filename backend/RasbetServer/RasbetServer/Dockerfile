FROM mcr.microsoft.com/dotnet/runtime:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["RasbetServer/RasbetServer.csproj", "RasbetServer/"]
RUN dotnet restore "RasbetServer/RasbetServer.csproj"
COPY . .
WORKDIR "/src/RasbetServer"
RUN dotnet build "RasbetServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RasbetServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RasbetServer.dll"]
