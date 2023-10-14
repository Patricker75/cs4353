client:
	echo 'Starting Client'
	npm run start --prefix frontend

server:
	echo 'Starting Server'
	npm run start --prefix backend

test:
	echo 'Running Unit Tests'
	npm run test --prefix backend