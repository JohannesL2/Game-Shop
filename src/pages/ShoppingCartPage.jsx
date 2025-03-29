import Cart from "../components/ShoppingCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcAmex, faCcPaypal } from "@fortawesome/free-brands-svg-icons";

const ShoppingCartPage = () => {
  return (
    <div>
    <Cart/>
    <div className="flex p-6 gap-4 justify-center">
      <FontAwesomeIcon icon={faCcVisa} size="3x"/>
      <FontAwesomeIcon icon={faCcMastercard} size="3x"/>
      <FontAwesomeIcon icon={faCcAmex} size="3x"/>
      <FontAwesomeIcon icon={faCcPaypal} size="3x"/>
    </div>
    </div>
  )
}

export default ShoppingCartPage