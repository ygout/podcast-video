import { Player } from '@remotion/player';
import { MyComposition } from '../remotion/Composition';
import './App.css';
import FileUpload from './FileUpload';

function App() {
	return (
		<section className="container">
			<h1>Podcast AudioWave</h1>
			<FileUpload />
			<Player
				component={MyComposition}
				inputProps={{ text: 'World' }}
				durationInFrames={120}
				compositionWidth={1920}
				compositionHeight={1080}
				fps={30}
				style={{
					width: 1280,
					height: 720,
				}}
				controls
			/>
		</section>
	);
}

export default App;
