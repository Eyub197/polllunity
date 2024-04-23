import React from 'react';
import styles from "@/ui/polls/Poll/Polls.module.css";

const SkeletonImage = () => (
  <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
);

const SkeletonText = () => (
  <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
);

const Loader = () => {
    return (
      <div className={styles.poll}>
        <SkeletonImage />
        <div className={styles.bottom_part}>
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
        </div>
      </div>
    );
  }



export default Loader;
