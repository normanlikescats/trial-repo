import { useState } from 'react';
import axios from 'axios';
import data from './Components/data.js'
import './App.css';
import AreaChart from './Components/AreaChart.js';
import { OverlayTrigger, Tooltip, Dropdown, Accordion } from 'react-bootstrap'
import tokenList from './constants.js'
import MobileVer from './Components/MobileVer.js';
import { BrowserView, MobileView} from 'react-device-detect';


function App() {
  const [depositAmount, setDepositAmount] = useState(null)
  const [walletBalance, setWalletBalance] = useState(0)
  const [selectedOption, setSelectedOption] = useState(tokenList["USDC"])
  const [exchangeRate, setExchangeRate] = useState(tokenList["USDC"])
  const [timeframe, setTimeframe] = useState('3M')
  const [sidebar, setSidebar] = useState(true)

  function getExchangeRate(token){
    axios.get(`https://api.coinbase.com/v2/prices/${token}-USD/spot`).then((response)=>{
      setExchangeRate(response.data.data.amount)
    })
  }

  function toggleSidebar(){
    let toggleButton = document.getElementById('toggle-btn')
    let dezyText = document.getElementById('logo-text')
    if(toggleButton.src==="https://www.app.dezy.finance/images/sidebar/sidebar-collapse.png"){
      dezyText.hidden = !dezyText.hidden
      setSidebar(false)
      toggleButton.src="https://www.app.dezy.finance/images/sidebar/sidebar-expand.png"
      
    }else{
      setSidebar(true)
      toggleButton.src="https://www.app.dezy.finance/images/sidebar/sidebar-collapse.png"
      setTimeout(()=>{dezyText.hidden = !dezyText.hidden},350)
    }
  }

  function toggleReadMore(){
    let expandableText = document.getElementById('vault-description')
    let readMore = document.getElementById('read-more-btn')
    if(expandableText.style.display === 'none'){
      expandableText.style.display = 'block'
      readMore.innerHTML = 'Read Less'    
    }else{
      expandableText.style.display = 'none'  
      readMore.innerHTML = 'Read More'
    }
  }

  let threeMonthAvg;
  let sixMonthAvg;
  let oneYearAvg;

  if(data){
    let rollingSum = 0;
    for(let i=0; i<data.length; i++){
      rollingSum += data[i][1]
      if(i===89){
        threeMonthAvg = rollingSum/90
      }
      if(i===179){
        sixMonthAvg = rollingSum/180
      }
      if(i===364){
        oneYearAvg = rollingSum/365
      }
    }
  }

  const date = new Date(data[0][0]);
  const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.toLocaleString('default', { day: 'numeric' })}, ${date.toLocaleString('default', { year: 'numeric' })}`;

  return (
    <>
      <BrowserView>
      <div className='d-flex flex-row' id="app">
        <div className='d-flex flex-column justify-content-between align-items-center vh-100 bg-white sticky-top' id={sidebar ? 'sidebar-container': 'collapse-sidebar'}>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-start align-items-center' id='brand-logo-container'>
              <a className='mx-2' href='https://www.app.dezy.finance/explore'>
                <img
                  src="https://www.app.dezy.finance/images/dezy-logo-only-black.png"
                  alt="logo"
                  id='logo-img'
                />
                <img
                  src="https://www.app.dezy.finance/images/dezy-logo-text.png"
                  alt="logo"
                  id='logo-text'
                  style={{  width: '3.5rem', height: '2rem', margin: '0 0 0 0.5rem'}}
                />
              </a>
            </div>
            <div className='mt-4 '>
              <a href='https://www.app.dezy.finance/home' className='text-decoration-none btn btn-link p-0'>
                <button className="align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar mb-3 p-3">
                  <img
                    src="https://www.app.dezy.finance/images/sidebar/sidebar-home.png"
                    alt="home"
                    className='inactive-sidebar-icon'
                  />
                  <p className="collapse collapse-horizontal show m-0 p-0 fs-5" id="collapseSidebar">Home</p>
                </button>
              </a>
              <a href='https://www.app.dezy.finance/overview' className='text-decoration-none btn btn-link p-0'>
                <button className="align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar mb-3 p-3">
                  <img
                    src="https://dezy-cdn.s3.ap-southeast-1.amazonaws.com/overview.png"
                    alt="overview"
                    className='inactive-sidebar-icon'
                  />
                  <p className="collapse collapse-horizontal show m-0 p-0 fs-5" id="collapseSidebar">Overview</p>
                </button>
              </a>
              <a href='https://www.app.dezy.finance/explore' className='text-decoration-none btn btn-link p-0'>
                <button className="align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar-active mb-3 p-3">
                  <img
                    src="https://dezy-cdn.s3.ap-southeast-1.amazonaws.com/explore.png"
                    alt="explore"
                    className='active-sidebar-icon'
                  />
                  <p className="collapse collapse-horizontal show m-0 p-0 fs-5" id="collapseSidebar">Explore</p>
                </button>
              </a>
              <a href='https://www.app.dezy.finance/swap' className='text-decoration-none btn btn-link p-0'>
                <button className="align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar mb-3 p-3">
                  <img
                    src="https://dezy-cdn.s3.ap-southeast-1.amazonaws.com/swap.png"
                    alt="swap"
                    className='inactive-sidebar-icon'
                  />
                  <p className="collapse collapse-horizontal show m-0 p-0 fs-5" id="collapseSidebar">Swap</p>
                </button>
              </a>
              <a href='https://www.app.dezy.finance/auto-invest' className='text-decoration-none btn btn-link p-0'>
                <button className="align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar mb-3 p-3">
                  <img
                    src="https://www.app.dezy.finance/images/sidebar/sidebar-auto-invest.png"
                    alt="auto invest"
                    className='inactive-sidebar-icon'
                  />
                  <p className="collapse collapse-horizontal show m-0 p-0 fs-5" id="collapseSidebar">Auto Invest</p>
                </button>
              </a>
            </div>
          </div>
          <div className='d-flex flex-column align-items-start w-100' id='sidebar-bottom'>
            <a href='https://www.app.dezy.finance/tutorial' target='blank' className='text-decoration-none btn btn-link p-0'>
              <button className="align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar mb-3 p-3">
                <img
                  src="https://www.app.dezy.finance/images/sidebar/sidebar-tutorial.png"
                  alt="tutorial"
                  className='inactive-sidebar-icon'
                />            
                <p className="collapse collapse-horizontal show m-0 p-0 fs-5" id="collapseSidebar">Tutorial</p>
              </button>
            </a>
            <a href='https://docs.dezy.finance/hub/' target='blank' className='text-decoration-none btn btn-link p-0'>
              <button className="align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar mb-3 p-3">
                <img
                  src="https://www.app.dezy.finance/images/sidebar/sidebar-faq.png"
                  alt="FAQ"
                  className='inactive-sidebar-icon'
                />            
                <p className="collapse collapse-horizontal show m-0 p-0 fs-5" id="collapseSidebar">FAQ</p>
              </button>
            </a>
            <button className="ms-2 align-items-center align-self-start p-0 my-5 btn btn-secondary toggle-icon" onClick={toggleSidebar}>
              <img
                src="https://www.app.dezy.finance/images/sidebar/sidebar-collapse.png"
                alt="toggle sidebar"
                className='toggle-icon'
                id='toggle-btn'
                data-bs-toggle="collapse"
                href="#collapseSidebar"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              />            
            </button>
          </div>
        </div> 
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between align-items-center w-100 sticky-top bg-white' id='navbar-container'>
            <a href='https://www.app.dezy.finance/explore' className='text-decoration-none text-black btn btn-link'>
              <div>
                <i className="bi bi-arrow-left ms-3 me-4">
                </i>
                Back to Explore
              </div>
            </a>
            <button className='me-2 p-0.25 btn btn-primary fw-bold'>
              Connect Wallet | Login
            </button>
          </div>
          <div className='d-flex flex-row' id='explore-detail'>
            <div className='row'>
              <div className='col-xl-8'>
                <div className='p-4 mb-3 rounded d-flex flex-column card-body bg-white'>
                  <div className='d-flex flex-row badge rounded-pill align-items-center align-self-start p-1' id='badge'>
                    <img
                      src="https://www.app.dezy.finance/images/strategy/fixed-deposit.png"
                      alt="fixed deposit"
                      id='badge-icon'
                      className='me-1'
                    />
                    <div className='ms-1 me-2 fs-6 fw-normal' id='badge'>Fixed Deposit</div>
                  </div>
                  <div className="mt-1 mb-4 fs-2 fw-medium">Fixed Deposit with Notional Finance</div>
                  <div className="mt-6 mb-4 fs-2 fw-bold">Details</div>
                  <p>
                    Notional Finance enables users to borrow and lend assets across various assets. Yield is generated through the interest payments made by borrowers due during and at the point of contract maturity.
                  </p>
                  <div id='vault-description'>
                    <div className='fw-bold'>Risks:</div><br/>
                    <ul>
                      <li>Defaults amongst borrowers on repayment may impact protocol liquidity but borrower vetting and collateral is held to mitigate this risk.</li>
                      <li>Smart contract vulnerability could put your principal at risk which is a technical risk across all DeFi. Please check our Insurance section to see whether insurance is available for this strategy.</li>  
                    </ul>
                    <div className='fw-bold'>How are the returns calculated?</div><br/>
                    <ul>
                      <li>Returns on the Explore page: The protocol’s last recorded APY returns for the selected maturity date as at 12:00 UTC.</li>
                      <li>Average returns on-chart: Average of the protocol’s last recorded APY returns for the selected maturity date as at 12:00 UTC based on the selected timestamp.</li>
                      <li>Projected Earnings: The protocol’s last recorded APY returns for the selected maturity date as at 12:00 UTC compounded accordingly based on the maturity date.</li>
                    </ul>
                    <span className='fw-bold'>Note: </span>
                    The fixed deposit rate can fluctuate on a daily basis depending on market conditions. But at the point of deposit, your yield will be locked in at the fixed rate offered by the protocol until the maturity date.
                  </div>
                  <button className='align-self-end btn btn-link p-0 mt-1' onClick={toggleReadMore} id='read-more-btn'> Read More</button>
                </div>
                <div className='p-4 mb-3 rounded d-flex flex-column card-body bg-white'>
                  <div className="mt-2 mb-5 fs-2 fw-bold">Asset Deployment Flow</div>
                  <div className='align-self-center w-75 mb-3'>
                    <img
                      src="https://dezy-cdn.s3.ap-southeast-1.amazonaws.com/flowchart/S6_NOTIONAL_FD_USDC.png"
                      alt="asset deployment flow"
                      className='img-fluid'
                    />
                  </div>
                </div>
                <div className='p-4 mb-3 rounded d-flex flex-column card-body bg-white'>
                  <div className="mt-2 mb-3 fs-2 fw-bold">Video</div>
                  <div className='align-self-center w-100 mb-3'>
                    <iframe
                      id = 'video-player'
                      title='video'
                      src='https://odysee.com/$/embed/@Dezy:5/Dezy_DeFi-lending:4?t=1&r=4RdLqUyBU5ukuXwr8CjVwEoRqDxMyJU1?autoplay=0'
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className='p-4 mb-3 rounded d-flex flex-column card-body bg-white'>
                  <div>
                    <OverlayTrigger
                      placement={'right'}
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip className='apr-tooltip'>
                          <div className='p-3'>
                            <div className='d-flex flex-row align-items-center'>
                              <img
                                src='https://www.app.dezy.finance/images/explore/breakdown.png'
                                alt='breakdown'
                                className='breakdown-icon'
                              />
                              <div className='w-100'>
                                <div className='d-flex flex-row justify-content-between align-items-center fs-7 mb-2'>
                                  <span className='text-grey'>Base: </span><span className='text-green'>{data[0][1]}%</span>
                                </div>
                                <div className='d-flex flex-row justify-content-between align-items-center fs-7 mt-2 pt-8'>
                                  <span className='text-grey'>Rewards: </span><span className='text-black fw-semibold'>N/A%</span>
                                </div>
                              </div>
                            </div>
                            <div className='d-flex flex-row justify-content-between align-items-center mt-2 pt-2 border-top border-1 border-grey'>
                              <span className='text-black fw-bold fs-7'>Total</span><span className='fs-6 text-green fw-bold'>{data[0][1]}%</span>
                            </div>
                          </div>
                        </Tooltip>
                        }
                      >
                        <span className="fs-2 fw-bold text-green">{data[0][1]}%</span>
                    </OverlayTrigger>
                    </div>
                  <div className="fs-6 text-grey">{formattedDate}</div>
                  <div className='align-self-center w-100'>
                    <AreaChart data={data} timeframe={timeframe}/>
                  </div>
                  <div className='d-flex flex-row align-items-center justify-content-center'> 
                    <button className={timeframe === '3M' ? 'btn btn-dark mx-1' : 'btn btn-light mx-1'} onClick={()=>{setTimeframe('3M')}}>3M</button>
                    <button className={timeframe === '6M' ? 'btn btn-dark mx-1' : 'btn btn-light mx-1'} onClick={()=>{setTimeframe('6M')}}>6M</button>
                    <button className={timeframe === '1Y' ? 'btn btn-dark mx-1' : 'btn btn-light mx-1'} onClick={()=>{setTimeframe('1Y')}}>1Y</button>
                  </div>
                  <div className='row mt-4 px-4'> 
                    <div className='col-4'>
                      <div className='fs-7 text-grey'>3-months Avg. Returns</div>
                      <div className='fs-6 fw-semibold'>{threeMonthAvg ? ((Math.round(threeMonthAvg * 100) / 100).toFixed(2)) : 'N/A'}%</div>
                    </div>
                    <div className='col-4'>
                      <div className='fs-7 text-grey'>6-months Avg. Returns</div>
                      <div className='fs-6 fw-semibold'>{sixMonthAvg ? ((Math.round(sixMonthAvg * 100) / 100).toFixed(2)) : 'N/A'}%</div>
                    </div>
                    <div className='col-4'>
                      <div className='fs-7 text-grey'>1-year Avg. Returns</div>
                      <div className='fs-6 fw-semibold'>{oneYearAvg ? ((Math.round(oneYearAvg * 100) / 100).toFixed(2)) : 'N/A'}%</div>
                    </div>
                  </div>
                </div>
                <div className='p-4 mb-3 rounded d-flex flex-column card-body bg-white'>
                  <div className="mt-2 mb-3 fs-2 fw-bold">Protocols</div>
                  <div className='p-4 card-body border border-1 border-grey rounded'>
                    <div className='d-flex flex-row align-items-center row'>
                      <div className='d-flex flex-row align-items-center col'>
                        <img
                          src='https://www.app.dezy.finance/images/protocol/NotionalFinance.png'
                          alt='notional finance'
                          id='protocol-icon'
                        />
                        <p className='fw-semibold m-0'>Notional Finance</p>
                      </div>
                      <div className='d-flex flex-column fs-5 text-start col'>
                        <p className='text-grey fs-6 m-0'>Total Value Locked</p>
                        <p className='fw-semibold m-0 fs-5'>$32.29m</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-4'>
                <div className='p-4 d-flex flex-column card-body bg-white sticky-top-panel rounded'>
                  <div className="mb-2 fs-5 fw-semibold">Select Asset</div>
                  <div className='d-flex flex-row align-items-center flex-fill px-3 py-4 border border-1 border-primary rounded'>
                    <img
                      src= {selectedOption["img"]}
                      alt= {selectedOption["ticker"]}
                      className='selected-icon me-2'
                    />
                    <div className='d-flex flex-column'>
                      <div className='d-flex flex-row align-items-center w-100'>
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <span className='fs-5 fw-bold'>{selectedOption.ticker}</span>
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
                        <input type='number' placeholder='0' value={depositAmount} onChange={(e)=>{setDepositAmount(e.target.value)}} className={`border-0 fs-3 py-0 text-end shadow-none form-control w-100 ${depositAmount > walletBalance ?'text-danger': null}`} min='0'/>
                      </div>
                      <div className='d-flex flex-row justify-content-between w-100'>
                        <div className='ms-1 fs-7 text-grey'>
                          {selectedOption['name']}
                        </div>
                        <div className='d-flex align-items-center'>
                          <span className='fs-7 text-grey'>Balance: </span>
                          <button className='btn btn-link text-blue fs-7 text-decoration-none m-0 p-0 ms-1' onClick={()=>{setDepositAmount(walletBalance)}}>
                            {(Math.round(walletBalance * 100) / 100).toFixed(7)}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header><i className='bi bi-info-circle-fill me-2 text-grey'></i><span className='text-grey fs-7 fw-bold'>Note: </span></Accordion.Header>
                        <Accordion.Body>
                          <div className='text-grey fs-7'>
                            On the <a href='https://www.app.dezy.finance/overview'>Overview</a> page, investments can be managed and withdrawn into any Dezy supported asset after the maturity date.
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                  {selectedOption['ticker'] !== 'USDC' ?
                    <div className='d-flex flex-row p-3 card-body warning-box rounded mt-1'>
                      <img
                        src="https://www.app.dezy.finance/images/explore/swap-warning.png"
                        alt="warning"
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
                  <div className="my-3 fs-5 fw-semibold">Yielding Protocol</div>
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
                        USDC {selectedOption['ticker']==='USDC' ? (Math.round(depositAmount * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (Math.round(depositAmount * exchangeRate * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                  {
                    depositAmount && depositAmount > 0 && depositAmount <= walletBalance ?
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
                      <div className='d-flex flex-row justify-content-between fs-6 card card-green rounded p-1'>
                        <div>
                          Upon maturity @ <span className='fw-bold'>4.85%</span>
                        </div>
                        <div className='fw-bold'>
                          {selectedOption['ticker']==='USDC' ? (Math.round(depositAmount * 100) / 100 * (1 + (4.85/100) * 3/12)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (Math.round(depositAmount * exchangeRate * 100) / 100 * (1 + (4.85/100) * 3/12)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USDC
                        </div>
                      </div>
                    </div>:
                  null}
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
                  <button className='btn btn-primary py-3 fw-bold'>
                    Connect Wallet
                  </button>
                </div>
              </div>   
            </div>
          </div>
          <div className='d-flex flex-row align-items-center bg-white' id='footer-container'>
            <div className='d-flex flex-fill justify-content-start fs-6 text-grey'>
              Copyright © 2023 Dezy Pte. Ltd. All rights reserved.
            </div>
            <div className='d-flex flex-fill justify-content-center'>
              <a href='https://twitter.com/DeZyFinance' target='blank'>
                <img
                  src='https://www.app.dezy.finance/images/footer/twitter.png'
                  alt='Twitter'
                  className='border-1 border-grey ms-2 footer-icon'
                />
              </a>
              <a href='https://discord.com/invite/dezy' target='blank'>
                <img
                  src='https://www.app.dezy.finance/images/footer/discord.png'
                  alt='Discord'
                  className='border-1 border-grey ms-2 footer-icon'
                />
              </a>
              <a href='https://www.linkedin.com/company/dezy/' target='blank'>
                <img
                  src='https://www.app.dezy.finance/images/footer/linkedin.png'
                  alt='LinkedIn'
                  className='border-1 border-grey ms-2 footer-icon'
                />
              </a>
              <a href='https://medium.com/dezy-finance' target='blank'>
                <img
                  src='https://www.app.dezy.finance/images/footer/medium.png'
                  alt='Medium'
                  className='border-1 border-grey ms-2 footer-icon'
                />
              </a>
            </div>
            <div className='d-flex flex-fill justify-content-end align-items-center fs-6'>
              <a href='https://dezy.finance/terms-of-service/' target='blank' className='text-decoration-none text-grey'>
                Terms & Conditions
              </a>
              <i className='bi bi-dot'>
              </i>
              <a href='https://dezy.finance/privacy-policy/' target='blank' className='text-decoration-none text-grey'>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </BrowserView>
    <MobileView>
      <MobileVer/>
    </MobileView>
    </>
  );
}

export default App;
