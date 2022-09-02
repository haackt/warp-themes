import { Dialog } from '@headlessui/react';
import { useAppContext } from '@lib/AppContext';
import { useEffect } from 'react';

interface Props {
	_open: boolean;
	_onClose: (val: boolean) => void;
}

function AppDialogAbout(props: Props) {
	const [context, setContext] = useAppContext();

	return (
		<>
			<Dialog open={props._open} onClose={props._onClose} className='absolute z-30'>
				<div className='fixed inset-0 bg-black/20 backdrop-blur-sm' aria-hidden='true'></div>

				<div className='fixed inset-0 flex items-center justify-center p-4'>
					<Dialog.Panel className='w-1/3 px-12 mx-auto bg-white rounded-lg shadow-lg py-7'>
						<Dialog.Title className='mb-4 text-3xl font-semibold'>Settings</Dialog.Title>
						<div className='flex flex-col w-full'>
							<div className='w-full max-w-xs form-control'>
								<label className='label'>
									<span className='label-text'>Background Type</span>
								</label>
								<select
									className='select select-bordered'
									value={context.background.use}
									onChange={(e) =>
										setContext({ ...context, background: { ...context.background, use: e.target.value } })
									}
								>
									<option value='color'>Solid Color</option>
									<option value='image'>Background Image</option>
								</select>
							</div>
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</>
	);
}

export default AppDialogAbout;
