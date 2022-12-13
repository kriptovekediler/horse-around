import React from 'react'
import styles from './toast.module.css'
import {BiErrorCircle} from 'react-icons/bi';

const ToastModal = (props) => {
  return (
    <div className={props.toaster ? `${styles["toast"]} ${styles["on"]}`: styles["toast"]}>
        <BiErrorCircle color='red' />
        <h6>{props.children}</h6>
    </div>
  )
}

export default ToastModal