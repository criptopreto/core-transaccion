import { useRouter } from "next/router";
import React from "react";

export default function Verify() {
  const router = useRouter();
  const query = router.query;
  return <div>verify</div>;
}
