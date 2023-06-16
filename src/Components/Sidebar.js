import { useState } from 'react'

export default function Sidebar(){
  const [sidebar, setSidebar] = useState(true)

  function toggleSidebar(){
    let toggleButton = document.getElementById('toggle-btn')
    let dezyText = document.getElementById('logo-text')
    if(toggleButton.src==='https://www.app.dezy.finance/images/sidebar/sidebar-collapse.png'){
      dezyText.hidden = !dezyText.hidden
      setSidebar(false)
      toggleButton.src='https://www.app.dezy.finance/images/sidebar/sidebar-expand.png'
      
    }else{
      setSidebar(true)
      toggleButton.src='https://www.app.dezy.finance/images/sidebar/sidebar-collapse.png'
      setTimeout(()=>{dezyText.hidden = !dezyText.hidden},350)
    }
  }

  return(
    <div className='d-flex flex-column justify-content-between align-items-center vh-100 bg-white sticky-top' id={sidebar ? 'sidebar-container': 'collapse-sidebar'}>
      <div className='d-flex flex-column'>
        <div className='d-flex align-items-center' id={sidebar ? 'brand-logo-container' : 'collapsed-brand-logo-container'}>
          <a className='mx-2' href='https://www.app.dezy.finance/explore'>
            <img
              src='https://www.app.dezy.finance/images/dezy-logo-only-black.png'
              alt='logo'
              id='logo-img'
            />
            <img
              src='https://www.app.dezy.finance/images/dezy-logo-text.png'
              alt='logo'
              id='logo-text'
              style={{  width: '3.5rem', height: '2rem', margin: '0 0 0 0.5rem'}}
            />
          </a>
        </div>
        <div className='mt-3'>
          <a href='https://www.app.dezy.finance/home' className='text-decoration-none btn btn-link p-0'>
            <button className='align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar mb-3 p-3'>
              <img
                src='https://www.app.dezy.finance/images/sidebar/sidebar-home.png'
                alt='home'
                className='inactive-sidebar-icon'
              />
              <p className='collapse collapse-horizontal show m-0 p-0 fs-5' id='collapseSidebar'>Home</p>
            </button>
          </a>
          <a href='https://www.app.dezy.finance/overview' className='text-decoration-none btn btn-link p-0'>
            <button className='align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar mb-3 p-3'>
              <img
                src='https://dezy-cdn.s3.ap-southeast-1.amazonaws.com/overview.png'
                alt='overview'
                className='inactive-sidebar-icon'
              />
              <p className='collapse collapse-horizontal show m-0 p-0 fs-5' id='collapseSidebar'>Overview</p>
            </button>
          </a>
          <a href='https://www.app.dezy.finance/explore' className='text-decoration-none btn btn-link p-0'>
            <button className='align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar-active mb-3 p-3'>
              <img
                src='https://dezy-cdn.s3.ap-southeast-1.amazonaws.com/explore.png'
                alt='explore'
                className='active-sidebar-icon'
              />
              <p className='collapse collapse-horizontal show m-0 p-0 fs-5' id='collapseSidebar'>Explore</p>
            </button>
          </a>
          <a href='https://www.app.dezy.finance/swap' className='text-decoration-none btn btn-link p-0'>
            <button className='align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar mb-3 p-3'>
              <img
                src='https://dezy-cdn.s3.ap-southeast-1.amazonaws.com/swap.png'
                alt='swap'
                className='inactive-sidebar-icon'
              />
              <p className='collapse collapse-horizontal show m-0 p-0 fs-5' id='collapseSidebar'>Swap</p>
            </button>
          </a>
          <a href='https://www.app.dezy.finance/auto-invest' className='text-decoration-none btn btn-link p-0'>
            <button className='align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar mb-3 p-3'>
              <img
                src='https://www.app.dezy.finance/images/sidebar/sidebar-auto-invest.png'
                alt='auto invest'
                className='inactive-sidebar-icon'
              />
              <p className='collapse collapse-horizontal show m-0 p-0 fs-5' id='collapseSidebar'>Auto Invest</p>
            </button>
          </a>
        </div>
      </div>
      <div className='d-flex flex-column align-items-start w-100' id='sidebar-bottom'>
        <a href='https://www.app.dezy.finance/tutorial' target='blank' className='text-decoration-none btn btn-link p-0'>
          <button className='align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar mb-3 p-3'>
            <img
              src='https://www.app.dezy.finance/images/sidebar/sidebar-tutorial.png'
              alt='tutorial'
              className='inactive-sidebar-icon'
            />            
            <p className='collapse collapse-horizontal show m-0 p-0 fs-5' id='collapseSidebar'>Tutorial</p>
          </button>
        </a>
        <a href='https://docs.dezy.finance/hub/' target='blank' className='text-decoration-none btn btn-link p-0'>
          <button className='align-items-center fs-6 fw-semibold text-start align-self-start d-flex flex-row btn btn-sidebar mb-3 p-3'>
            <img
              src='https://www.app.dezy.finance/images/sidebar/sidebar-faq.png'
              alt='FAQ'
              className='inactive-sidebar-icon'
            />            
            <p className='collapse collapse-horizontal show m-0 p-0 fs-5' id='collapseSidebar'>FAQ</p>
          </button>
        </a>
        <button className='ms-2 align-items-center align-self-start p-0 my-4 btn btn-secondary toggle-icon' onClick={toggleSidebar}>
          <img
            src='https://www.app.dezy.finance/images/sidebar/sidebar-collapse.png'
            alt='toggle sidebar'
            className='toggle-icon'
            id='toggle-btn'
            data-bs-toggle='collapse'
            href='#collapseSidebar'
            role='button'
            aria-expanded='false'
            aria-controls='collapseExample'
          />            
        </button>
      </div>
    </div>     
  )
}