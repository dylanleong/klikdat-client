import Link from "next/link";
import MyLayout from "../components/layout";
import { userIsAuthenticated } from '../providers/Auth';


export default function Profile() {
  const auth = userIsAuthenticated()
  console.log(auth)
  return (
    <div>
      <p>This is the Profile page.</p>
      {auth === true && (
        <p>user is logged on</p>
      )}
      <p>
        <Link href="/account">
          <a>Go: Account</a>
        </Link>
      </p>
    </div>
  );
}
Profile.Layout = MyLayout;
