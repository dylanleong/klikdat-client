// import MyLayout from "../../components/layout";
// import Loader from 'react-loader-spinner'
// import React, { useState } from "react";

// function Spinner() {
//     const [loading, setLoading] = useState(false)

//     function runSpinner() {
//         setLoading(true)
//         console.log('Loading set to true and timer started. Spinner should appear')
//         console.log(loading)

//         setTimeout(() => {
//             setLoading(false)
//             console.log('Loading set to false and timer ends. Spinner should stop now.')
//         }, 5000);
//     }


//     return (
//         <MyLayout>
//             <div>
//                 <p>This is the Spinner page.</p>
//                 <button onClick={runSpinner}>Click to Spin</button>
//                 <div>
//                     {loading === true &&
//                         <React.Fragment>
//                             <div>
//                                 <Loader
//                                     type="Rings"
//                                     color="#00BFFF"
//                                     height={50}
//                                     width={50}

//                                 />
//                             </div>
//                         </React.Fragment>
//                     }
//                 </div>

//             </div>
//         </MyLayout>
//     );
// }

// export default Spinner
