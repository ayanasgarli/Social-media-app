import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes/index.jsx";


const routes = createBrowserRouter(ROUTES);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;



// import { Provider } from 'react-redux';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { ROUTES } from './routes/index.jsx';
// import userSlice from './redux/userSlice'

// const routes = createBrowserRouter(ROUTES);

// function App() {
//   return (
//     <Provider userSlice={userSlice}>
//       <RouterProvider router={routes} />
//     </Provider>
//   );
// }

// export default App;
