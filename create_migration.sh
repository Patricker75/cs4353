# Define the directories
UP_DIR="./backend/migrations/up"
DOWN_DIR="./backend/migrations/down"

# Create directories if they don't exist
mkdir -p "$UP_DIR"
mkdir -p "$DOWN_DIR"

# Get current Unix time
CURRENT_TIME=$(date +%s)

# Check if a name is provided as an argument
if [ $# -eq 0 ]; then
    echo "Error: Please provide a name as an argument."
    exit 1
fi

NAME="$1"

# Create SQL files with name appended
touch "$UP_DIR/${CURRENT_TIME}-$NAME.sql"
touch "$DOWN_DIR/${CURRENT_TIME}-$NAME.sql"
