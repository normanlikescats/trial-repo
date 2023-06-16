export default function Footer(){
  return(
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
  )
}