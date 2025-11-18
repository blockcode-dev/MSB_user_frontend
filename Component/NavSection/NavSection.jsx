import React, { useState } from "react";
import styles from "./NavSection.module.scss";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        
        {/* Logo */}
        <a href="#" className={styles.logo}>
          MyStoryBank
        </a>

        {/* Desktop Menu */}
        <div className={styles.menu}>
          <a href="#home" className={styles.link}>Home</a>
          <a href="#stories" className={styles.link}>Stories</a>
          <button className={styles.loginBtn}>Login</button>
        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className={styles.mobileMenu}>
          <a href="#home" className={styles.mobileLink}>Home</a>
          <a href="#stories" className={styles.mobileLink}>Stories</a>
          <button className={styles.mobileLoginBtn}>Login</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
