import React from 'react'
import styles from './toast.module.css'

const ToastModal = (props) => {
  return (
    <div className={styles["toast on"]}>
        <h6>{props.children}</h6>
    </div>
  )
}

export default ToastModal