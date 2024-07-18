"use client";

import { Modal, Button } from "flowbite-react";
import { useState } from "react";

const ModalComponent = ({ errorMsg }) => {
    const [openModal, setOpenModal] = useState(true);

    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} className="bg-black/20">
            <div className="">
                <div className="border border-black rounded-lg shadow-none bg-white">
                    <Modal.Header className="border-b border-black">Login Message</Modal.Header>
                    <Modal.Body className="p-5">
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-black">
                                {errorMsg}
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-3 border-t border-black">
                        <Button className="px-3 py-2 border border-black bg-orange-500 text-white active:scale-95 transition-all" color="gray" onClick={() => setOpenModal(false)}>
                            Dismiss
                        </Button>
                    </Modal.Footer>
                </div>
            </div>
        </Modal>
    )
}

export default ModalComponent