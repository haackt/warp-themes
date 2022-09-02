import { useAppContext } from '@lib/AppContext';
import Dropzone from 'react-dropzone';

function ImageInput() {
	const [context, setContext] = useAppContext();

	const getBase64 = async (file: Blob): Promise<string | undefined> => {
		try {
			var reader = new FileReader();
			reader.readAsDataURL(file as Blob);

			return new Promise((reslove, reject) => {
				reader.onload = () => reslove(reader.result as any);
				reader.onerror = (error) => reject(error);
			});
		} catch (_) {
			alert('Unsupported file type');
			return context.background.image;
		}
	};

	return (
		<div className='flex flex-row items-center my-4 text-center bg-white justify-evenly'>
			<div className='flex flex-col w-full'>
				<Dropzone
					maxFiles={1}
					accept={{ 'image/jpg': ['.jpg', '.jpeg', '.JPEG'] }}
					onDrop={async (acceptedFiles) => {
						const [file] = acceptedFiles;
						setContext({
							...context,
							background: {
								...context.background,
								image: await getBase64(file),
							},
						});
					}}
				>
					{({ getRootProps, getInputProps, isDragActive }) => (
						<div
							{...getRootProps()}
							className='flex flex-col w-full h-48 border rounded-sm drop-shadow-sm hover:cursor-pointer'
							style={{
								backgroundImage: `url(${context.background.image})`,
								backgroundPosition: 'center',
								backgroundSize: 'cover',
							}}
						>
							<input {...getInputProps()} />
							<div className='flex items-center justify-center w-full h-full p-4 font-bold text-white backdrop-blur-sm rounded-xl b'>
								{!isDragActive ? (
									<p className='relative z-10'>
										Background Image <br />
										<span className='font-normal opacity-80'>[Only *.jpg, *.jpeg and *.JPEG images are accepted]</span>
									</p>
								) : (
									<p className='relative z-10'>[ Drag here ]</p>
								)}
								<div className='absolute z-0 w-full h-full bg-black/40'></div>
							</div>
						</div>
					)}
				</Dropzone>
			</div>
		</div>
	);
}

export default ImageInput;
