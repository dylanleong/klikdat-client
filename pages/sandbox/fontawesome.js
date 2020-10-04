import Link from "next/link";
import Head from "next/head"
import MyLayout from "../../components/layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


export default function Profile() {
  return (    
    <div>
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"></link>
    </Head>
      <p>This is the Profile page.</p>
      <FontAwesomeIcon icon={faCoffee} />
      <p>
        <Link href="/account">
          <a>Go: Account</a>
        </Link>
      </p>
    </div>
  );
}
Profile.Layout = MyLayout;
