import { useState, useEffect } from 'react'
import { signIn, getCsrfToken, getProviders } from 'next-auth/react'
import Image from 'next/image'
import Header from '../../components/header'
import styles from '../../styles/Signin.module.css'
import stylesMobile from '../../styles/Signin-mobile.module.css';

const Signin = ({ csrfToken, providers }) => {

  const[isMobile, setIsMobile] = useState(false);
  const [containerStyles, setContainerStyles] = useState(styles);

  useEffect(() => {
    if(window.innerWidth < 768) {
      setIsMobile(true);
      setContainerStyles(stylesMobile);
    }
  }, []);

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <Header />
      <div className={containerStyles.wrapper} />
      <div className={containerStyles.content}>
        <div className={containerStyles.cardWrapper}>
          {/* <Image src='/otp-icon.svg' width="196px" height="64px" alt='App Logo' style={{ height: '85px', marginBottom: '20px' }} /> */}
          {/* <Image src='/otp_image.png'/> */}
          <Image
            alt="Image Alt"
            src="/otp_image.png"
            width="100"
            height="100"
          />
          <div className={containerStyles.cardContent}>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            <input placeholder='Email ' size={10} style={{'width' : '90%'}} />
            <button className={containerStyles.primaryBtn}>
              Submit
            </button>
            <hr />
            {providers &&
              Object.values(providers).map(provider => (
                <div key={provider.name} style={{ marginBottom: 0 }}>
                  <button onClick={() => signIn(provider.id, { callbackUrl: '/' })} >
                    Sign in with{' '} OTP Cloud
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src='/login_pattern.svg' alt='Pattern Background' layout='fill' className={containerStyles.styledPattern} />
    </div>
  )
}

export default Signin

export async function getServerSideProps(context) {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: {
      providers,
      csrfToken
    },
  }
}