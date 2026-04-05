// Minecraft Education Coding Island 1 - Complete Course Data

export interface CodeBlock {
  name: string;
  description: string;
  example: string;
  icon: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  phase: 'getting-started' | 'loops' | 'conditionals' | 'creative' | 'final-project';
  duration: 60;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[];
  content: string;
  codeBlocks: CodeBlock[];
  studentActivity: string;
  teacherTip: string;
  quiz: QuizQuestion[];
  xpReward: number;
  unlocks?: number[]; // Lesson IDs that unlock after this
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const MINECRAFT_LESSONS: Lesson[] = [
  {
    id: 1,
    title: 'Welcome to Minecraft Education – Controls and Codebuilder',
    description: 'Learn keyboard/mouse controls and your first code block',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'beginner',
    objectives: [
      'Move and interact in Minecraft Education using keyboard and mouse',
      'Open Codebuilder for the first time',
      'Use the say command to print messages in chat',
      'Understand that Codebuilder controls the Agent, not the player',
    ],
    content: `
# Welcome to Minecraft Education

## What You'll Learn
- **Movement**: WASD keys to move, mouse to look around
- **Jumping**: Space bar to jump
- **Flying**: Double-tap Space in Creative Mode
- **Sneaking**: Shift key
- **Breaking blocks**: Left-click
- **Placing blocks**: Right-click
- **Opening inventory**: E key
- **Opening Codebuilder**: C key or Agent button

## Important Concept
The player is ALWAYS controlled by keyboard and mouse. Codebuilder does NOT control the player.
Codebuilder controls the Agent — a coding robot that lives in your Minecraft world.

## Your First Code
The 'say' command prints a message in chat. This is a simple, confidence-building first step.

\`\`\`
on chat command "hello" => {
  agent.say("Hello, World!")
}
\`\`\`

Type "hello" in chat and watch the message appear!
    `,
    codeBlocks: [
      {
        name: 'say command',
        description: 'Print a message in chat',
        example: 'agent.say("Hello, World!")',
        icon: '💬',
      },
      {
        name: 'chat command',
        description: 'Trigger code with chat',
        example: 'on chat command "hello"',
        icon: '💭',
      },
    ],
    studentActivity: `
**Part 1 – Controls Practice (15 min)**
- Walk, jump, fly, place 5 blocks, break 5 blocks, open inventory

**Part 2 – Your First Program (30 min)**
- Open Codebuilder and write a program using 'on chat command' and 'say' that displays your name and a fun fact
- Bonus: Add a second 'say' block that shows a different message when you type a different command
    `,
    teacherTip: `
Repeat clearly before and after the Codebuilder demo: the player is always controlled by keyboard — 
Codebuilder is only for the Agent (Lesson 2 onwards). This distinction prevents confusion later. 
The 'say' command is intentionally simple — Lesson 1 is about confidence, not complexity.
    `,
    quiz: [
      {
        id: 1,
        question: 'Which key opens Codebuilder?',
        options: ['E', 'C', 'I', 'Space'],
        correctAnswer: 1,
        explanation: 'C key or the Agent button opens Codebuilder. E opens inventory.',
      },
      {
        id: 2,
        question: 'Who controls the player in Minecraft Education?',
        options: ['Codebuilder', 'The Agent', 'Keyboard and mouse', 'The say command'],
        correctAnswer: 2,
        explanation: 'The player is ALWAYS controlled by keyboard and mouse. Codebuilder controls the Agent.',
      },
      {
        id: 3,
        question: 'What does the say command do?',
        options: [
          'Moves the player forward',
          'Prints a message in chat',
          'Breaks a block',
          'Places a block',
        ],
        correctAnswer: 1,
        explanation: 'The say command prints a message in the chat for everyone to see.',
      },
    ],
    xpReward: 100,
    unlocks: [2],
  },
  {
    id: 2,
    title: 'Basic Commands for the Agent',
    description: 'Meet the Agent and learn to control it with code',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'beginner',
    objectives: [
      'Understand what the Agent is (a programmable robot)',
      'Learn basic Agent commands: move, turn, place, destroy',
      'Understand Agent facing direction',
      'Build a 3-block path with code',
    ],
    content: `
# Basic Commands for the Agent

## What is the Agent?
The Agent is a programmable robot that lives in your Minecraft world. 
You control it with code blocks in Codebuilder.

## Key Commands
- **agent.move(direction)** - Move forward, back, left, right, up, or down
- **agent.turn(direction)** - Rotate left or right
- **agent.place(direction)** - Place a block in a chosen direction
- **agent.destroy(direction)** - Break a block in a chosen direction

## Important: Agent Facing Direction
The Agent always has a facing direction. Before you move it, know which way it's looking!
Use F3 to check coordinates, or just watch the Agent's orientation.

## Example: Build a Path
\`\`\`
agent.move("forward")
agent.place("down")
agent.move("forward")
agent.place("down")
agent.move("forward")
agent.place("down")
\`\`\`
    `,
    codeBlocks: [
      {
        name: 'agent.move',
        description: 'Move the Agent in a direction',
        example: 'agent.move("forward")',
        icon: '🚶',
      },
      {
        name: 'agent.turn',
        description: 'Rotate the Agent',
        example: 'agent.turn("left")',
        icon: '🔄',
      },
      {
        name: 'agent.place',
        description: 'Place a block',
        example: 'agent.place("down")',
        icon: '📦',
      },
      {
        name: 'agent.destroy',
        description: 'Break a block',
        example: 'agent.destroy("down")',
        icon: '💥',
      },
    ],
    studentActivity: `
**Challenge 1** (10 min)
- Summon your Agent and move it forward 5 steps. Turn it right and move 3 more steps.
- Where does it end up?

**Challenge 2** (20 min)
- Make the Agent place a block in front of it, then move into that space.
- Repeat to build a 3-block staircase. Bonus: Make the Agent destroy the block directly in front of it.

**Challenge 3** (20 min)
- Build a simple 3-block path together as a class, discussing each command before running it.
    `,
    teacherTip: `
Before every move command, ask the class: 'Which way is the Agent facing right now?'
Draw a compass on the whiteboard if needed. The Agent's facing direction is the source of most bugs in Lessons 2–6, 
so establishing this habit early saves a lot of debugging time later.
    `,
    quiz: [
      {
        id: 1,
        question: 'What is the Agent?',
        options: [
          'A player you control',
          'A programmable robot',
          'A block type',
          'A chat command',
        ],
        correctAnswer: 1,
        explanation: 'The Agent is a programmable robot that you control with code blocks.',
      },
      {
        id: 2,
        question: 'Which command moves the Agent forward?',
        options: [
          'agent.place("forward")',
          'agent.turn("forward")',
          'agent.move("forward")',
          'agent.destroy("forward")',
        ],
        correctAnswer: 2,
        explanation: 'agent.move("forward") moves the Agent in its facing direction.',
      },
      {
        id: 3,
        question: 'What does agent.place("down") do?',
        options: [
          'Moves the Agent down',
          'Destroys a block below',
          'Places a block below the Agent',
          'Turns the Agent down',
        ],
        correctAnswer: 2,
        explanation: 'agent.place("down") places a block in the downward direction (below the Agent).',
      },
    ],
    xpReward: 100,
    unlocks: [3],
  },
  {
    id: 3,
    title: 'Build a Simple Path or Road with the Agent',
    description: 'Combine movement and placement to build structures',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'beginner',
    objectives: [
      'Combine move and place commands in sequence',
      'Choose appropriate block types for a path',
      'Read and fix sequencing bugs',
      'Build your first mini-project',
    ],
    content: `
# Build a Simple Path or Road

## Combining Commands
A path is built by moving and placing blocks in sequence.
This is your first mini-project — simple enough to finish in one lesson, satisfying enough to feel real progress.

## Choosing Block Types
Different blocks work for different paths:
- **Stone brick** - Classic path
- **Wood planks** - Warm, natural path
- **Gravel** - Desert path
- **Dark oak wood** - Forest path

## Example: 5-Block Path
\`\`\`
agent.place("down")
agent.move("forward")
agent.place("down")
agent.move("forward")
agent.place("down")
agent.move("forward")
agent.place("down")
agent.move("forward")
agent.place("down")
\`\`\`

## Debugging Tips
- Read the code aloud step by step
- Check the Agent's facing direction
- Look for missing or extra commands
    `,
    codeBlocks: [
      {
        name: 'Sequence',
        description: 'Commands run one after another',
        example: 'agent.move(); agent.place();',
        icon: '📋',
      },
    ],
    studentActivity: `
**Code the Agent to build an 8-block straight path.**
Bonus: Make it turn a corner and continue for 4 more blocks.

**Creative Choice**: Let students pick their own block type for the path.
Small creative choices increase ownership and engagement.
    `,
    teacherTip: `
Let students pick their own block type for the path. Small creative choices increase ownership. 
For advanced students: ask them to add a border on each side of the path (different block type).
    `,
    quiz: [
      {
        id: 1,
        question: 'To build a path, what two commands do you need?',
        options: [
          'move and turn',
          'move and place',
          'place and destroy',
          'turn and destroy',
        ],
        correctAnswer: 1,
        explanation: 'You move the Agent forward and place blocks to create a path.',
      },
      {
        id: 2,
        question: 'If your path has a gap, what likely happened?',
        options: [
          'You forgot a place command',
          'You forgot a move command',
          'You turned the Agent',
          'You destroyed a block',
        ],
        correctAnswer: 0,
        explanation: 'A gap means you moved without placing. You need both move and place commands.',
      },
    ],
    xpReward: 100,
    unlocks: [4],
  },
];

// Placeholder for remaining lessons (4-15)
// In a real implementation, these would be fully fleshed out
export const REMAINING_LESSONS = [
  {
    id: 4,
    title: 'Repeat Loops – Making the Agent Build a Wall',
    phase: 'loops',
    difficulty: 'intermediate',
    xpReward: 150,
  },
  {
    id: 5,
    title: 'Nested Loops – Build a Floor or Grid Pattern',
    phase: 'loops',
    difficulty: 'intermediate',
    xpReward: 150,
  },
  {
    id: 6,
    title: 'Loop Challenge – Build a Pyramid with the Agent',
    phase: 'loops',
    difficulty: 'advanced',
    xpReward: 200,
  },
  {
    id: 7,
    title: 'If/Else – The Agent Reacts to the World',
    phase: 'conditionals',
    difficulty: 'intermediate',
    xpReward: 150,
  },
  {
    id: 8,
    title: 'Conditionals + Movement – Agent Avoids Obstacles',
    phase: 'conditionals',
    difficulty: 'intermediate',
    xpReward: 150,
  },
  {
    id: 9,
    title: 'Combined Challenge – Agent Navigates a Simple Maze',
    phase: 'conditionals',
    difficulty: 'advanced',
    xpReward: 200,
  },
  {
    id: 10,
    title: 'Design a Farm with the Agent Using Loops',
    phase: 'creative',
    difficulty: 'intermediate',
    xpReward: 200,
  },
  {
    id: 11,
    title: 'Build a Village House Using Loops and Functions',
    phase: 'creative',
    difficulty: 'advanced',
    xpReward: 250,
  },
  {
    id: 12,
    title: 'Creative Build – Code a Bridge Over Water',
    phase: 'creative',
    difficulty: 'advanced',
    xpReward: 250,
  },
  {
    id: 13,
    title: 'Final Project – Village Planning: Design 3 Buildings',
    phase: 'final-project',
    difficulty: 'advanced',
    xpReward: 300,
  },
  {
    id: 14,
    title: 'Final Project – Village Build: Code the 3 Buildings',
    phase: 'final-project',
    difficulty: 'advanced',
    xpReward: 300,
  },
  {
    id: 15,
    title: 'Final Project – Connect the Village: Roads and Village Square',
    phase: 'final-project',
    difficulty: 'advanced',
    xpReward: 500,
  },
];

export const ALL_LESSONS = [...MINECRAFT_LESSONS, ...REMAINING_LESSONS];

export const ISLAND_METADATA = {
  id: 1,
  name: 'Minecraft Education Coding',
  description: 'Learn block-based coding through Minecraft Education Edition',
  totalLessons: 15,
  totalXP: 2250,
  difficulty: 'mixed',
  icon: '⛏️',
  color: '#C41E3A', // Minecraft red
};
