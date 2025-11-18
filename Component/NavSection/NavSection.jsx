import React, { useState } from "react";
import Link from "next/link";
import styles from "./NavSection.module.scss";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          MyStoryBank
        </Link>

        {/* Desktop Menu */}
        <div className={styles.menu}>
          <Link href="/" className={styles.link}>
            Home
          </Link>

          <Link href="/stories" className={styles.link}>
            Stories
          </Link>

          <Link href="/signin" className={styles.loginBtn}>
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className={styles.mobileMenu}>
          <Link
            href="/"
            className={styles.mobileLink}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/stories"
            className={styles.mobileLink}
            onClick={() => setOpen(false)}
          >
            Stories
          </Link>

          <Link
            href="/signin"
            className={styles.mobileLoginBtn}
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
