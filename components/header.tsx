import Link from "next/link"
import { signIn, signOut as signOutNA, useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import styles from "./header.module.css"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header({show}) {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const router = useRouter();

  const signOut = async () => {
    await signOutNA();
    destroyCookie(null, '__Host-next-auth.csrf-token');
    destroyCookie(null, '__Secure-next-auth.callback-url');
    destroyCookie(null, '__Secure-next-auth.session-token');
    router.push('/auth/signin');
  };
  console.log('show: ', show)

  if (!show) {
    return null
  }
  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      {/* <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav> */}
    </header>
  )
}
