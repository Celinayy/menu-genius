import { ComponentType, Fragment, memo, useEffect } from "react";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/router";
import { User } from "@prisma/client";

export interface WithAuthenticationWrappedComponentProps {
  user: User;
}

export const withAuthentication = <
  T extends WithAuthenticationWrappedComponentProps = WithAuthenticationWrappedComponentProps
>(
  WrappedComponent: ComponentType<T>
) => {
  const ComponentWithAuthentication = memo(
    (props: Omit<T, "user">) => {
      const router = useRouter();

      const { data: user, isLoading } = trpc.user.find.useQuery();

      useEffect(() => {
        if (!user && !isLoading) {
          router.replace("/");
        }
      }, [isLoading, user]);

      if (isLoading) {
        return <Fragment />;
      }

      return <WrappedComponent {...(props as T)} user={user} />;
    },
    () => true
  );

  const displayName = WrappedComponent.displayName;
  ComponentWithAuthentication.displayName = `withAuthentication(${displayName})`;

  return ComponentWithAuthentication;
};
