/** @jsxImportSource @emotion/react */
import { useAppContext } from '@lib/AppContext';
import WarpAppCommand_Neofetch from './Commands';
import WarpAppNavbar from './Navbar';
import WarpAppPrompt from './Prompt';

function WarpApp() {
	const [context, _setContext] = useAppContext();

	return (
		<div
			className='leading-5 rounded-md select-none h-fit min-w-fit drop-shadow-lg lg:max-w-3xl warp-app'
			css={{
				color: context.foreground,
				backgroundColor: context.background.color,
				'&:before': {
					content: '""',
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: '0px',
					left: '0px',
					backgroundImage: context.background.use == 'image' ? `url("${context.background.image}")` : undefined,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					opacity: context.background.imageOpacity / 100,
				},
			}}
		>
			<WarpAppNavbar />
			<WarpAppCommand_Neofetch />
			<WarpAppPrompt />
		</div>
	);
}

export default WarpApp;
