import { PrismaClient } from '@prisma/client';
import {
    AuthTypes,
    Connector,
    IpAddressTypes,
} from '@google-cloud/cloud-sql-connector';

export const prisma = new PrismaClient();

// setup cloud sql + connector to prisma