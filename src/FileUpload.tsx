import { CloudUpload } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRef, useState } from 'react';
export default function FileUpload({}) {
	const styles = {
		input: {
			display: 'none',
		},
	};
	const [sound, setSound] = useState<HTMLAudioElement | null>(null);

	const hiddenFileInput = useRef<HTMLInputElement>(null);
	const handleButtonClick = () => {
		if (
			hiddenFileInput.current !== null &&
			hiddenFileInput.current !== undefined
		) {
			hiddenFileInput.current.click();
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event?.target?.files === null || event?.target?.files === undefined)
			return;
		const fileUploaded = event.target.files[0];
		console.log(fileUploaded);
		const reader = new FileReader();

		reader.addEventListener(
			'load',
			() => {
				// convert  file to base64 string
				console.log(reader.result);
				setSound(new Audio(reader.result as string));
			},
			false
		);

		if (fileUploaded) {
			reader.readAsDataURL(fileUploaded);
		}
	};

	return (
		<div>
			<input
				accept="audio/*"
				id="contained-button-file"
				type="file"
				style={styles.input}
				ref={hiddenFileInput}
				onChange={handleChange}
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={handleButtonClick}
				startIcon={<CloudUpload />}
			>
				Upload
			</Button>
		</div>
	);
}
