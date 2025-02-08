import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/auth"
import orderServices from "../../services/order"
import styles from './page.module.css'
import { LuLogOut, LuTimer, LuCheckCheck, LuX } from "react-icons/lu"
import { Link } from "react-router-dom"
import Loading from "../loading/loading"

export default function Profile(){
    const { logout } = authServices()
    const { getUserOrders, orderLoading, refetchOrders, ordersList } = orderServices()
    const navigate = useNavigate()
    const authData = JSON.parse(localStorage.getItem('auth'))

    useEffect(()=>{ //fica na escuta
        if(!authData){
            return navigate('/auth')
        } else if(refetchOrders) {
            getUserOrders(authData?.user?._id)
        }
    }, [authData, refetchOrders])

    if(orderLoading){
        return(<Loading/>)
    }

    const handleLogout = () => {
        logout()
        return navigate('/')
    }

    console.log(ordersList)

    return (
        <div className={styles.pageContainer}>
            <div>
            <h1>{authData?.user?.fullname}</h1>
            <h3>{authData?.user?.email}</h3>
                </div>
            
            <button onClick={handleLogout}><b>Logout</b> <LuLogOut/></button>

            {ordersList.length > 0 ? 
                <div className={styles.ordersContainer}>
                    {ordersList.map((order) => (
                        <div key={order._id} className={styles.orderContainer}>
                            {order.pickupStatus === 'Pending' ?<p className={`${styles.pickupStatus} ${styles.pending}`}><LuTimer/>{order.pickupStatus}</p> : null}
                            {order.pickupStatus === 'Completed' ?<p className={`${styles.pickupStatus} ${styles.completed}`}><LuCheckCheck/>{order.pickupStatus}</p> : null}
                            {order.pickupStatus === 'Canceled' ?<p className={`${styles.pickupStatus} ${styles.canceled}`}><LuX/>{order.pickupStatus}</p> : null}
                            <h3>{order.pickupTime}</h3>
                            {order.orderItems.map((item)=> (
                                <div key={item._id}>
                                    <h4>{item.itemDetails[0].name}</h4>
                                    <p>Quantity: {item.quantity}</p>

                                    </div>
                            ))}
                            </div>
                    ))}
                </div>   
            :
                <div>
                    You do not have orders yet. 
                    <Link to={'/plates'} className={styles.platesLink}>Click here and see our specialites.</Link>
                </div> 
            }
        </div>

    )
}