import { useState } from 'react';
import { useAppContext } from '@lib/AppContext';
import { DownloadIcon } from '@heroicons/react/outline';
import WarpAppNavbarSystemButtons from '@components/Warp/Navbar/SystemButton';
import { Dialog, Transition } from '@headlessui/react';
import YAML from 'json-to-pretty-yaml';
import toast from 'react-hot-toast';

function AppDialogDownload() {
	const [context, _] = useAppContext();
	const [isOpen, setIsOpen] = useState(false);
	const [tId, setTId] = useState(null);

	async function prepareDownload() {
		toast.custom(
			(t) => (
				<Transition
					show={t.visible}
					enter='transition-opacity duration-75'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='transition-opacity duration-150'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='px-6 py-4 bg-white rounded-md shadow-md animate-pulse'>
						<p>Preparing download...</p>
					</div>
				</Transition>
			),
			{
				duration: 3000,
			}
		);

		try {
			const json = await (
				await fetch('/api/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: context.name,
						content: {
							accent: context.accent.color,
							background: context.background.color,
							foreground: context.foreground,
							details: context.details,
							terminal_colors: context.terminal_colors,
						},
					}),
				})
			).json();

			setTId(json.tId);
		} catch (_) {
			setTId(`h/${hashTheme()}`);
		}

		// finally open the modal
		setIsOpen(true);
	}

	function hashTheme() {
		const name = context.name;
		const theme = YAML.stringify({
			accent: context.accent.color,
			background: context.background.color,
			foreground: context.foreground,
			details: context.details,
			terminal_colors: {
				normal: {
					black: context.terminal_colors.normal.black,
					red: context.terminal_colors.normal.red,
					green: context.terminal_colors.normal.green,
					yellow: context.terminal_colors.normal.yellow,
					blue: context.terminal_colors.normal.blue,
					magenta: context.terminal_colors.normal.magenta,
					cyan: context.terminal_colors.normal.cyan,
					white: context.terminal_colors.normal.white,
				},
				bright: {
					black: context.terminal_colors.bright.black,
					red: context.terminal_colors.bright.red,
					green: context.terminal_colors.bright.green,
					yellow: context.terminal_colors.bright.yellow,
					blue: context.terminal_colors.bright.blue,
					magenta: context.terminal_colors.bright.magenta,
					cyan: context.terminal_colors.bright.cyan,
					white: context.terminal_colors.bright.white,
				},
			},
		});
		return Buffer.from(`${name};${theme}`).toString('base64');
	}

	function downloadTheme() {
		const theme = YAML.stringify({
			accent: context.accent.color,
			background: context.background.color,
			foreground: context.foreground,
			details: context.details,
			terminal_colors: {
				normal: {
					black: context.terminal_colors.normal.black,
					red: context.terminal_colors.normal.red,
					green: context.terminal_colors.normal.green,
					yellow: context.terminal_colors.normal.yellow,
					blue: context.terminal_colors.normal.blue,
					magenta: context.terminal_colors.normal.magenta,
					cyan: context.terminal_colors.normal.cyan,
					white: context.terminal_colors.normal.white,
				},
				bright: {
					black: context.terminal_colors.bright.black,
					red: context.terminal_colors.bright.red,
					green: context.terminal_colors.bright.green,
					yellow: context.terminal_colors.bright.yellow,
					blue: context.terminal_colors.bright.blue,
					magenta: context.terminal_colors.bright.magenta,
					cyan: context.terminal_colors.bright.cyan,
					white: context.terminal_colors.bright.white,
				},
			},
		});
		const objectURL = window.URL.createObjectURL(new Blob([theme], { type: 'application/yaml' }));
		const downloadLink = document.createElement('a');
		downloadLink.href = objectURL;
		downloadLink.download = `${context.name}.yaml`;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		downloadLink.remove();
		window.URL.revokeObjectURL(objectURL);
	}

	return (
		<>
			<button onClick={prepareDownload} className='gap-2 btn btn-primary'>
				<DownloadIcon className='w-6 h-6' />
				Download
			</button>

			<Dialog open={isOpen} onClose={() => setIsOpen(false)} className='absolute z-30'>
				<div className='fixed inset-0 bg-black/20 backdrop-blur-sm' aria-hidden='true'></div>

				<div className='fixed inset-0 flex items-center justify-center p-4'>
					<Dialog.Panel className='max-w-5xl px-12 mx-auto bg-white rounded-lg shadow-lg w-fit py-7'>
						<Dialog.Title className='mb-4 text-3xl font-semibold'>Download</Dialog.Title>

						<div>
							<span className='badge'>Recommended</span>
							<h2 className='text-2xl font-medium'>Automatic Installation</h2>
							<div className='px-2 py-3 my-4 overflow-x-scroll text-white bg-black rounded-md shadow-md select-all whitespace-nowrap'>
								<div className='flex flex-row items-center mb-3'>
									<div className='flex items-start justify-center h-full'>
										<WarpAppNavbarSystemButtons type='close' />
										<WarpAppNavbarSystemButtons type='min' />
										<WarpAppNavbarSystemButtons type='max' />
									</div>
								</div>
								<code className='pl-1 pr-3'>
									<span style={{ color: context.terminal_colors.normal.magenta }} className='font-semibold'>
										curl
									</span>{' '}
									<span style={{ color: context.terminal_colors.bright.black }}>-s -N</span>{' '}
									<span style={{ color: context.terminal_colors.normal.blue }}>'https://warp-themes.com/d/{tId}'</span>{' '}
									<span style={{ color: context.terminal_colors.bright.black }}>|</span>{' '}
									<span style={{ color: context.terminal_colors.normal.magenta }}>bash</span>
								</code>
							</div>
							<div className='flex flex-row w-full justify-evenly'>
								<label
									className='text-lg bg-black btn btn-wide swap'
									role='button'
									onClick={() => {
										navigator.clipboard.writeText(`curl -s -N 'https://warp-themes.com/d/${tId}' | bash`);
										setTimeout(() => {
											//@ts-ignore
											document.getElementById('copied-curl-code').checked = false;
										}, 1500);
									}}
								>
									<input type='checkbox' id='copied-curl-code' />
									<div className='swap-on'>✅ Copied</div>
									<div className='swap-off'>📋 Copy</div>
								</label>
								<a
									className='text-lg btn btn-outline btn-wide'
									href={`https://warp-themes.com/d/${tId}`}
									target='_blank'
								>
									🔍 Inspect Source
								</a>
							</div>
						</div>
						<div className={`${context.background.use != 'image' ? 'divider' : 'hidden'}`}>OR</div>
						<div className={`${context.background.use != 'image' ? 'text-gray-700' : 'hidden'}`}>
							<h2 className='mb-3 text-2xl font-medium'>Manual Installation</h2>
							<h3 className='py-3 text-xl'>Instructions</h3>
							<ol className='ml-4 list-decimal'>
								<li>Download the file</li>
								<li>
									Place the theme file into{' '}
									<code className='px-2 text-sm text-white bg-black rounded'>~/.warp/themes/</code>
								</li>
								<li>Restart Warp</li>
								<li>
									Open the Command Palette (<kbd className='kbd kbd-sm'>⌘</kbd> + <kbd className='kbd kbd-sm'>P</kbd>)
									and search for <i>Open Theme Picker</i>
								</li>
								<li>Enjoy your new theme ✨</li>
							</ol>
							<button onClick={downloadTheme} className='flex items-center w-full gap-2 mt-2 btn btn-ghost'>
								<DownloadIcon className='w-6 h-6' />
								Download file
							</button>
						</div>

						<div className='divider'></div>
						<p className='text-xs text-center text-gray-500'>
							{tId && !tId.startsWith('h/') ? (
								<>
									<span className='text-gray-600'>🧙🏻‍♂️ Tip: </span> Visit{' '}
									<a href={`https://warp-themes.com/d/${tId}?raw=true`} target='_blank' className='text-blue-500'>
										https://warp-themes.com/d/{tId}
										<span className='font-medium text-blue-700'>?raw=true</span>
									</a>
									, to view the raw YAML file
								</>
							) : (
								<>
									<span className='text-red-600'>⚠️ Note: </span> We're currently experiencing some issues with our
									database provider. That's why we currently aren't able to provide our services in full functionality.{' '}
									<br />
									We apologize for the inconvenience.
								</>
							)}
						</p>
					</Dialog.Panel>
				</div>
			</Dialog>
		</>
	);
}

export default AppDialogDownload;
