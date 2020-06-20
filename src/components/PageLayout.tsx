import React from "react";

export interface IPageLayoutProps extends React.PropsWithChildren<any> {}

const PageLayout = (props: IPageLayoutProps) => {
  return (
    <div style={{ padding: "0px 32%" }}>
      <div>{props.children}</div>
    </div>
  );
};

export default PageLayout;
