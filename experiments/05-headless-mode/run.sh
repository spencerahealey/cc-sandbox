#!/bin/bash
# Headless Mode Experiments
# Run: chmod +x run.sh && ./run.sh

echo "=== Experiment 05: Headless Mode ==="
echo ""

# Exercise 1: Basic headless
echo "--- Exercise 1: Basic headless execution ---"
echo "Running: claude -p 'List all .md files in the repo root'"
claude -p "List all .md files in the repo root"
echo ""

# Exercise 2: Chain two agents
echo "--- Exercise 2: Chained agents ---"
echo "Agent 1: Generating code..."
claude -p "Write a TypeScript function called 'slugify' that converts a string to a URL-safe slug. Only output the code, no explanation." > generated-code.ts
echo "Agent 2: Reviewing generated code..."
claude -p "Review this TypeScript code for bugs, edge cases, and improvements. Be concise: $(cat generated-code.ts)"
rm -f generated-code.ts
echo ""

# Exercise 3: Parallel agents
echo "--- Exercise 3: Parallel execution ---"
echo "Spawning 3 agents in parallel..."

claude -p "Count the total number of files in this repository" > /tmp/cc-agent1.txt 2>&1 &
PID1=$!
claude -p "What is the primary programming language used in this repo?" > /tmp/cc-agent2.txt 2>&1 &
PID2=$!
claude -p "Does this repo have any test files? List them." > /tmp/cc-agent3.txt 2>&1 &
PID3=$!

wait $PID1 $PID2 $PID3
echo "All agents complete. Results:"
echo ""
echo "Agent 1 (file count):"
cat /tmp/cc-agent1.txt
echo ""
echo "Agent 2 (language):"
cat /tmp/cc-agent2.txt
echo ""
echo "Agent 3 (tests):"
cat /tmp/cc-agent3.txt
rm -f /tmp/cc-agent1.txt /tmp/cc-agent2.txt /tmp/cc-agent3.txt

echo ""
echo "=== Experiment 05 Complete ==="
