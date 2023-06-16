import axios from 'axios';
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function Navbar(props){
  const [exchangeRate, setExchangeRate] = useState('') 
  useEffect(()=>{
    console.log(props.wallet)
    getExchangeRate()
  },[props.wallet, props.walletBalance])

  function getExchangeRate(){
    axios.get(`https://api.coinbase.com/v2/prices/ETH-USD/spot`).then((response)=>{
      setExchangeRate(response.data.data.amount)
    })
  }

  return(
    <div className='d-flex justify-content-between align-items-center w-100 sticky-top bg-white' id='navbar-container'>
      <a href='https://www.app.dezy.finance/explore' className='text-decoration-none text-black btn btn-link'>
        <div>
          <i className='bi bi-arrow-left ms-3 me-4'>
          </i>
          Back to Explore
        </div>
      </a>
      { props.wallet === '' ? 
        <button onClick={props.walletConnect} className='me-2 p-0.25 d-flex flex-row align-items-center btn btn-primary fw-bold'>
          Connect Wallet | Login
        </button>:
        <div className='d-flex flex-row align-items-center'>
          <Dropdown>
            <Dropdown.Toggle variant='secondary' id='dropdown-wallet'>
              <span className='fw-semibold'>{`${props.wallet.slice(0,8)}...${props.wallet.slice(props.wallet.length-4)}`}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{width: '235px'}}>
              <div className='d-flex flex-column align-items-center pt-1 pb-2' id='wallet-dropdown-menu'>
                <img
                  src ='https://www.app.dezy.finance/images/navbar/icon-manage.png'
                  alt ='Manage Wallet'
                  className ='wallet-dropdown-icon'
                />
                <div className='fs-7 text-grey my-1'>ETH Balance</div>
                <div className='fs-4'>{(Math.round((props.walletBalance) * 100) / 100).toFixed(2)} ETH</div>
                <div className='fs-7 text-grey my-1'>${(Math.round((props.walletBalance * exchangeRate) * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
              </div>             
              <Dropdown.Item className='wallet-dropdown-item'>
                <CopyToClipboard text={props.wallet}>
                  <div>
                    <img
                        src='https://www.app.dezy.finance/images/navbar/icon-copy.png'
                        alt='Copy Wallet Address'
                        className='wallet-dropdown-icon'
                      />
                      <span className='fs-7 fw-medium'>Copy Address</span>
                  </div>
                </CopyToClipboard>
              </Dropdown.Item>
              <Dropdown.Item className='wallet-dropdown-item' onClick={props.walletConnect}>
                <div>
                  <img
                    src='https://www.app.dezy.finance/images/navbar/icon-disconnect.png'
                    alt='Disconnect Wallet'
                    className='wallet-dropdown-icon'
                  />
                  <span className='fs-7 fw-medium'>Disconnect Wallet</span>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className='wallet-dropdown-item' href="https://app.tor.us/" target='blank'>
                <div>
                  <img
                    src='https://www.app.dezy.finance/images/navbar/icon-manage.png'
                    alt='Manage Wallet'
                    className='wallet-dropdown-icon'
                  />
                  <span className='fs-7 fw-medium'>Manage Wallet</span>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <i className='bi bi-bell ms-3 text-blue'></i>
        </div>
      }
    </div>
  )
}