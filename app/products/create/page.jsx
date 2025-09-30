"use client";

import { useState } from "react";
const initialState = {name: '', price: ''}
export default function CreateProductoPage() {
    const [product, setProduct] = useState(initialState)

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const inputName = e.target.name;
        setProduct({...product, [inputName]: inputValue})
    }

    const handleClick = (e) => {
        e.preventDefault()
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(res =>  res.json())
        .then(data => {
            setProduct(initialState)
            console.log('Producto creado con exito!')
        }).catch(err => {
            console.log({err})
        })
    }

  return (
    <>
    <div>
        <h1>Crear nuevo producto</h1>
        <form action="">
            <input onChange={handleChange} value={product.name} type="text" name="name"/>
            <input onChange={handleChange} value={product.price} type="number" name="price"/>
            <button onClick={handleClick}>Crear producto</button>
        </form>
    </div>
   <style jsx>
        {`
            form {
                display: flex;
                flex-direction: column;
                width: 20rem;
                margin: 0 auto;
            }
            input {
                border: 1px solid black;
                padding: 0.2rem;
                margin-bottom: 0.2rem;
            }
            button {
                background-color: #d3d3d3;
                border: 1px solid black;
            }
            button:hover {
                background-color: #8b8b8bff;
            }       
        `}
    </style>
    </>
  )
}
