import { trpc } from "@/trpc/client";
import { useRouter } from "next/router";

const SingleProductPage = () => {
  const router = useRouter();
  const productId = router.query.productId as string;
  const { data: product } = trpc.product.find.useQuery({ productId });

  return;
};

export default SingleProductPage;
