import * as React from "react";

interface Props extends React.PropsWithChildren<{}> {}

export const Layout = ({ children }: Props) => <div>{children}</div>;
