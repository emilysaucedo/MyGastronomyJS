import { useCartContext } from "../../context/useCartContext"
import styles from './page.module.css'
import { LuMinus } from "react-icons/lu"
import { LuCircleMinus } from "react-icons/lu";

export default function Cart(){
    
    const { cartItems } = useCartContext()

    console.log(cartItems)

    if (!cartItems.length){
        return (
        <div>
            <h1>Your cart is empty</h1>
            <button>See our specialities!</button>
        </div>
        )
    }
    return (
        <div className={styles.pageContainer}>
            <h1>Your items:</h1>
            <section>
                <div className={styles.itemsListContainer}>
                    {cartItems.map((item)=> (
                        <div className={styles.itemContainer} key={item._id}>
                            <img src={item.imgUrl} alt="" />
                            <div className={styles.itemContent}>
                                <h2>{item.name}</h2>
                                <p>{String(item.ingredients)}</p>
                                <p>{item.description}</p>
                                <div className={styles.portionContainer}>
                                    <p>Portions:</p>
                                    <p>{item.quantity}</p>
                                    <div className={styles.portionBtns}>
                                        <button>-</button>
                                        <button>+</button>
                                    </div>
                                </div>
                                <button><LuCircleMinus/> Remove item</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <button className={styles.confirmBtn}>Confirm your order!</button>
        </div>

    )
}