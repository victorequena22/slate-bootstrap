import { useState } from 'react'
import { Texto, Props, TextToHTML } from './Main'
import { Modal, Button, Row } from 'react-bootstrap'
import React from 'react'
export function EditModal(p: Props & { title: string; size?: 'xl' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Modal size={p.size ? p.size : 'lg'} animation show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{p.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Texto {...p} />
        </Modal.Body>
      </Modal>
      <div className='w-100'>
        <Row>
          <label className='mt-1'>{p.title}</label>
          <Button onClick={() => setOpen(true)} size='sm' className='ml-2'>
            <i className='fas fa-edit'></i>
          </Button>
        </Row>
        <div
          className='w-100 h-90 mt-1'
          style={{
            padding: '1rem 1rem 1rem 1rem',
            margin: 'auto auto auto auto',
            overflowX: 'hidden',
            overflowY: 'scroll',
            border: 'solid 1px #ced4da',
            minHeight: '30px',
            maxHeight: '500px',
          }}
        >
          <TextToHTML text={p.value} />
        </div>
      </div>
    </>
  )
}
