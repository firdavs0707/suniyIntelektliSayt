import { useEffect , useState } from 'react'
import { toast } from 'react-toastify'; 
import alanBtn from '@alan-ai/alan-sdk-web';
const Card = () => {

  const [mainCart, setMainCart] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModal, setModal] = useState(false);

  const addCartHandler = (item) => {
    setCart(prev => {
      return[...prev, item]
    });
    toast.dark('Product added successfully!')
  }

  const modalHandler = () => {
    setModal(true)
  }

  const CloseModalHandler = () => {
    setModal(false)
  }

  useEffect(() => {
    alanBtn({
        key: 'd281fdc938975eaf72bb147c0e0900782e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: (commandData) => {
          if (commandData.command === 'getMenu') {
            setMainCart(commandData.data)
          } else if (commandData.command === 'showCart') {
            addCartHandler(commandData.data)
          } else if (commandData.command === 'openCart') {
            setModal(commandData.data)
          } else if (commandData.command === 'closeCart') {
            setModal(commandData.data)
          }
        }
    });
  }, []);

  return (
    <div>
      <div className='album py-5 bg-light'>
        <div className='container'>
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g3'>
            {mainCart.map( cart  => (
              <div key={cart.id} className='col'>
                <div className='card shadow-sm p-3' style={{minHeight: '550px',}}>
                  <div className='card-title'>
                    <h4 className='text-muted text-center'>Product # { cart.id } </h4>
                  </div> 
                  <img className='bg-placeholder card-img-top' width={'100%'} height='400px' src={cart.image} alt={cart.title}/>
                  <div className='card-body'>
                    <p className='card-text'>{cart.title.slice(0, 20)}</p>
                    <p className='card-text fw-lighter'>{cart.description.slice(0, 90)}</p>
                  </div>
                  <div className='card-footer d-flex justify-content-between align-items-center'>
                    <div>
                      <span>{cart.category}</span>
                    </div>
                    <span className='text-muted'>${cart.price}</span>
                  </div>
                  <button onClick={() => addCartHandler(cart)} className='mt-3 btn btn-outline-primary'>Add to card</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='fixed-top m-3'>
        <button onClick={modalHandler} type="button" className="btn btn-primary position-relative">
          Cart
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cart.length}
          <span className="visually-hidden">unread messages</span>
          </span>
        </button>
      </div>
      {isModal && (
        <div className="modal" style={{display: 'block', background: 'rgba(0,0,0,0.8)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cart</h5>
                <button onClick={CloseModalHandler} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              {cart.map( cart  => (
                <div className='card mb-3'>
                  <div className='row g-0'>
                    <div className='col-md-4'>
                      <img src={cart.image} alt={cart.title} className='img-fluid rounded-start'/>
                    </div>
                    <div className='col-md-8'>
                      <div className='card-body'>
                        <h5 className='card-title'>{cart.title}</h5>
                        <p className='cart-text text-muted'>{cart.description.slice(0, 90)}</p>
                        <p className='card-text'><small className='text-muted'>${cart.price}</small></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
              <div className="modal-footer">
                <button onClick={CloseModalHandler} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Card