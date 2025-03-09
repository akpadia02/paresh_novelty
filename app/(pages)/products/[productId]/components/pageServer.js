// app/product/[productId]/PageServer.js (Server Component)
import { getProduct } from '@/lib/firestore/products/read_server';
import PageClient from './pageClient';

export default async function PageServer({ params }) {
  const awaitedParams = await params; // ✅ Await params first
  const { productId } = awaitedParams;
  const product = await getProduct({ id: productId });

  return <PageClient product={product} />;
}
