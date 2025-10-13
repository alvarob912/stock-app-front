"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
const initialProductState = {name: '', price: ''}
const initialMovementState = {type: 'Compra', quantity: ''}


export default function Home() {
    const [movement, setMovement] = useState(initialMovementState)
    const [product, setProduct] = useState(initialProductState)
    const [selectedProductId, setSelectedProductId] = useState()
    const [products, setProducts] = useState([])
    const url = process.env.NEXT_PUBLIC_BACKEND_URL

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const inputName = e.target.name;
        setProduct({...product, [inputName]: inputValue})
    }

    const handleMovementChange = (e) => {
        const inputValue = e.target.value;
        setMovement({...movement, quantity: +inputValue})
    }

    const handleSelectType = (type) => {
      setMovement({...movement, type})
    }
    const handleClick = async (e) => {
        e.preventDefault()
        try {
          const res = await fetch(`${url}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
          })
              const data = await res.json()
              console.log({data})
              setProduct(initialProductState)
              // fetchProducts()
              const newProducts=[data.product, ...products]
              setProducts(newProducts)
              console.log('Producto creado con exito!')
        } catch (error) {
          console.log(error)
        }        
    }

    const handleCreateMovement = async (e) => {
        try {
          const res = await fetch(`${url}/products/movement/${selectedProductId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movement)
          })
              const data = await res.json()
              console.log({data})
              setProduct(initialMovementState)
              setSelectedProductId(null)
              fetchProducts()
              console.log('Movimiento de stock creado con exito!')
        } catch (error) {
          console.log(error)
        }        
    }

    const fetchProducts = () => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
      .then((res) => res.json())
      .then(({data}) => {
        // console.log(data)
        setProducts(data)
      })
    }

    useEffect(() => {
      fetchProducts()
    }, []);


    console.log({products})
  return (
    <>
    <div className="container df jcsb">
      <div className="df fdc">
        <h1 style={{margin: "0.3rem"}}>Crear nuevo producto</h1>
        <form action="">
            <input onChange={handleChange} value={product.name} type="text" name="name" className="onone"/>
            <input onChange={handleChange} value={product.price} type="number" name="price" className="onone"/>
            <button onClick={handleClick} className="cursorp">Crear producto</button>
        </form>
         <h1 style={{margin: "0.3rem"}}>Crear movimiento stock</h1>
         <div className="df aic mb5">
          {['Compra', 'Venta'].map((type) => (
            <div 
            onClick={() => handleSelectType(type)} 
            key={type} 
            className="mr5 p5 shadow cursorp br5"
            style={{backgroundColor: type === movement.type ? 'lightblue' : 'white'}}
            >
              <span>{type}</span>
            </div>
         ))}
         </div>
            <input onChange={handleMovementChange} value={movement.quantity} type="number" name="quantity" className="onone"/>
            <button onClick={handleCreateMovement} className="cursorp">Crear movimiento de stock</button>
      </div>
      <div className="products-container">
        {products.map(({_id, name, price, stock }) => (
          <div onClick={() => setSelectedProductId(_id)} className="df aic jcsb p5 shadow mb5 br5" key={_id} style={{backgroundColor: selectedProductId === _id ? 'lightblue' : 'white'}}>
            <span>{name}</span>
            <div className="df aic">
              <div className="df fdc mr5">
                <span>${price}</span>
                <span>Stock: {stock}</span>
              </div>
              <span className="cursorp cred" onClick={() => {
                fetch(`${url}/products/${_id}`,{method: 'DELETE'})
                .then((res) => res.json())
                .then((data => console.log(data)))
              }}><i className="fa fa-trash fa-xs" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
   <style jsx>
        {`
            form {
                display: flex;
                flex-direction: column;
                width: 20rem;
                margin: 0 auto;
            }
            .container {
              background-color: white;
              width: 50rem;
              margin: 0 auto;
              margin-top: 5rem;
              border-radius: 0.5rem;
              padding: 1rem;
            }   
            .products-container{
              overflow: hidden;
              overflow-y: auto;
              max-height: 20rem;
              padding: 0.5rem;
              width: 100%;
            }  
        `}
    </style>
    </>
  )
}
