import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// const adapter = new PrismaNeon(pool);
export const prisma = new PrismaClient().$extends({
	result: {
		product: {
			price: {
				compute(product) {
					return product.price.toString();
				},
			},
			rating: {
				compute(product) {
					return product.rating.toString();
				},
			},
		},
	},
});
