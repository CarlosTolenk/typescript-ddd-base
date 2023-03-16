import { BackendApp } from './BackendApp';

try {
	new BackendApp().start();
} catch (error) {
	console.log(error);
	process.exit(1);
}

process.on('uncaughtException', error => {
	console.log('uncaughtException', error);
	process.exit(1);
});
