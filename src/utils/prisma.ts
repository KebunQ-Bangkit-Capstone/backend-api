import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import {
    AuthTypes,
    Connector,
    IpAddressTypes,
} from "@google-cloud/cloud-sql-connector";

const path = resolve(".s.PGSQL.5432"); // socket filename
const connector = new Connector();

async function startProxy() {

    await connector.startLocalProxy({
        instanceConnectionName: String(process.env.INSTANCE_CONNECTION_NAME),
        ipType: IpAddressTypes.PUBLIC,
        authType: AuthTypes.IAM,
        listenOptions: { path },
    });
}

startProxy().catch(console.error);

const datasourceUrl = process.env.DATABASE_URL; // Use localhost for local proxy
export const prisma = new PrismaClient({ datasourceUrl });
