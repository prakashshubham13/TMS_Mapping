import React, { useState } from "react";
import Notes from "./Notes";
import Tab from "./Tab";
import IbgNotes from "./IbgNotes";

const AllNotes = (props) => {
  const [currentTab, changeTab] = useState(2);
  return (
    <>
      <Tab currentTab={currentTab} changeTab={(ind) => changeTab(ind)}>
        <Tab.HeaderContainer>
          {/* <Tab.Item label={"TE"} index={1} /> */}
          <Tab.Item label={"Xpath"} index={2} />
          <Tab.Item label={"IBG"} index={3} />
        </Tab.HeaderContainer>
        <Tab.Container>
          {/* <Tab.ContentItem index={1}>
            <Notes title="te" {...props} />
          </Tab.ContentItem> */}
          <Tab.ContentItem index={2}>
            <Notes title="xpath" {...props} />
          </Tab.ContentItem>
          <Tab.ContentItem index={3}>
            <IbgNotes title="ibg" {...props} />
          </Tab.ContentItem>
        </Tab.Container>
      </Tab>
    </>
  );
};

export default AllNotes;
