import Link from "next/link";
import MyLayout from "../components/layout";

export default function Profile() {
  return (
    <div>
      <p>This is the Index page.</p>
      <p>
      {'HOST - ' + process.env.API_HOST}
      {console.log(process.env.API_HOST)}
      {console.log(process.env.GREETING)}
      </p>
      <p>
        <Link href="/account">
          <a>Go: Account</a>
        </Link>
      </p>
    </div>
  );
}
Profile.Layout = MyLayout;
