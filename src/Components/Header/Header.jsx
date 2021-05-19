import React from "react";

import FulscrnWrpr from "../FulscrnWrpr/FulscrnWrpr";
import Logo from "../Logo/Logo";

import * as styles from "./Header.module.scss";

const Header = () => {
  return (
    <FulscrnWrpr
      className={styles.Header}
      containerClassName={styles.container}
    >
      <div>
        <div style={{ width: "300px", height: "300px", backgroundColor: "blue" }}>
          <Logo />
        </div>
      </div>
    </FulscrnWrpr>
  );
};

export default Header;
