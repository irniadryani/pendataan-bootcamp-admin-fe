import { Outlet } from 'react-router-dom';  

// Component for rendering content in a layout without authorization
export default function NoAuthorizeLayout(props) {
	const { content } = props;  // Destructuring content from props
	return <main className='h-full'>{content ?? <Outlet />}</main>;  // Rendering content or nested routes (Outlet) if content is not provided
}
