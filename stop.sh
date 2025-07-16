#!/bin/bash

echo "Stopping backend (Spring Boot)..."

# Stop all PIDs listed in pids.txt
if [ -f pids.txt ]; then
  while read pid; do
    if [ -n "$pid" ]; then
      echo "Killing backend PID: $pid"
      kill "$pid" 2>/dev/null || echo "Failed to kill PID $pid"
    fi
  done < pids.txt
  rm pids.txt
else
  echo "No pids.txt file found — backend might not be running."
fi

# Stop React frontend by killing whatever runs on port 5173
echo ""
echo "Stopping frontend (React on port 5173)..."

# Git Bash & WSL generally support lsof
PID_REACT=$(lsof -ti:5173)

if [ -n "$PID_REACT" ]; then
  echo "Killing frontend PID: $PID_REACT"
  kill "$PID_REACT" 2>/dev/null || echo "Failed to kill frontend process"
else
  echo "No process found on port 5173"
fi

echo ""
echo "✅ All processes stopped."
