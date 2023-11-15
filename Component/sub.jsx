import React from 'react'
import styles from "./sub.module.scss"
const Sub = (props) => {
  return (
    <div>
    <div className={styles.pricing}>
      <div className={styles.plan}>
        <h2>{props.amount}</h2>
        <div className={styles.price}>{props.amount}</div>
        <ul className={styles.features}>
          <li><i class="fas fa-check-circle"></i> Unlimited Websites</li>
          <li><i class="fas fa-check-circle"></i> 1 User</li>
          <li><i class="fas fa-check-circle"></i> 100MB Space/website</li>
          <li><i class="fas fa-check-circle"></i> Continuous deployment</li>
          <li><i class="fas fa-times-circle"></i> No priority support</li>
        </ul>
        <button>Signup</button>
      </div>
      {/* <div className={`${styles.plan} ${styles.popular}`}>
        <span>Most Popular</span>
        <h2>Pro</h2>
        <div className={styles.price}>$10/month</div>
        <ul className={styles.features}>
          <li><i class="fas fa-check-circle"></i> Unlimited Websites</li>
          <li><i class="fas fa-check-circle"></i> 5 Users</li>
          <li><i class="fas fa-check-circle"></i> 512MB Space/website</li>
          <li><i class="fas fa-check-circle"></i> Continuous deployment</li>
          <li><i class="fas fa-check-circle"></i> Email Support</li>
        </ul>
        <button>Buy Now</button>
      </div>
      <div className={styles.plan}>
        <h2>Enterprise</h2>
        <div className={styles.price}>Custom Pricing</div>
        <ul className={styles.features}>
          <li><i class="fas fa-check-circle"></i> Unlimited Websites</li>
          <li><i class="fas fa-check-circle"></i> Unlimited Users</li>
          <li><i class="fas fa-check-circle"></i> Unlimited Space/website</li>
          <li><i class="fas fa-check-circle"></i> Continuous deployment</li>
          <li><i class="fas fa-check-circle"></i> 24/7 Email support</li>
        </ul>
        <button>Contact Us</button>
      </div> */}
    </div>
    </div>
  )
}
export default Sub
