import { useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BrowserView, MobileView} from 'react-device-detect'
import './App.css'
import data from './Constants/data.js'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import AreaChart from './Components/AreaChart.js'
import DepositPanel from './Components/DepositPanel'
import Footer from './Components/Footer'
import MobileVer from './Components/MobileVer.js'

function App() {
  const [ timeframe, setTimeframe ] = useState('3M')
  const [ wallet, setWallet ] = useState('')
  const [ walletBalance, setWalletBalance ] = useState(0)

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

  function toggleWallet(){
    if(wallet === ''){
      setWallet('0xC9D74727aB402E2c9a3e4F65935A2d33c7fEcB20')
      setWalletBalance(2)
    } else{
      setWallet('')
      setWalletBalance(0) 
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

  const date = new Date(data[data.length-1][0]);
  const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.toLocaleString('default', { day: 'numeric' })}, ${date.toLocaleString('default', { year: 'numeric' })}`;

  return (
    <>
      <BrowserView>
      <div className='d-flex flex-row' id='app'>
        <Sidebar/>
        <div className='d-flex flex-column'>
          <Navbar wallet={wallet} walletConnect={toggleWallet} walletBalance={walletBalance}/>
          <div className='d-flex flex-row' id='explore-detail'>
            <div className='row'>
              <div className='col-xl-8'>
                <div className='p-4 mb-3 rounded d-flex flex-column card-body bg-white'>
                  <div className='d-flex flex-row badge rounded-pill align-items-center align-self-start p-1' id='badge'>
                    <img
                      src='https://www.app.dezy.finance/images/strategy/fixed-deposit.png'
                      alt='fixed deposit'
                      id='badge-icon'
                      className='me-1'
                    />
                    <div className='ms-1 me-2 fs-6 fw-normal' id='badge'>Fixed Deposit</div>
                  </div>
                  <div className='mt-1 mb-4 fs-2 fw-medium'>Fixed Deposit with Notional Finance</div>
                  <div className='mt-6 mb-4 fs-2 fw-bold'>Details</div>
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
                  <button className='align-self-end btn btn-link text-blue p-0 mt-1' onClick={toggleReadMore} id='read-more-btn'> Read More</button>
                </div>
                <div className='p-4 mb-3 rounded d-flex flex-column card-body bg-white'>
                  <div className='mt-2 mb-5 fs-2 fw-bold'>Asset Deployment Flow</div>
                  <div className='align-self-center w-75 mb-3'>
                    <img
                      src='https://dezy-cdn.s3.ap-southeast-1.amazonaws.com/flowchart/S6_NOTIONAL_FD_USDC.png'
                      alt='asset deployment flow'
                      className='img-fluid'
                    />
                  </div>
                </div>
                <div className='p-4 mb-3 rounded d-flex flex-column card-body bg-white'>
                  <div className='mt-2 mb-3 fs-2 fw-bold'>Video</div>
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
                                  <span className='text-grey'>Base: </span><span className='text-green fw-semibold'>{data[0][1]}%</span>
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
                        <span className='fs-2 fw-bold text-green'>{data[data.length-1][1]}%</span>
                    </OverlayTrigger>
                    </div>
                  <div className='fs-6 text-grey'>{formattedDate}</div>
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
                  <div className='mt-2 mb-3 fs-2 fw-bold'>Protocols</div>
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
              <DepositPanel walletBalance={walletBalance} wallet={wallet}/>  
            </div>
          </div>
          <Footer/>
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