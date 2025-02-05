import React, { createContext, useContext } from "react";
import styles from "./Tab.module.css"; // Import CSS module

export const TabStore = createContext(null);

const Tab = ({ children, currentTab, changeTab }) => {
  return (
    <TabStore.Provider value={{ currentTab, changeTab }}>
      <div className={styles.tabContainer}>{children}</div>
    </TabStore.Provider>
  );
};

const HeaderContainer = ({ children }) => {
  return <div className={styles.tabHeader}>{children}</div>;
};

const Item = ({ label, index }) => {
  const { currentTab, changeTab } = useContext(TabStore);
  return (
    <button
      className={`${styles.tabItem} ${currentTab === index ? styles.active : ""}`}
      onClick={() => changeTab(index)}
    >
      {label}
    </button>
  );
};

const Container = ({ children }) => {
  return <div className={styles.tabContentContainer}>{children}</div>;
};

const ContentItem = ({ children, index }) => {
  const { currentTab } = useContext(TabStore);
  return currentTab === index ? <div className={styles.tabContent}>{children}</div> : null;
};

// Assign components to Tab
Tab.HeaderContainer = HeaderContainer;
Tab.Item = Item;
Tab.Container = Container;
Tab.ContentItem = ContentItem;

export default Tab;
