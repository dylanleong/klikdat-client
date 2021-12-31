import Link from "next/link";
import MyLayout from "../components/layout";
import cookie from 'js-cookie'
import jwt_decode from 'jwt-decode'

export default function Profile() {
  var isExpired = false
  const token = cookie.get('token')
  if (token) { 
  var decodedToken = jwt_decode(token.split(" ")[1]);
  var dateNow = new Date();
  var date = new Date(decodedToken.exp*1000);
  console.log(date)
  
  if (decodedToken.exp < dateNow.getTime())
    isExpired = true;
}
return (
  <div>
    <p>This is the Index page.</p>
    <p>
      {'HOST - ' + process.env.API_HOST}
      {console.log(process.env.API_HOST)}
      {console.log(process.env.GREETING)}
      <br />
      {/* {'JWT - ' + cookie.get('token')} */}
    </p>
    <div className="container p-3">
      <button className="btn btn-primary m-3">KindaCode.com</button>
      <button className="btn btn-warning m-3">Hello</button>
    </div>
    <p>
      <Link href="/account">
        <a>Go: Account</a>
      </Link>
    </p>
  </div>
);
}
Profile.Layout = MyLayout;
