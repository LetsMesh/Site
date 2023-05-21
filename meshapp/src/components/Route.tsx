interface RouteProps {
    path: string,
    children: JSX.Element
}

const Route = ({ path, children }:RouteProps) => {
    return window.location.pathname === path ? children : null
}
  
export default Route    