import React from "react";

interface InnerLayout {
  children: React.ReactNode;
}

interface Props {
  children: React.ReactNode;
  Layout: ({ children }: InnerLayout) => JSX.Element;
}

const Layout = ({ children, Layout }: Props) => {
  return (
    <React.Fragment>
      <Layout>{children}</Layout>
    </React.Fragment>
  );
};

export default Layout;
