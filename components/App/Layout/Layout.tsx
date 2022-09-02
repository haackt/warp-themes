import { ReactNode, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import AppDialogAbout from '../Dialogs/About';
import AppDialogSettings from '../Dialogs/Settings';
import Link from 'next/link';
import { ExternalLinkIcon } from '@heroicons/react/outline';

interface Props {
	Navbar: ReactNode;
	Sidebar: ReactNode;
	WarpApp: ReactNode;
}

function AppLayout(props: Props) {
	const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
	const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

	useEffect(() => {
		window.onbeforeunload = function () {
			return true;
		};

		const toastId = toast.custom((t) => (
			<Transition
				show={t.visible}
				enter='transition-opacity duration-75'
				enterFrom='opacity-0'
				enterTo='opacity-100'
				leave='transition-opacity duration-150'
				leaveFrom='opacity-100'
				leaveTo='opacity-0'
			>
				<div className='px-6 py-4 bg-white rounded-md shadow-md'>
					<p>
						Welcome to <span className='font-medium'>Warp-Themes</span>! 👋 <br />
						<i>Warp-Themes</i> is a theme builder for{' '}
						<a href='https://warp.dev' target='_blank' className='text-blue-500 hover:text-blue-700'>
							Warp
						</a>
						.
					</p>
					<div className='flex gap-2 mt-1'>
						<label
							className='flex-grow btn btn-ghost text-primary modal-button'
							onClick={() => {
								setIsAboutDialogOpen(true);
								toast.dismiss(toastId);
							}}
						>
							Learn more
						</label>
						<button onClick={() => toast.dismiss(toastId)} className='flex-grow text-red-500 btn btn-ghost'>
							Dismiss
						</button>
					</div>
				</div>
			</Transition>
		));
		setTimeout(() => {
			const companionToast = toast.custom((t) => (
				<Transition
					show={t.visible}
					enter='transition-opacity duration-75'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='transition-opacity duration-150'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='px-6 py-4 text-right bg-white rounded-md shadow-md'>
						<p>
							We also got a VS-Code extension called <span className='font-semibold'>Warp-Companion</span> 🧙🏻‍♂️
							<br />
							It <i>synchronizes</i> your VS-Code theme with Warp ✨
						</p>
						<div className='flex mt-1'>
							<Link href='/companion' passHref>
								<a target='_blank' className='flex-grow gap-2 btn btn-ghost text-primary'>
									Try it out now <ExternalLinkIcon className='w-4 h-4' />
								</a>
							</Link>
							<button onClick={() => toast.dismiss(companionToast)} className='flex-grow text-red-500 btn btn-ghost'>
								Dismiss
							</button>
						</div>
					</div>
				</Transition>
			));
		}, 10000);
	}, []);

	return (
		<div className='flex flex-col h-screen overflow-y-hidden bg-slate-100 sm:bg-white'>
			<AppDialogAbout _open={isAboutDialogOpen} _onClose={() => setIsAboutDialogOpen(false)} />
			<AppDialogSettings _open={isSettingsDialogOpen} _onClose={() => setIsSettingsDialogOpen(false)} />

			<div className='z-20 hidden w-full border-b sm:block'>{props.Navbar}</div>
			<div className='z-10 flex flex-row h-full'>
				<div className='hidden w-auto border-r sm:block'>{props.Sidebar}</div>
				<div className='flex flex-col items-center justify-center flex-grow w-full pt-20 scale-50 sm:scale-100 bg-slate-100'>
					{props.WarpApp}
					<div className='mt-12 scale-150 shadow-lg alert alert-warning landscape:hidden lg:hidden sm:scale-100'>
						<div>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='flex-shrink-0 w-6 h-6 stroke-current'
								fill='none'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
								/>
							</svg>
							<span>Warning: Please rotate your device!</span>
						</div>
					</div>
				</div>
			</div>
			<Toaster containerClassName='z-20 hidden sm:block' position='bottom-right' toastOptions={{ duration: 10000 }} />
		</div>
	);
}

export default AppLayout;
