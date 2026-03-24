import React, { Suspense } from "react";

import { constructMetadata } from "@/src/utils/metadata";
import SocialContainer from "@/src/features/social/pages/SocialPagesContainer";
import SocialLoading from "@/src/features/social/components/SocialLoading";

export const metadata = constructMetadata({
  title: "Social",
});

const Social = async () => {
  return (
    <Suspense fallback={<SocialLoading />}>
      <SocialContainer />
    </Suspense>
  );
};

export default Social;
