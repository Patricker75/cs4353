client:
	echo 'Starting Client'
	npm run dev --prefix frontend

server:
	echo 'Starting Server'
	flask --app ./backend/src/main.py run