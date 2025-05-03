import { z } from 'zod';
import { formatNumberWithDecimalPlaces } from './utils';

const currency = z
	.string()
	.refine(
		(value) =>
			/^\d+(\.\d{2})?$/.test(formatNumberWithDecimalPlaces(Number(value))),
		'Price must have exactly two decimal places'
	);

// Schema for inserting products
export const insertProductSchema = z.object({
	name: z.string().min(3, 'Name must be a least 3 characters'),
	slug: z.string().min(3, 'Slug must be a least 3 characters'),
	category: z.string().min(3, 'Category must be a least 3 characters'),
	brand: z.string().min(3, 'Brand must be a least 3 characters'),
	description: z.string().min(3, 'Description must be a least 3 characters'),
	stock: z.coerce.number(),
	images: z.array(z.string()).min(1, 'Product must have at least one image'),
	isFeatured: z.boolean(),
	banner: z.string().nullable(),
	price: currency,
});
