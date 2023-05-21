interface Route {
    path: string,
    children: JSX.Element
}

const Route = ({ path, children }:Route) => {
    return window.location.pathname === path ? children : null
}
  
export default Route    