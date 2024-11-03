#!/bin/sh

set -e

echo "Running Prisma generate"
npx prisma generate

echo "Waiting for Postgres to be ready"
./wait-for-postgres.sh shorten-link-pg

echo "Running Prisma migrations"
npx prisma migrate deploy

echo "Starting application"
npm start
