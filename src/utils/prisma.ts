import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import {
  AuthTypes,
  Connector,
  IpAddressTypes,
} from "@google-cloud/cloud-sql-connector";

const path = resolve(".s.PGSQL.5432"); // postgres-required socket filename
const connector = new Connector();
await connector.startLocalProxy({
  instanceConnectionName: "bangkit-capstone-kebunq:us-central1:kebunq-sql",
  ipType: IpAddressTypes.PUBLIC,
  authType: AuthTypes.IAM,
  listenOptions: { path },
});

// note that the host parameter needs to point to the parent folder of
// the socket provided in the `path` Connector option, in this example
// that is going to be the current working directory
const datasourceUrl = `postgresql://postgres:masfarhandouble@localhost/kebunq-sql`;
export const prisma = new PrismaClient({ datasourceUrl });
