#!/bin/bash

# Clear previous PIDs
rm -f pids.txt && touch pids.txt


# Move to backend and start Spring Boot (in background)
cd backend
echo "Starting Spring Boot backend..."
./mvnw spring-boot:run & echo $! >> ../pids.txt

# Wait to allow backend to start
sleep 10

# Move to frontend and start React dev server
cd ../frontend
echo "Starting React frontend..."
npm run dev & echo $! >> ../pids.txt

# Open frontend in default browser
echo "Opening http://localhost:5173..."
if command -v xdg-open &> /dev/null; then
  xdg-open http://localhost:5173
elif command -v start &> /dev/null; then
  start http://localhost:5173
else
  echo "Open http://localhost:5173 manually."
fi

# Keep the script alive to prevent instant exit
wait
