import React from 'react'
import styling from './modal.module.css'
import PuffLoader from "react-spinners/PuffLoader";

const Modal = () => {
    const{modal}= styling
  return (
    <section className={modal}>
        <PuffLoader size={200}
        color='green'/>


    </section>
  )
}

export default Modal