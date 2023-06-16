import axios from 'axios'
import { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip, Dropdown, Accordion } from 'react-bootstrap'
import tokenList from '../Constants/constants.js'
import Loading from '../Components/Loading.js'

export default function DepositPanel(props){
  const [depositAmount, setDepositAmount] = useState(null)
  const [selectedOption, setSelectedOption] = useState(tokenList['USDC'])
  const [exchangeRate, setExchangeRate] = useState(tokenList['USDC'])

  useEffect(()=>{
    console.log(props.walletBalance)
  },[props.walletBalance, props.wallet])
  
  function getExchangeRate(token){
    axios.get(`https://api.coinbase.com/v2/prices/${token}-USD/spot`).then((response)=>{
      setExchangeRate(response.data.data.amount)
    })
  }

  return(
    <div className='col-xl-4'>
      <div className='p-4 d-flex flex-column card-body bg-white sticky-top-panel rounded' id='deposit-panel'>
        <div className='mb-2 fs-5 fw-semibold'>Select Asset</div>
        <div className='d-flex flex-row align-items-center px-3 py-4 border border-1 border-primary rounded w-100'>
          <img
            src= {selectedOption['img']}
            alt= {selectedOption['ticker']}
            className='selected-icon me-2'
          />
          <div className='d-flex flex-column flex-fill'>
            <div className='d-flex flex-row align-items-center w-100'>
              <Dropdown>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                  <span className='fs-5 fw-bold text-start px-1 py-0'>{selectedOption.ticker}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>{setSelectedOption(
                    tokenList['ETH'])
                    getExchangeRate('ETH')
                    }}>
                    <div className='d-flex flex-row align-items-center'>
                      <img
                        src={tokenList['ETH']['img']}
                        alt = {tokenList['ETH']['ticker']}
                        className='dropdown-icon me-1'
                      />
                      <span className='m-0 fs-6 mx-2'>{tokenList['ETH']['ticker']}</span>
                      <span className='m-0 fs-7 text-grey'>{tokenList['ETH']['name']}</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=>{setSelectedOption(
                    tokenList['WBTC'])
                    getExchangeRate('WBTC')
                    }}>
                    <div className='d-flex flex-row align-items-center'>
                      <img
                        src={tokenList['WBTC']['img']}
                        alt = {tokenList['WBTC']['ticker']}
                        className='dropdown-icon me-1'
                      />
                      <span className='m-0 fs-6 mx-2'>{tokenList['WBTC']['ticker']}</span>
                      <span className='m-0 fs-7 text-grey'>{tokenList['WBTC']['name']}</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=>{setSelectedOption(
                    tokenList['USDC'])
                    }}>
                    <div className='d-flex flex-row align-items-center'>
                      <img
                        src={tokenList['USDC']['img']}
                        alt = {tokenList['USDC']['ticker']}
                        className='dropdown-icon me-1'
                      />
                      <span className='m-0 fs-6 mx-2'>{tokenList['USDC']['ticker']}</span>
                      <span className='m-0 fs-7 text-grey'>{tokenList['USDC']['name']}</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=>{setSelectedOption(
                    tokenList['USDT'])
                    getExchangeRate('USDT')
                    }}>
                    <div className='d-flex flex-row align-items-center'>
                      <img
                        src={tokenList['USDT']['img']}
                        alt = {tokenList['USDT']['ticker']}
                        className='dropdown-icon me-1'
                      />
                      <span className='m-0 fs-6 mx-2'>{tokenList['USDT']['ticker']}</span>
                      <span className='m-0 fs-7 text-grey'>{tokenList['USDT']['name']}</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=>{setSelectedOption(
                    tokenList['DAI'])
                    getExchangeRate('DAI')
                    }}>
                    <div className='d-flex flex-row align-items-center'>
                      <img
                        src={tokenList['DAI']['img']}
                        alt = {tokenList['DAI']['ticker']}
                        className='dropdown-icon me-1'
                      />
                      <span className='m-0 fs-6 mx-2'>{tokenList['DAI']['ticker']}</span>
                      <span className='m-0 fs-7 text-grey'>{tokenList['DAI']['name']}</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=>{setSelectedOption(
                    tokenList['XSGD'])
                    getExchangeRate('SGD')
                    }}>
                    <div className='d-flex flex-row align-items-center'>
                      <img
                        src={tokenList['XSGD']['img']}
                        alt = {tokenList['XSGD']['ticker']}
                        className='dropdown-icon me-1'
                      />
                      <span className='m-0 fs-6 mx-2'>{tokenList['XSGD']['ticker']}</span>
                      <span className='m-0 fs-7 text-grey'>{tokenList['XSGD']['name']}</span>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <input type='number' placeholder='0' value={depositAmount} onChange={(e)=>{setDepositAmount(e.target.value)}} className={`border-0 fs-3 py-0 text-end shadow-none form-control w-100 ${depositAmount > props.walletBalance ?'text-danger': null}`} min='0'/>
            </div>
            <div className='d-flex flex-row justify-content-between w-100'>
              <div className='ms-1 fs-7 text-grey'>
                {selectedOption['name']}
              </div>
              <div className='d-flex align-items-center'>
                <span className='fs-7 text-grey'>Balance: </span>
                <button className='btn btn-link text-blue fs-7 text-decoration-none m-0 p-0 ms-1' onClick={()=>{setDepositAmount(props.walletBalance)}}>
                  {(Math.round(props.walletBalance * 100) / 100).toFixed(7)}
                </button>
              </div>
            </div>
        </div>
      </div>
      { props.wallet !== ''?
        <div>
          <Accordion flush>
            <Accordion.Item eventKey='0'>
              <Accordion.Header><i className='bi bi-info-circle-fill me-2 text-grey'></i><span className='text-grey fs-7 fw-bold'>Note: </span></Accordion.Header>
              <Accordion.Body>
                <div className='text-grey fs-7'>
                  On the <a href='https://www.app.dezy.finance/overview'>Overview</a> page, investments can be managed and withdrawn into any Dezy supported asset after the maturity date.
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>  
      : null }
      {selectedOption['ticker'] !== 'USDC' ?
        <div className='d-flex flex-row p-3 card-body warning-box rounded mt-1'>
          <img
            src='https://www.app.dezy.finance/images/explore/swap-warning.png'
            alt='warning'
            className='dropdown-icon me-2'
          />
          <div className='fs-7 my-1 text-grey'>
            This strategy is yielding in
            <span className='fw-bold'> USDC</span>
            . If you deposit in
            <span className='fw-bold'> ETH</span>
            , it will be swapped into the yielding asset(s) before deployment into the protocol.
          </div>         
        </div>  
        : null
      }
      <div className='my-3 fs-5 fw-semibold'>Yielding Protocol</div>
        <div className='border-0 mb-3 card'>
          <div className='p-4 d-flex flex-row justify-content-between align-items-center border border-1 border-grey rounded'>
            <div className='d-flex flex-row align-items-center col'>
              <img
                src='https://www.app.dezy.finance/images/protocol/NotionalFinance.png'
                alt='notional finance'
                id='deposit-icon'
              />
              <p className='fw-semibold m-0 fs-6'>Notional Finance</p>
            </div>
            <div className='fw-semibold fs-5 text-end'>
              USDC {selectedOption['ticker']==='USDC' ? (Math.round(depositAmount * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : (Math.round(depositAmount * exchangeRate * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
          </div>
          <div className='border-0 py-1 px-3 rounded' id='grey-background'>
            <div className='fs-7 my-1 text-grey'>
              <span className='fw-bold'>Note: </span>
              This fixed-term investment matures on
              <span className='fw-bold'> 20 Sep 2023</span>.
              Upon maturity, your investment will still continue to yield at around 1.85%.
            </div>
          </div>
        </div>
        {depositAmount && depositAmount > 0 ?
          <div className='my-2 fw-medium fs-6 pt-2 border-top border-1 border-grey'>
            Projeted Earnings <span className='fw-400 fs-7 text-grey'>(Principal + Yield)</span>
            <OverlayTrigger
              placement={'top'}
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip>
                  The projected earnings are inclusive of both the principal and projected yield. Calculations are based on the last recorded APR data for all protocols involved in this strategy.
                </Tooltip>
              }
            >
              <i className='bi bi-info-circle-fill ms-1 text-grey'></i>
            </OverlayTrigger>
            {depositAmount <= props.walletBalance ? 
              <div className='d-flex flex-row justify-content-between fs-6 card card-green rounded p-1'>
                <div>
                  Upon maturity @ <span className='fw-bold'>4.85%</span>
                </div>
                <div className='fw-bold'>
                  {selectedOption['ticker']==='USDC' ? (Math.round(depositAmount * 100) / 100 * (1 + (4.85/100) * 3/12)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : (Math.round(depositAmount * exchangeRate * 100) / 100 * (1 + (4.85/100) * 3/12)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} USDC
                </div>
              </div>:
              <div className='d-flex flex-row justify-content-end fs-6 card card-green rounded p-1'>
                <Loading/>
              </div>
            }
          </div>:
        null }
        <div className='d-flex flex-row fs-6'>
          <p className='text-grey'>Network fees will apply</p>
          <OverlayTrigger
            placement={'top'}
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip>
                Final network fees may vary due to market conditions
              </Tooltip>
            }
          >
            <i className='bi bi-info-circle-fill ms-1 text-grey'></i>
          </OverlayTrigger>
        </div>
        { props.wallet ? 
          <button className='btn btn-primary py-3 fw-bold' disabled={(props.walletBalance < depositAmount) || (Number(depositAmount) === 0) || (depositAmount === '') ? 'disabled' : null}>
            {props.walletBalance < depositAmount ? 'Insufficient Balance' : 'Invest'}
          </button>
          : 
          <button className='btn btn-primary py-3 fw-bold'>
            Connect Wallet
          </button>
        }
      </div>
    </div>     
  )
}